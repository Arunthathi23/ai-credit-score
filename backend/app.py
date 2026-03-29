from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime

app = Flask(__name__)
CORS(app)

DB_FILE = 'ai_credit_score.db'

def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            date TEXT NOT NULL,
            category TEXT NOT NULL,
            amount REAL NOT NULL,
            description TEXT,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )
    ''')
    conn.commit()
    conn.close()

def calculate_score_and_insights(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM transactions WHERE user_id = ?', (user_id,))
    rows = cursor.fetchall()
    conn.close()

    base_score = 500
    score = base_score
    insights = []

    totals = {
        'Food': 0.0,
        'Bills': 0.0,
        'Savings': 0.0,
        'Transport': 0.0,
        'Recharge': 0.0,
        'Other': 0.0,
    }

    for row in rows:
        category = row['category']
        amount = float(row['amount'])
        if category in totals:
            totals[category] += amount
        else:
            totals['Other'] += amount

    total_spending = sum(v for k, v in totals.items() if k != 'Savings')
    savings = totals['Savings']
    bills = totals['Bills']
    food = totals['Food']

    if savings > 0:
        score += 100
        insights.append('Strong savings habit')
    else:
        score -= 100
        insights.append('No savings habit detected')

    if bills > 0:
        score += 80
        insights.append('Consistent bill payments')
    else:
        insights.append('No bill payments recorded')

    if total_spending > 0:
        food_ratio = food / total_spending
    else:
        food_ratio = 0

    if food_ratio < 0.25:
        score += 50
        insights.append('Spending appears balanced')
    else:
        score -= 70
        insights.append('High spending on food')

    if score < 300:
        score = 300
    elif score > 900:
        score = 900

    if score > 700:
        risk = 'Low Risk'
    elif score >= 500:
        risk = 'Medium Risk'
    else:
        risk = 'High Risk'

    eligible_amount = 'Not eligible'
    if score > 700:
        eligible_amount = '₹50,000'
    elif score > 600:
        eligible_amount = '₹20,000'

    return {
        'score': score,
        'risk': risk,
        'insights': insights,
        'loan_eligibility': eligible_amount
    }

@app.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid JSON payload'}), 400

    name = data.get('name')
    email = data.get('email')
    if not name or not email:
        return jsonify({'error': 'name and email are required'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('INSERT INTO users (name, email) VALUES (?, ?)', (name, email))
        conn.commit()
        user_id = cursor.lastrowid
        conn.close()
        return jsonify({'message': 'User created', 'user_id': user_id}), 201
    except sqlite3.IntegrityError:
        conn.close()
        return jsonify({'error': 'User already exists or invalid email'}), 400
    except Exception as e:
        conn.close()
        return jsonify({'error': str(e)}), 500

@app.route('/transaction', methods=['POST'])
def add_transaction():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid JSON payload'}), 400

    user_id = data.get('user_id')
    date_str = data.get('date')
    category = data.get('category')
    amount = data.get('amount')
    description = data.get('description', '')

    if not user_id or not date_str or not category or amount is None:
        return jsonify({'error': 'user_id, date, category, amount are required'}), 400

    try:
        datetime.fromisoformat(date_str)
    except Exception:
        return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400

    if category not in ['Food', 'Bills', 'Savings', 'Transport', 'Recharge', 'Other']:
        return jsonify({'error': 'Invalid category'}), 400

    try:
        amount = float(amount)
    except ValueError:
        return jsonify({'error': 'amount must be a number'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE id = ?', (user_id,))
    user = cursor.fetchone()
    if user is None:
        conn.close()
        return jsonify({'error': 'User not found'}), 404

    try:
        cursor.execute('''
            INSERT INTO transactions (user_id, date, category, amount, description)
            VALUES (?, ?, ?, ?, ?)
        ''', (user_id, date_str, category, amount, description))
        conn.commit()
        tx_id = cursor.lastrowid
        conn.close()
        return jsonify({'message': 'Transaction added', 'transaction_id': tx_id}), 201
    except Exception as e:
        conn.close()
        return jsonify({'error': str(e)}), 500

@app.route('/score/<int:user_id>', methods=['GET'])
def get_score(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE id = ?', (user_id,))
    user = cursor.fetchone()
    conn.close()

    if user is None:
        return jsonify({'error': 'User not found'}), 404

    result = calculate_score_and_insights(user_id)
    response = {
        'user_id': user_id,
        'name': user['name'],
        'email': user['email'],
        'score': result['score'],
        'risk': result['risk'],
        'insights': result['insights'],
        'loan_eligibility': result['loan_eligibility']
    }
    return jsonify(response), 200

@app.route('/transactions/<int:user_id>', methods=['GET'])
def get_transactions(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE id = ?', (user_id,))
    user = cursor.fetchone()
    if user is None:
        conn.close()
        return jsonify({'error': 'User not found'}), 404

    cursor.execute('SELECT id, date, category, amount, description FROM transactions WHERE user_id = ? ORDER BY date DESC', (user_id,))
    txs = cursor.fetchall()
    conn.close()

    tx_list = [dict(tx) for tx in txs]
    return jsonify({'user_id': user_id, 'transactions': tx_list}), 200

@app.route('/')
def index():
    return jsonify({'message': 'AI Credit Score Platform Backend is running.'}), 200

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)
