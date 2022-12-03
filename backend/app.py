from flask import Flask, Response, jsonify, request
# from flask_cors import CORS
import pymysql

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


@app.route(rule="/", methods=["POST"])
def insert_transactions() -> Response:
    cols: list = []

    return jsonify({"account_info": cols})


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
