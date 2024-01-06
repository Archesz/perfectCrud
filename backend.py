from flask import Flask, jsonify, request
from flask_cors import CORS

import firebase_admin
from firebase_admin import credentials, db

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate('./secrets/creds.json')

firebase_admin.initialize_app(cred, {
    'databaseURL': "https://crudperfect-default-rtdb.firebaseio.com"
})

students_ref = db.reference('/Estudantes')

@app.route('/students', methods=['POST'])
def create_student():
    data = request.json
    new_student = students_ref.push(data)
    return jsonify({"student_id": new_student.key}), 201


if __name__ == '__main__':
    app.run(debug=True)