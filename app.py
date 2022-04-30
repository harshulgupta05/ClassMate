from sqlite3 import connect
from flask import Flask, jsonify, request, redirect, url_for, current_app
from flask_mongoengine import MongoEngine
from dotenv import load_dotenv
from pymongo import MongoClient

from datetime import datetime
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

# signup call
@app.route("/signup", methods=["GET", "POST"])
def signup():
    content = request.get_json(force=True)

    school_name = content["school"].replace(" ", "")

    db = client[school_name]
    col = db['users']
    dict = { "studentnumber": content["number"], "password": content["password"], "school": content["school"], "courses": [] }

    insert = col.insert_one(dict)
    return jsonify({"success": True})

# login call
@app.route("/login", methods=["GET", "POST"])
def login():
    content = request.get_json(force=True)

    school_name = content["school"].replace(" ", "")

    db = client[school_name]
    col = db['users']
    pw = col.find_one({"studentnumber": content["number"] }, {"password": 1})
    if (content["password"] == pw["password"]):
        return jsonify({ "studentnumber": content["number"], "success" : True })

# show courses 
@app.route("/<schoolName>/<userid>/courses", methods=["GET", "POST"])
def courses(schoolName, userid):
    db = client[schoolName]
    col = db["users"]

    pipeline = [
        { "$match": {"studentnumber": userid } }
    ]

    res = col.aggregate(pipeline)
    res = res["courses"]

    return jsonify({
        "courses": res
    })

# add courses 
@app.route("/<schoolName>/<userid>/addCourse", methods=["GET", "POST"])
def addCourse(schoolName, userid):
    content = request.get_json(force=True)

    db = client[schoolName]
    col = db["users"]

    col.update_one({"studentnumber": userid}, {'$push': {'courses': content["course"]}})

    col = db["courses"]

    if (col.find_one({"code": content["course"]}) == None):
        col.insert_one({"code": content["course"], "notes": [], "homework": [], "chat": []})

    return jsonify({"success": True})

# add notes
@app.route("/<schoolName>/<userid>/<course>/addNote", methods=["POST"])
def addNote(schoolName, userid, course):
    db = client[schoolName]
    col = db["courses"]

    content = request.get_json(force=True)

    note = { "user": userid, "timestamp": datetime.now(), "file": content["image"]}

    col.update_one({"code": course}, {'$push': {'notes': note }})

    return jsonify({"success": True})

# get notes
@app.route("/<schoolName>/<userid>/<course>/notes", methods=["GET"])
def getNotes(schoolName, userid, course):
    db = client[schoolName]
    col = db["courses"]

    pipeline = [
        { "$match": { "course": course} }
    ]

    notes = col.aggregate(pipeline)
    notes = notes["notes"]

    return jsonify({
        "notes": notes
    })

# add HW
@app.routes("/<schoolName>/<userid>/<course>/addHW", methods=["POST"])
def addHW(schoolName, userid, course):
    db = client[schoolName]
    col = db["courses"]

    content = request.get_json(force=True)

    newHW = { "user": userid, "timetamp": datetime.now(), "file": content["image"]}

    col.update_one({"code": course}, {'$push': {'homework': newHW }})

    return jsonify({ "success": True })

# get HW
@app.routes("/<schoolName>/<userid>/<course>/getHW", methods=["GET"])
def getHW(schoolName, userid, course):
    db = client[schoolName]
    col = db["courses"]

    pipeline = [
        { "$match": { "course": course}}
    ]

    hw = col.aggregate(pipeline)
    hw = hw["homework"]

    return jsonify({
        "homework": hw
    })

# run Flask app
if __name__ == "__main__":
    app.run(debug=True)

# TODO: fix courses (make it return Array), read Notes/HW and chat features