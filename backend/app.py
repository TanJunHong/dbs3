from flask import Flask, Response, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)


@app.route('/')
def hello():
    return 'Hello, World!'


app: Flask = Flask(__name__)
CORS(app)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'flask'


@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        name = request.form['name']
        age = request.form['age']
        cursor = mysql.connection.cursor()
        # cursor.execute(''' INSERT INTO info_table VALUES(%s,%s)''', (name, age))
        mysql.connection.commit()
        cursor.close()
        return f"Done!!"


@app.route(rule="/get_account_info", methods=["POST"])
def get_account_info(user: str) -> Response:
    cursor = mysql.connection.cursor()
    cursor.execute(
        ''' SELECT * FROM user INNER JOIN bankaccount on user.UserID = bankaccount.UserID WHERE Username = %s''',
        user)
    result = cursor.fetchall()
    # mysql.connection.commit()
    cursor.close()
    cols: list = []

    return jsonify({"account_info": cols})


@app.route(rule="/", methods=["POST"])
def get_transaction_details() -> Response:
    cols: list = []

    return jsonify({"account_info": cols})


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
    mysql = MySQL(app)
    app.run()
