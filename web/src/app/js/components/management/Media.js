/**
 * Created by 3fuyu on 2017/2/14.
 */

import React, {PropTypes, Component} from "react";
import RaisedButton from "../../../../../node_modules/material-ui/RaisedButton";
import UP from "../lib/upload";
import DataService from "../../service/DataService";
import FYT from "../../service/FYToolService";

const styles = {
    button: {
        margin: 12,
    },
    exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
    img_container: {
        position: "relative",
        width: 130,
        height: 130
    },
    imgs: {
        display: "flex"
    },
    img: {
        margin: 15,
        width: 100,
        height: 100,
        borderRadius: 10
    },
    img_close: {
        position: 'absolute',
        display: "flex",
        alignItems: "cengter",
        justifyContent: "center",
        top: 15,
        right: 15,
        width: 20,
        height: 20,
        borderRadius: "50%",
        fontSize: 12,
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.34)"
    },
    upload_btn: {
        margin: 12
    }
};

let imgsArr = [];

class Media extends Component {
    state = {
        imgs: [],
        isShow: false,
        imgsList: []
    };

    componentWillMount() {
        this.getImgList();
    }

    getImgList() {
        var t = this;

        DataService.adminQueryImgList().then(function (data) {
            t.setState({
                imgsList: data
            });
        });
    }

    componentDidMount() {
        var params = {
            fileInput: $("#fileImage").get(0),
            filter: this.filter,
            onSelect: this.onSelect.bind(this),
            onProcess: this.onProgress,
            onSuccess: this.onSuccess,
            onFailure: this.onFailure
        }

        var upload = _.extend(UP, params);

        upload.init();
    }

    filter(files) {
        var arrFiles = [];
        for (var i = 0, file; file = files[i]; i++) {
            if (file.type.indexOf("image") === 0) {
                if (file.size >= 512000) {
                    alert('您这张"' + file.name + '"图片大小过大，应小于500k');
                } else {
                    arrFiles.push(file);
                }
            } else {
                alert('文件"' + file.name + '"不是图片。');
            }
        }

        imgsArr = arrFiles;
        return imgsArr;
    }

    onSelect(files) {
        var html = '', t = this;
        var funAppendImage = function () {

            imgsArr = files;

            files.forEach(function (value, key) {
                if (value) {
                    var reader = new FileReader()
                    reader.onload = function (e) {
                        console.log(e);

                        files[key].src = e.target.result;

                        t.setState({
                            imgs: files
                        });

                        if (files && files.length > 0) {
                            t.setState({
                                isShow: true
                            })
                        }
                    }
                    reader.readAsDataURL(value);
                } else {
                    console.log("选择成功");
                }
            });
        };
        funAppendImage();
    }

    onProgress(file, loaded, total) {
        var eleProgress = $("#uploadProgress_" + file.index), percent = (loaded / total * 100).toFixed(2) + '%';
        eleProgress.show().html(percent);
    }

    onSuccess(file, response) {
        console.log('上传成功');
    }

    onFailure(file) {
    }

    deleteImg(index) {
        imgsArr.splice(index, 1);
        this.setState({
            imgs: imgsArr
        });

        if (imgsArr.length === 0) {
            this.setState({
                isShow: false
            });
        }
        console.log('delete');
    }

    submitMedia() {
        let form = new FormData($('#uploadForm')[0]),
            t = this;

        console.log(form);
        $.ajax({
            url: 'http://localhost:8080/api/admin/upload/image',
            type: 'post',
            data: form,
            async: false,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log('success');
                t.getImgList();
                t.setState({
                    imgs: []
                });
                FYT.tips('上传成功');
            },
            error: function (data) {
                console.log('error');
            }
        });
    }

    deleteImgList(id) {
        var t = this;

        DataService.adminDelImg({
            id: id
        }).then(function (data) {
            console.log(data);
            t.getImgList();
            FYT.tips('删除成功');
        });
    }

    render() {
        var _this = this;

        return (
            <div>
                <div className="imgs" style={styles.imgs}>
                    {this.state.imgsList.map(function (value, index) {
                        return (
                            <div key={index} style={styles.img_container}>
                                <img src={value.url} alt="" style={styles.img}/>
                                <div style={styles.img_close} onClick={() => _this.deleteImgList(value.id)}>
                                    <i className="icon iconfont icon-close"
                                       style={{fontSize: '12px', position: 'relative', top: '-1px'}}></i>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <form id="uploadForm" action="">
                    <RaisedButton
                        label="Choose Image"
                        labelPosition="before"
                        style={styles.button}
                        containerElement="label"
                        className="upload_choose"
                    >
                        <input type="file" id="fileImage" name="img" style={styles.exampleImageInput} multiple/>
                    </RaisedButton>
                    <div id="preview" className="upload_preview">
                        <div className="imgs" style={styles.imgs}>
                            {this.state.imgs.map(function (value, index) {
                                return (
                                    <div key={index} style={styles.img_container}>
                                        <img src={value.src} alt="" style={styles.img}/>
                                        <div style={styles.img_close} onClick={() => _this.deleteImg(index)}>
                                            <i className="icon iconfont icon-close"
                                               style={{fontSize: '12px', position: 'relative', top: '-1px'}}></i>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <RaisedButton className={this.state.isShow ? 'show' : 'hide'} label="上传" primary={true}
                                  style={styles.upload_btn} onClick={() => this.submitMedia()}/>
                </form>
            </div>
        );
    }
}

export default Media;