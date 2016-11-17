/**
 * Created by 3fuyu on 2016/11/15.
 */

import {Component} from "react";
import Avatar from "../../../../../node_modules/material-ui/Avatar";
import Chip from "../../../../../node_modules/material-ui/Chip";
import TextField from "../../../../../node_modules/material-ui/TextField";
import "../../../css/articleCategory.less";
import FYT from "../../service/FYToolService";
import md5 from "md5";

const styles = {
    chip: {
        margin: 4,
        color: '#fff'
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    labelColors: ['#3F53B1', '#2B98F0', '#1EBBD1', '#159487', '#663EB3', '#9A2EAD', '#E52464', '#F0443C']
};

class ArticleCategory extends Component {
    state = {
        data: [{
            content: 'java'
        }, {
            content: 'python'
        }, {
            content: 'javascript'
        }, {
            content: 'ubuntu'
        }, {
            content: 'ruby'
        }, {
            content: 'test'
        }],
    };

    handleRequestDelete() {
        console.log('delete');
    }

    handleTouchTap() {
        console.log('tap');
    }

    render() {
        var t = this;
        return (
            <div id="article-category">
                <div className="article-category-title">
                    <TextField
                        hintText="新增分类，enter确定"
                    />
                </div>
                <div className="article-category-list">
                    <div className="article-category-list-title">
                    </div>
                    <div className="article-categoyr-list-content">
                        {this.state.data.map(function (value, key) {
                            return (
                                <Chip onTouchTap={t.handleTouchTap}
                                      className="category-label-repeat"
                                      style={styles.chip}
                                      key={key}
                                      backgroundColor={FYT.hexToRgb(styles
                                          .labelColors['abcdefghijklmnopqrstuvwxyz0123456789'
                                      .indexOf(md5(value.content)
                                      .charAt(0).toLowerCase()) % styles.labelColors.length], 0.8)}
                                      onRequestDelete={t.handleRequestDelete}>
                                    <Avatar
                                        style={{
                                            backgroundColor: styles
                                                .labelColors['abcdefghijklmnopqrstuvwxyz0123456789'
                                            .indexOf(md5(value.content)
                                            .charAt(0).toLowerCase()) % styles.labelColors.length]
                                        }}
                                        size={32}>{value.content.substring(0, 1).toLocaleUpperCase()}
                                    </Avatar>
                                    {value.content}
                                </Chip>
                            );
                        })}
                    </div>
                </div>

            </div>
        );
    }
}

export default ArticleCategory;