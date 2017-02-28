/**
 * Created by 3fuyu on 2017/2/14.
 */

import React, {PropTypes, Component} from 'react';
import RaisedButton from '../../../../../node_modules/material-ui/RaisedButton';
import UP from '../lib/upload'

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
};

class Media extends Component {

    componentWillMount() {
        var params = {
            filter: this.filter,
            onSelect: this.onSelect,
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
        var html = '', i = 0;
        $("#preview").html('<div class="upload_loading"></div>');
        var funAppendImage = function () {
            file = files[i];
            if (file) {
                var reader = new FileReader()
                reader.onload = function (e) {
                    html = html + '<div id="uploadList_' + i + '" class="upload_append_list"><p><strong>' + file.name + '</strong>' +
                        '<a href="javascript:" class="upload_delete" title="删除" data-index="' + i + '">删除</a><br />' +
                        '<img id="uploadImage_' + i + '" src="' + e.target.result + '" class="upload_image" /></p>' +
                        '<span id="uploadProgress_' + i + '" class="upload_progress"></span>' +
                        '</div>';

                    i++;
                    funAppendImage();
                }
                reader.readAsDataURL(file);
            } else {
                console.log('选择成功');
            }
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
                    label="Choose an Image"
                    labelPosition="before"
                    style={styles.button}
                    containerElement="label"
                    className="upload_choose"
                >
                    <input type="file" id="fileImage" style={styles.exampleImageInput}/>
                </RaisedButton>
            </div>
        );
    }
}

export default Media;