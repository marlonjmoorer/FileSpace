import React,{Component} from 'react'
import axios from 'axios'
import { format } from 'path';



class UploadModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileQueue:[]
        };
    }

    addFile=({files})=>{
        console.log(files)
       this.setState({fileQueue:[...files,...this.state.fileQueue]},()=>{
           console.log(this.state.fileQueue)
       })
    }
    removeFile=(index)=>{
        let {fileQueue}= this.state
        fileQueue.splice(index,1)
        this.setState({fileQueue})
    }
    componentDidMount() {
        $(`#${this.props.modalId}`).modal()
       
    }
  

    render(){
        let {fileQueue}=this.state
        return(
            <div id={this.props.modalId} className="modal">
            <div className="modal-content">
                <h4>Uploads</h4>
                <table className="striped">
                    <tbody>
                        {
                            fileQueue.map((file,i)=>
                                <tr key={i}>
                                    <td>{file.name}</td>
                                    <td>{file.type}</td>
                                    <td>{formatFileSize(file.size)}</td>
                                    <td><a href="#!" onClick={this.removeFile.bind(this,i)} ><i className="material-icons right ">delete</i></a></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="modal-footer">
                <input id="file" onChange={(e)=>this.addFile(e.target)} type="file" className="hide"/>
                <label htmlFor="file" className="btn" ><i className="material-icons left ">add</i> Add </label>
                <button className={fileQueue.length>0?"btn":"btn disabled"} onClick={this.props.uploadFiles.bind(this,fileQueue)} ><i className="material-icons left ">cloud_upload</i> Upload </button>
            </div>
        </div>

        )
    }

}



const formatFileSize=(bytes,decimalPoint=2)=> {
    if(bytes == 0) return '0 Bytes';
    var k = 1000,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimalPoint)) + ' ' + sizes[i];
}
export default UploadModal;