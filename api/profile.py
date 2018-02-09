from flask import Blueprint,request,Response,session
import pysftp
from  util import  login_required
from models.ProfileModel import ProfileModel
profile_api= Blueprint("profile",__name__)


@profile_api.route("/addProfile",methods=['POST'])
@login_required
def add():
    user=session["user"]
    testConnection= request.args.get('test')
    host=request.form["host"]
    port=request.form["port"] or 22
    username=request.form["username"]
    password=request.form["password"]



    if testConnection:
        try:
            with pysftp.Connection(host, username=username, password=password,port=port) as sftp:
                if sftp:
                    return Response(True)
        except Exception as ex:
            return Response(False)

    profile=ProfileModel(host,port,username,password)
    profile.userId=user.id
    if profile.save():
        return  Response("Profile saved"),200
    else:
        return Response("Profile not saved saved"), 500

