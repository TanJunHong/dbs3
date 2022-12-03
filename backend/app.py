from flask import Flask, Response, jsonify, request
# from flask_cors import CORS
import pymysql
from datetime import datetime

app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello, World!'


app: Flask = Flask(__name__)
# CORS(app)

myConnection = pymysql.connect(host="localhost", user="root", passwd="1234", db="bank")


@app.route(rule='/login', methods=['GET'])
def login(user: str = "AssociateDBS", pw: str = "Whatis2Years"):
    cur = myConnection.cursor()

    cur.execute(''' SELECT * FROM user WHERE Username = %s and Password = %s''', (user, pw))

    return jsonify({"status": cur.rowcount > 0})


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
        INNER JOIN scheduledtransactions on bankaccount.AccountID = scheduledtransactions.AccountID WHERE Username = %s''', user)

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

@app.route(rule="/insert_transactions", methods=["GET"])
def insert_transactions() -> Response:
    now = datetime.now()
    # account_id: str = request.form["account_id"] or "1"
    # receiving_account_id: str = request.form["receiving_account_id"] or "2"
    # date = request.form["date"] or now.strftime('%Y-%m-%d %H:%M:%S')
    # transaction_amount: float = float(request.form["transaction_amount"]) or 100
    # comment: str = request.form["comment"] or "hello"
    transaction_id: int = 200
    account_id: str = "1"
    receiving_account_id: str = "2"
    date = now.strftime('%Y-%m-%d %H:%M:%S')
    transaction_amount: float = 100
    comment: str = "hello"

    cur = myConnection.cursor()

    cur.execute(
        ''' INSERT INTO scheduledtransactions (TransactionID, AccountID, ReceivingAccountID, Date, TransactionAmount, Comment)
        VALUES (%s, %s, %s, %s, %s, %s)''', (transaction_id, account_id, receiving_account_id, date, transaction_amount, comment))

    myConnection.commit()

    return jsonify({"success": True})


@app.route(rule="/", methods=["POST"])
def delete_transaction() -> Response:
    cols: list = []

    return jsonify({"account_info": cols})


@app.route(rule="/", methods=["POST"])
def get_list_of_users() -> Response:
    cols: list = []

    return jsonify({"account_info": cols})


if __name__ == "__main__":
    app.run()