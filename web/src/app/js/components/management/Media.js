/**
 * Created by 3fuyu on 2017/2/14.
 */

import React, {PropTypes, Component} from "react";
import RaisedButton from "../../../../../node_modules/material-ui/RaisedButton";
import UP from "../lib/upload";

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
    img: {
        margin: 15,
        width: 100,
        height: 100,
        borderRadius: 10
    }
};

class Media extends Component {
    state = {
        imgs: []
    };

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
        return arrFiles;
    }

    onSelect(files) {
        var html = '', t = this;
        var funAppendImage = function () {

            files.forEach(function (value, key) {
                if (value) {
                    var reader = new FileReader()
                    reader.onload = function (e) {
                        console.log(e);

                        files[key].src = e.target.result;

                        t.setState({
                            imgs: files
                        });
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
        $("#uploadInf").append("<p>图片" + file.name + "上传失败！</p>");
        $("#uploadImage_" + file.index).css("opacity", 0.2);
    }

    render() {
        return (
            <div>
                <RaisedButton
                    label="Choose Image"
                    labelPosition="before"
                    style={styles.button}
                    containerElement="label"
                    className="upload_choose"
                >
                    <input type="file" id="fileImage" style={styles.exampleImageInput} multiple/>
                </RaisedButton>
                <div id="preview" className="upload_preview">
                    <div className="imgs">
                        {this.state.imgs.map(function (value, index) {
                            return (
                                <img src={value.src} alt="" key={index} style={styles.img}/>
                            );
                        })}
                    </div>
                </div>

            </div>
        );
    }
}

export default Media;