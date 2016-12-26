/**
 * Created by 3fuyu on 16/10/11.
 */

import {Component} from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from '../../../../../node_modules/material-ui/Table';
import FlatButton from '../../../../../node_modules/material-ui/FlatButton';
import '../../../css/main.less';
import '../../../css/articleList.less';
import DataService from '../../service/DataService';
import moment from 'moment';
import Tools from '../../service/FYToolService';

class ArticleList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fixedHeader: false,
            fixedFooter: false,
            stripedRows: false,
            showRowHover: true,
            selectable: true,
            multiSelectable: true,
            enableSelectAll: true,
            deselectOnClickaway: true,
            showCheckboxes: true,
            tableData: []
        };
    }

    componentWillMount() {
        this.renderList();
    }

    renderList() {
        let t = this;

        DataService.adminQueryArticleList().then(function (data) {
            t.setState({
                tableData: data
            });
        });
    }

    delArticle(row) {
        let t = this;

        if (!row.id) return;

        Tools.confirm('删除确认', '确认删除该文章吗？', function () {
            DataService.adminDelArticle({
                id: row.id
            }).then(function (data) {
                Tools.tips('删除成功');
                t.renderList();
            });
        });
    }

    render() {
        return (
            <div id="article-list">
                <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}>
                    <TableHeader className="list-head">
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>文章标题</TableHeaderColumn>
                            <TableHeaderColumn>时间</TableHeaderColumn>
                            <TableHeaderColumn>分类</TableHeaderColumn>
                            <TableHeaderColumn className="option">操作</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {this.state.tableData.map((row, index) => (
                            <TableRow key={index} selected={row.selected}>
                                <TableRowColumn>{row.id}</TableRowColumn>
                                <TableRowColumn>{row.postTitle}</TableRowColumn>
                                <TableRowColumn>{moment(row.postDate).format('YYYY-MM-DD hh:mm')}</TableRowColumn>
                                <TableRowColumn>{row.postCategoryName}</TableRowColumn>
                                <TableRowColumn>
                                    <FlatButton label="del" secondary={true} onClick={()=>this.delArticle(row)}/>
                                    <FlatButton label="edit" primary={true}/>
                                </TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default ArticleList;