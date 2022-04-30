from flask import Flask, jsonify, request, redirect, url_for, current_app
from flask_mongoengine import MongoEngine
from dotenv import load_dotenv
from pymongo import MongoClient

import datetime
import os

app = Flask(__name__)

# load URI from dotenv
load_dotenv()
MONGODB_URI = os.environ['MONGODB_URI']

# connect to database
try:
    client = MongoClient(MONGODB_URI)
    print("Database connected.")
except Exception as e:
    print("Database not connected.")

# navigate to the ClassMate database
db = client['ClassMate']

@app.route("/signup", methods=["GET", "POST"])
def signup():
    content = request.get_json(force=True)
    col = db['users']
    dict = { "studentnumber": content["number"], "password": content["password"], "school": content["school"] }

    insert = col.insert_one(dict)

    # return redirect(url_for(app.courses))


@app.route("/login", methods=["GET", "POST"])
def login():
    content = request.get_json(force=True)

    col = db['users']
    pw = col.find_one({"studentnumber": content.number }, {"password": 1})
    if (content.password == pw["password"]):
        return jsonify({ "studentnumber": content.number, "success" : True })

@app.route("/<schoolid>/courses")
def classes(schoolid):
    col = db[schoolid]

if __name__ == "__main__":
    app.run(debug=True)