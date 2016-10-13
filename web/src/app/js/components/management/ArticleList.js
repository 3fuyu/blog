/**
 * Created by 3fuyu on 16/10/11.
 */

import {Component} from "react";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "../../../../../node_modules/material-ui/Table";
import '../../../css/articleList.less';
import DataService from '../../service/DataService';
import moment from 'moment';

const tableData = [{
        name: 'John Smith',
        status: 'Employed',
    }, {
        name: 'Randal White',
        status: 'Unemployed',
    }, {
        name: 'Stephanie Sanders',
        status: 'Employed',
    }, {
        name: 'Steve Brown',
        status: 'Employed',
    }, {
        name: 'Joyce Whitten',
        status: 'Employed',
    }, {
        name: 'Samuel Roberts',
        status: 'Employed',
    }, {
        name: 'Adam Moore',
        status: 'Employed',
    }
];

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
        let t = this;

        DataService.queryArticalList().then(function (data) {
            t.setState({
                tableData: data
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
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {this.state.tableData.map( (row, index) => (
                            <TableRow key={index} selected={row.selected}>
                                <TableRowColumn>{row.id}</TableRowColumn>
                                <TableRowColumn>{row.postTitle}</TableRowColumn>
                                <TableRowColumn>{moment(row.postDate).format('YYYY-MM-DD hh:mm')}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default ArticleList;