import json
from flask import Blueprint, render_template
import paramiko
api= Blueprint('api', __name__)


@api.route("/test")
def test():
    import pysftp
    host="ec2-54-225-9-66.compute-1.amazonaws.com"
    un="ubuntu"
    passwd="zero1318"
    results=[]
    with pysftp.Connection(host,username=un,password=passwd) as sftp:
        list= sftp.listdir("/home/ubuntu")
        for item in list:
           results.append({
               'name':item,
               'isFile': sftp.isfile(item),
               #'stat':sftp.stat(item)
           })
        l= sftp.listdir(".npm")


    print("done")

    return json.dumps(results)