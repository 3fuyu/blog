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
import DataService from "../../service/DataService";

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
        data: [],
        nameErr: ''
    };

    componentWillMount() {
        this.getTermsList();
    }

    getTermsList() {
        let t = this;

        DataService.adminQueryTermsList({}).then(function (data) {
            t.setState({
                data: data
            });
        });
    }

    handleRequestDelete() {
        console.log('delete');
    }

    handleTouchTap() {
        console.log('tap');
    }

    submitCategory(_event) {
        let t = this;
        let event = _.cloneDeep(_event);

        if (event.charCode === 13) {
            let value = event.target.value;

            if (value) {
                this.setState({
                    nameErr: ''
                });

                DataService.adminTermsNew({
                    name: value
                }).then(function (data) {
                    FYT.tips('新建成功');

                    event.target.value = '';
                    $(event).blur();

                    t.getTermsList();
                });
            } else {
                this.setState({
                    nameErr: '分类不能为空'
                });
            }
        }
    }

    render() {
        var t = this;
        return (
            <div id="article-category">
                <div className="article-category-title">
                    <TextField
                        hintText="新增分类，enter确定"
                        onKeyPress={(event) => this.submitCategory(event)}
                        errorText={this.state.nameErr}
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
                                      .indexOf(md5(value.name)
                                      .charAt(0).toLowerCase()) % styles.labelColors.length], 0.8)}
                                      onRequestDelete={t.handleRequestDelete}>
                                    <Avatar
                                        style={{
                                            fontSize: '12px',
                                            backgroundColor: styles
                                                .labelColors['abcdefghijklmnopqrstuvwxyz0123456789'
                                            .indexOf(md5(value.name)
                                            .charAt(0).toLowerCase()) % styles.labelColors.length]
                                        }}>{value.name.substring(0, 1).toLocaleUpperCase()}
                                    </Avatar>
                                    {value.name}
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