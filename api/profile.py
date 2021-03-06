import datetime
import os
from mimetypes import guess_type
from flask import Blueprint,request,Response,session,jsonify,send_file
from tempfile import SpooledTemporaryFile
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

@profile_api.route("/getProfile")
@login_required
def getProfile():
    userId,profile=verify()
    if userId and profile:
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

            return jsonify({'profile':{"id":profile.id,'name':profile.name,'homeDir':dir,"files":files}})
        except Exception as ex:
            return Response(False)
    else:
         return jsonify("Invalid profile"),500

@profile_api.route("/openFolder")
@login_required
def openFolder():

    path=request.args["path"]

    userId, profile = verify()
    if userId and profile:
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
    else:
        return jsonify("Invalid profile"), 500


@profile_api.route("/fileDetail")
@login_required
def getFileInfo():
    path = request.args["path"]
    userId, profile = verify()
    if userId and profile:
        try:

            sftp = profile.connect()
            stats=sftp.lstat(path)
            created= datetime.datetime.fromtimestamp(stats.st_atime)
            modified=datetime.datetime.fromtimestamp(stats.st_mtime)

            return jsonify({
                "size":format_bytes(stats.st_size),
                "created":created,
                "last_modified":modified,
                "path":path,
                "name":path.split('/')[-1],
                "permission":'',
                "isFile":sftp.isfile(path)
            })
        except Exception as ex:
            return Response(False)
    else:
        return jsonify("Invalid profile"), 500

@profile_api.route("/download")
@login_required
def download():
    path = request.args["path"]
    userId, profile = verify()
    try:
        sftp = profile.connect()
        with SpooledTemporaryFile(1024000) as file:  # example max size before moving to file = 1MB
            sftp.getfo(path, file)
            file.seek(0)
            mime,encoding= guess_type(path)
            res = Response(file.read(),
                         mimetype=mime,
                         headers={"Content-disposition":
                 "attachment; filename=%s"%os.path.basename(path)})
            return res
            #r.headers.set('Content-Disposition', 'attachment', filename=os.path.basename(path))
            #return send_file(f,as_attachment=True,mimetype=mime, attachment_filename=os.path.basename(path))
    except Exception as ex :
        print  ex


    return  False

@profile_api.route("/upload",methods=['POST'])
@login_required
def upload():
    files=request.files
    path = request.args["path"]
    userId, profile = verify()
    if userId and profile:
        try:
            sftp = profile.connect()
            sftp.cwd(path)
            for  file in files.itervalues():
                tempPath=os.path.join("temp",file.filename)
                file.save(tempPath)
                stats=sftp.put(tempPath)
                os.remove(tempPath)
        except Exception as ex:
            print (ex)
    return Response("Done")

@profile_api.route("/delete")
@login_required
def delete():
    path = request.args["path"]
    userId, profile = verify()
    if userId and profile:
        try:
            sftp = profile.connect()

            if(sftp.isfile(path)):
                sftp.remove(path)
            else:
                sftp.rmdir(path)

        except Exception as ex:
            print (ex)
    return Response("Done")


def verify():
    id = request.args["id"]
    userId = session["userId"]
    profile = ProfileModel.getById(id)
    if profile.userId != userId:
       return False
    else:
        return  userId,profile