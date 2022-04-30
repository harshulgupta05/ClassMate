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

@app.route("/signup", methods=["GET", "POST"])
def signup():
    content = request.get_json(force=True)

    school_name = content["school"].replace(" ", "")

    db = client[school_name]
    col = db['users']
    dict = { "studentnumber": content["number"], "password": content["password"], "school": content["school"], "courses": [] }

    insert = col.insert_one(dict)
    return jsonify({"success": True})


@app.route("/login", methods=["GET", "POST"])
def login():
    content = request.get_json(force=True)

    school_name = content["school"].replace(" ", "")

    db = client[school_name]
    col = db['users']
    pw = col.find_one({"studentnumber": content["number"] }, {"password": 1})
    if (content["password"] == pw["password"]):
        return jsonify({ "studentnumber": content["number"], "success" : True })



@app.route("/<schoolName>/<userid>/courses", methods=["GET", "POST"])
def courses(schoolName, userid):
    db = client[schoolName]
    col = db["users"]

    #courses = col.findOne({"studentnumber": userid}).select({"courses": 1})
    courses = col.find_one({"studentnumber": userid})
    return courses

@app.route("/<schoolName>/<userid>/addCourse", methods=["GET", "POST"])
def addCourse(schoolName, userid):
    content = request.get_json(force=True)

    db = client[schoolName]
    col = db["users"]

    col.update_one({"studentnumber": userid}, {'$push': {'courses': content["course"]}})

    col = db[content["course"]]

    return jsonify({"success": True})    

if __name__ == "__main__":
    app.run(debug=True)

# TODO: fix courses (make it return Array), add Notes/HW and chat features