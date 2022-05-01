import json
from sqlite3 import connect
from flask import Flask, jsonify, make_response, request, redirect, url_for, current_app
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
@app.route("/signup", methods=["POST"])
def signup():
    content = request.get_json(force=True)

    school_name = content["school"].replace(" ", "")

    db = client[school_name]
    col = db['users']
    dict = { "studentnumber": content["number"], "password": content["password"], "school": content["school"], "courses": [] }

    insert = col.insert_one(dict)
    resp = jsonify({"success": True})
    resp.headers.add('Access-Control-Allow-Origin', '*')
    return resp

# login call
@app.route("/login", methods=["POST"])
def login():
    content = request.get_json(force=True)

    school_name = content["school"].replace(" ", "")

    db = client[school_name]
    col = db['users']
    pw = col.find_one({"studentnumber": content["number"] }, {"password": 1, "school": 1})
    if (content["password"] == pw["password"]):
        print("Logged in!")
        resp = jsonify({"success": "true"})
        resp.headers.add('Access-Control-Allow-Origin', '*')
        return resp

# show courses 
@app.route("/<schoolName>/<userid>/courses", methods=["GET"])
def courses(schoolName, userid):
    db = client[schoolName]
    col = db["users"]

    data = list(col.find({"studentnumber": userid}, {"courses": 1, "_id": 0}))
    data = data[0]
    print(data)
    data = jsonify(data)
    data.headers.add('Access-Control-Allow-Origin', '*')
    return data

    # return { "success": True}
    # res = res["courses"]

    # resp = jsonify({
    #     "courses": res
    # })
    # resp.headers.add('Access-Control-Allow-Origin', '*')
    # return resp

# add courses 
@app.route("/<schoolName>/<userid>/addCourse", methods=["POST"])
def addCourse(schoolName, userid):
    content = request.get_json(force=True)

    db = client[schoolName]
    col = db["users"]

    col.update_one({"studentnumber": userid}, {'$push': {'courses': content["course"]}})

    col = db["courses"]

    if (col.find_one({"code": content["course"]}) == None):
        col.insert_one({"code": content["course"], "notes": [], "homework": [], "chat": []})

    resp = jsonify({"success": True})
    resp.headers.add('Access-Control-Allow-Origin', '*')
    return resp

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
@app.route("/<schoolName>/<userid>/<course>/addHW", methods=["POST"])
def addHW(schoolName, userid, course):
    db = client[schoolName]
    col = db["courses"]

    content = request.get_json(force=True)

    newHW = { "user": userid, "timetamp": datetime.now(), "file": content["image"]}

    col.update_one({"code": course}, {'$push': {'homework': newHW }})

    return jsonify({ "success": True })

# get HW
@app.route("/<schoolName>/<userid>/<course>/getHW", methods=["GET"])
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