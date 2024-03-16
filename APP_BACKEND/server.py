# app.py
from flask import Flask, render_template, request, redirect, url_for, flash
from flask import Flask, jsonify,render_template, request, redirect, url_for
import mysql.connector
from flask_cors import CORS
from flask import jsonify

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="appointment"
)

mycursor = db.cursor()

@app.route("/")
def root():
    return jsonify({"message":"server is runnig"})

# Route for handling student login
@app.route('/login-student', methods=['POST'])
def login_student():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    # print(username,password)
    # type = request.form.get('student')
    query = f"SELECT * FROM students WHERE semail='{email}' AND spasword='{password}';"
    res = mycursor.execute(query)
    data = mycursor.fetchall()
    #print(data[0][0])
    return data

@app.route('/login-teacher', methods=['POST'])
def login_teacher():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    # print(username,password)
    # type = request.form.get('student')
    query = f"SELECT * FROM teachers WHERE temail='{email}' AND tpassword='{password}';"
    res = mycursor.execute(query)
    data = mycursor.fetchall()
    #print(data[0][0])
    return data


@app.route('/all/teacher', methods=['GET'])
def getAllTeacher():
    query = f"SELECT * FROM teachers;"
    res = mycursor.execute(query)
    data = mycursor.fetchall()
    #print(data[0][0])
    return data
        
@app.route("/get/teacher/free/slot/<tid>", methods=['GET'])
def getTeacherFreeSlots(tid):
    if request.method == "GET":
        # print(tid)
        query = f"SELECT free_id FROM teacher_free_slot WHERE teacher_id='{tid}'"
        mycursor.execute(query)
        data = mycursor.fetchall()
        response_data = []
        # print(data[0])
        for fid in data:
            # print(fid)
            innerQuery = f"SELECT free_id,free_date,free_time FROM free_slot WHERE free_id='{fid[0]}'"
            mycursor.execute(innerQuery)
            data = mycursor.fetchall()
            response_data.append(data[0])
        # print(response_data)  
        return response_data

@app.route("/teacher/add/free/slut", methods=['POST'])
def teacherAddFreeSlut():
    if request.method == "POST":
        data = request.json
        tid = data.get("tid")
        date = data.get("date")
        time = data.get("time")
        query = f"INSERT INTO free_slot(free_date,free_time) VALUES('{date}','{time}')"
        mycursor.execute(query)
        fid = mycursor.lastrowid
        querySecond = f"INSERT INTO teacher_free_slot(free_id,teacher_id) VALUES('{fid}','{tid}')"
        mycursor.execute(querySecond)
        db.commit()
        # print(data)
        return jsonify({"mesaage":"Slot Added"})

@app.route("/teacher/delete/free/slot/<fid>",methods=["DELETE"])
def teacherDeleteFreeSlut(fid):
    if request.method == "DELETE":
        # print(fid)
        query = f"DELETE FROM free_slot WHERE free_id='{fid}'"
        mycursor.execute(query)
        db.commit()
        return jsonify({"message":"slut deleted"})

@app.route("/student/request/teacher",methods=['POST'])
def studentRequestTeacher():
    if request.method == "POST":
        data = request.json
        sid = data.get("sid")
        tid = data.get("tid")
        fid = data.get("fid")
        status = data.get("status")
        query = "INSERT INTO student_request_teacher(sid,teacher_id,free_id,req_status) VALUES(%s,%s,%s,%s)"
        values = (sid,tid,fid,status)
        mycursor.execute(query,values)
        db.commit()
        # print(data)
        return jsonify({"message":"successs req"})

@app.route("/get/all/studnet/requests/<sid>",methods=['GET'])
def getAllStudentRequests(sid):
    if request.method == "GET":
        response = []
        query = f"SELECT teacher_id,free_id,req_status FROM student_request_teacher WHERE sid='{sid}'"
        mycursor.execute(query)
        datas = mycursor.fetchall()
        for data in datas:
            innerResponse = []
            # print(data)
            innerResponse.append(data[0])
            tquery = f"SELECT tname FROM teachers WHERE teacher_id='{data[0]}'"
            mycursor.execute(tquery)
            tname = mycursor.fetchall()[0][0]
            innerResponse.append(tname)
            # print(tname)
            fquery = f"SELECT free_date,free_time FROM free_slot WHERE free_id='{data[1]}'"
            mycursor.execute(fquery)
            temp = mycursor.fetchall()[0]
            date = temp[0]
            time = temp[1]
            # print(temp)
            innerResponse.append(date)
            innerResponse.append(time)
            innerResponse.append(data[2])
            response.append(innerResponse)
        return response

@app.route("/get/all/teacher/requests/<tid>",methods=['GET'])
def getAllTeacherRequests(tid):
    if request.method == "GET":
        # print(tid)
        response = []
        query = f"SELECT sid,free_id FROM student_request_teacher WHERE teacher_id='{tid}' AND req_status='request'"
        mycursor.execute(query)
        datas = mycursor.fetchall()
        # print(datas)
        for data in datas:
            innerResponse = []
            snameQuery = f"SELECT sname FROM students WHERE sid='{data[0]}'"
            mycursor.execute(snameQuery)
            sname = mycursor.fetchall()[0][0]
            # print(sname)
            innerResponse.append(sname)
            
            fquery = f"SELECT free_date,free_time FROM free_slot WHERE free_id='{data[1]}'"
            mycursor.execute(fquery)
            temp = mycursor.fetchall()[0]
            date = temp[0]
            time = temp[1]
            # print(temp)
            innerResponse.append(date)
            innerResponse.append(time)
            innerResponse.append(data[1])
            response.append(innerResponse)
        return response

@app.route("/teacher/accept/student/request/<fid>",methods = ["PUT"])
def teacherAcceptStudentRequest(fid):
    if request.method == "PUT":
        query = f"UPDATE student_request_teacher SET req_status='accept' WHERE free_id='{fid}'"
        mycursor.execute(query)
        db.commit()
        return jsonify({"message":"Req Accepted"})

@app.route("/teacher/reject/student/request/<fid>",methods = ["PUT"])
def teacherRejectStudentRequest(fid):
    if request.method == "PUT":
        query = f"UPDATE student_request_teacher SET req_status='reject' WHERE free_id='{fid}'"
        mycursor.execute(query)
        db.commit()
        return jsonify({"message":"Req Rejected"})

if __name__ == '__main__':
    app.secret_key = 'your_secret_key'
    app.run(debug=True)
