from flask import Flask, Response, jsonify, request
from flask_cors import CORS
import pymysql
from datetime import datetime

app = Flask(__name__)


@app.route('/', methods=['GET'])
def hello():
    return 'Hello, World!'


app: Flask = Flask(__name__)
CORS(app)

myConnection = pymysql.connect(host="localhost", user="root", passwd="1234", db="bank")


@app.route(rule='/login', methods=['POST'])
def login():
    user: str = request.form["username"]
    pw: str = request.form["password"]
    cur = myConnection.cursor()

    cur.execute(
        ''' SELECT * FROM user INNER JOIN bankaccount ON bankaccount.UserID = user.UserID WHERE Username = %s and Password = %s''',
        (user, pw))

    lst = []
    if cur.rowcount < 1:
        return jsonify({})
    field_names = [i[0] for i in cur.description]

    for row in cur.fetchall():
        dict = {}
        for i in range(len(field_names)):
            if isinstance(row[i], (bytes, bytearray)):
                dict[field_names[i]] = row[i] != b'\x00'
                continue

            dict[field_names[i]] = row[i]
        lst.append(dict)

    return jsonify({"Username": user, "Accounts": lst})


@app.route(rule="/get_account_info", methods=["GET"])
def get_account_info(user: str = "AssociateDBS") -> Response:
    cur = myConnection.cursor()

    cur.execute(
        ''' SELECT * FROM user INNER JOIN bankaccount on user.UserID = bankaccount.UserID WHERE Username = %s''', user)

    field_names = [i[0] for i in cur.description]

    lst = []

    for row in cur.fetchall():
        dict = {}
        for i in range(len(field_names)):
            if isinstance(row[i], (bytes, bytearray)):
                dict[field_names[i]] = row[i] != b'\x00'
                continue

            dict[field_names[i]] = row[i]
        lst.append(dict)

    return jsonify(lst)


@app.route(rule="/get_transaction_details", methods=["GET"])
def get_transaction_details(user: str = "AssociateDBS") -> Response:
    cur = myConnection.cursor()

    cur.execute(
        ''' SELECT * FROM user INNER JOIN bankaccount on user.UserID = bankaccount.UserID 
        INNER JOIN scheduledtransactions on bankaccount.AccountID = scheduledtransactions.AccountID WHERE Username = %s''',
        user)

    field_names = [i[0] for i in cur.description]

    lst = []

    for row in cur.fetchall():
        dict = {}
        for i in range(len(field_names)):
            if isinstance(row[i], (bytes, bytearray)):
                dict[field_names[i]] = row[i] != b'\x00'
                continue

            dict[field_names[i]] = row[i]
        lst.append(dict)

    return jsonify(lst)


@app.route(rule="/get_user_details", methods=["GET"])
def get_user_details() -> Response:
    cur = myConnection.cursor()

    cur.execute('''SELECT * FROM user''')

    field_names = [i[0] for i in cur.description]

    lst = []

    for row in cur.fetchall():
        dict = {}
        for i in range(len(field_names)):
            if isinstance(row[i], (bytes, bytearray)):
                dict[field_names[i]] = row[i] != b'\x00'
                continue

            dict[field_names[i]] = row[i]
        lst.append(dict)

    return jsonify(lst)


@app.route(rule="/insert_transactions", methods=["POST"])
def insert_transactions() -> Response:
    print(request.form)
    transaction_id: int = int(request.form["TransactionID"])
    account_id: int = int(request.form["AccountID"])
    receiving_account_id: int = int(request.form["ReceivingAccountID"])
    date = request.form["Date"]
    transaction_amount: float = float(request.form["TransactionAmount"])
    comment: str = request.form["Comment"]

    cur = myConnection.cursor()

    cur.execute(
        ''' INSERT INTO scheduledtransactions (TransactionID, AccountID, ReceivingAccountID, Date, TransactionAmount, Comment)
        VALUES (%s, %s, %s, %s, %s, %s)''',
        (transaction_id, account_id, receiving_account_id, date, transaction_amount, comment))

    myConnection.commit()

    return jsonify({"success": True})


@app.route(rule="/update_user", methods=["POST"])
def update_user() -> Response:
    username = request.form["username"]
    email = request.form["email"]
    address = request.form["address"]

    cur = myConnection.cursor()

    cur.execute(
        '''UPDATE user SET Email = %s, Address = %s WHERE Username = %s''', (email, address, username))

    myConnection.commit()
    return jsonify({"success": True})


@app.route(rule="/delete_transaction", methods=["POST"])
def delete_transaction() -> Response:
    print(request.form)
    cur = myConnection.cursor()

    transaction_id = request.form.get('transaction_id')
    account_id = request.form.get('account_id')
    print(transaction_id, account_id)

    dict = {}
    cur.execute('''SELECT * FROM ScheduledTransactions WHERE TransactionID = %s AND AccountID = %s''',
                (transaction_id, account_id))

    if cur.rowcount < 1:
        dict['Status'] = False
        return jsonify(dict)

    cur.execute('''DELETE FROM ScheduledTransactions WHERE TransactionID = %s AND AccountID = %s AND Date > NOW()''',
                (transaction_id, account_id))
    myConnection.commit()

    cur.execute('''SELECT * FROM ScheduledTransactions WHERE TransactionID = %s AND AccountID = %s''',
                (transaction_id, account_id))

    if cur.rowcount < 1:
        dict['Status'] = True
    else:
        dict['Not Future Transaction'] = True

    return jsonify(dict)


@app.route(rule="/", methods=["POST"])
def get_list_of_users() -> Response:
    cols: list = []

    return jsonify({"account_info": cols})


if __name__ == "__main__":
    app.run()
