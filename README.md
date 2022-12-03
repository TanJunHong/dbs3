# DBS3
Created for DBS TechTrek Dec 2022
## Prerequisites
1. Python with flask, flask_cors, pymysql
2. NodeJS with React
## Quick Setup
1. Download the Bank.sql file from https://github.com/WeiYangChia/DBSTT1/tree/main/Main%20Challenge%20Data/ and place it somewhere accessible
2. Start MySQL server from command line with `mysql -u root -p` and input the password you set when installing MySQL
3. Load the Bank.sql into MySQL by entering `source absolute/path/of/Bank.sql`
4. In backend/app.py, change Line 17 `pymysql.connect(passwd='1234')` password to the same as in 2)
5. In one terminal, run backend/app.py with Python
6. In another terminal, `cd` to client and run `npm start`
