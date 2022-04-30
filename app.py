from flask import Flask
from flask_mongoengine import MongoEngine
from dotenv import load_dotenv
from pymongo import MongoClient

import datetime
import os

app = Flask(__name__)

load_dotenv()

MONGODB_URI = os.environ['MONGODB_URI']

try:
    client = MongoClient(MONGODB_URI)
    print("Database connected.")
except Exception as e:
    print("Database not connected.")

