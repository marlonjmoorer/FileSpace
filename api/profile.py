import datetime
from flask import Blueprint,request,Response,session,jsonify
import os
from  util import  login_required ,format_bytes
from models.ProfileModel import ProfileModel


profile_api= Blueprint("profile",__name__)


@profile_api.route("/addProfile",methods=['POST'])
@login_required
def add():
    userId=session["userId"]

    name= request.form["name"]
    host=request.form["host"]
    port=request.form["port"] or 22
    username=request.form["username"]
    password=request.form["password"]

    errorMessages=[]

    if not name:
        errorMessages.append("Name is required")
    if not host:
        errorMessages.append("Host is required")
    if not username:
        errorMessages.append("Username is required")
    elif len(password)<6:
        errorMessages.append("Username must be at least 6 characters")
    if not password:
        errorMessages.append("Password is required")
    elif len(password)<8:
        errorMessages.append("Password must be at least 8 characters")

    if errorMessages:
        return jsonify({"messages":errorMessages}),500
    else:
        profile = ProfileModel(name,host, port, username, password)
        profile.userId = userId
        if profile.save():
            return jsonify({"success": True}), 200
        else:
            return jsonify("Profile not saved"), 500











@profile_api.route("/getProfiles")
@login_required
def getProfiles():
    userId = session["userId"]
    profiles=ProfileModel.getProfilesForUser(userId)
    result=[{'name':p.name,'id':p.id} for p in profiles]
    return jsonify(result)

@profile_api.route("/getProfile/<id>")
@login_required
def getProfile(id):
    userId = session["userId"]
    profile=ProfileModel.getById(id)
    if profile.userId!=userId:
        return jsonify("Invalid profile"),500

    try:

        sftp=profile.connect()
        files=[]
        sftp.cwd(".")
        dir=sftp.getcwd()
        list = sftp.listdir(dir)
        for item in list:
            files.append({
                'name': item,
                'isFile': sftp.isfile(item),
                # 'stat':sftp.stat(item)
            })

        return jsonify({'profile':{"id":profile.id,'name':profile.name,'dirname':dir,"files":files}})
    except Exception as ex:
        return Response(False)

@profile_api.route("/openFolder")
@login_required
def openFolder():

    path=request.args["path"]

    id=request.args["id"]
    userId = session["userId"]
    profile=ProfileModel.getById(id)
    if profile.userId!=userId:
        return jsonify("Invalid profile"),500
    try:


        sftp=profile.connect()
        files=[]
        sftp.cwd(path)
        dir=sftp.getcwd()
        list = sftp.listdir(dir)
        for item in list:
            files.append({
                'name': item,
                'isFile': sftp.isfile(item),
                # 'stat':sftp.stat(item)
            })

        return jsonify({'dirname':dir,"files":files})
    except Exception as ex:
        return Response(False)


@profile_api.route("/fileDetail")
@login_required
def getFileInfo():
    path = request.args["path"]
    id = request.args["id"]
    userId = session["userId"]
    profile = ProfileModel.getById(id)
    if profile.userId != userId:
        return jsonify("Invalid profile"), 500

    try:

        sftp = profile.connect()
        stats=sftp.lstat(path)
        created= datetime.datetime.fromtimestamp(stats.st_atime)
        modified=datetime.datetime.fromtimestamp(stats.st_mtime)
        n=path.split('/')[-1]
        return jsonify({
            "size":format_bytes(stats.st_size),
            "created":created,
            "last_modified":modified,
            "path":path,
            "name":path.split('/')[-1]
        })
    except Exception as ex:
        return Response(False)