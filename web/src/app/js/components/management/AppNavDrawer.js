import React, {Component, PropTypes} from "react";
import Drawer from "../../../../../node_modules/material-ui/Drawer";
import {List, ListItem, MakeSelectable} from "../../../../../node_modules/material-ui/List";
import {spacing, typography, zIndex} from "../../../../../node_modules/material-ui/styles";
import {cyan500} from "../../../../../node_modules/material-ui/styles/colors";

const SelectableList = MakeSelectable(List);

const styles = {
    logo: {
        cursor: 'pointer',
        fontSize: 24,
        color: typography.textFullWhite,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        backgroundColor: cyan500,
        paddingLeft: spacing.desktopGutter,
        marginBottom: 8,
    },
    version: {
        paddingLeft: spacing.desktopGutterLess,
        fontSize: 16,
    },
};

class AppNavDrawer extends Component {
    static propTypes = {
        docked: PropTypes.bool.isRequired,
        location: PropTypes.object.isRequired,
        onChangeList: PropTypes.func.isRequired,
        onRequestChangeNavDrawer: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        style: PropTypes.object,
    };

    static contextTypes = {
        muiTheme: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired,
    };

    state = {
        muiVersions: [],
        leftOpen: true
    };

    componentDidMount() {
        // const self = this;
        // const url = '/versions.json';
        // const request = new XMLHttpRequest();
        //
        // request.onreadystatechange = function () {
        //     if (request.readyState === 4 && request.status === 200) {
        //         self.setState({
        //             muiVersions: JSON.parse(request.responseText),
        //             version: JSON.parse(request.responseText)[0],
        //         });
        //     }
        // };
        //
        // request.open('GET', url, true);
        // request.send();
    }

    render() {
        const {
            location,
            docked,
            onRequestChangeNavDrawer,
            onChangeList,
            open,
            style,
        } = this.props;

        return (
            <Drawer open={open}
                    className="menu"
                    style={style}
                    docked={docked}
                    onRequestChange={onRequestChangeNavDrawer}
                    containerStyle={{zIndex: zIndex.drawer - 100}}
            >
                <div className="menu-title">
                    3fuyu 管理后台
                </div>
                <SelectableList
                    value={location.pathname}
                    onChange={onChangeList}
                >
                    <ListItem
                        primaryText="文章管理"
                        primaryTogglesNestedList={true}
                        nestedItems={[
                        <ListItem primaryText="新建文章"
                            value="/management/new-article"
                            key="1"
                            href="#/management/new-article"
                        />
                    ]}
                    />
                    <ListItem
                        primaryText="分类管理"
                        value="/management/login"
                        primaryTogglesNestedList={true}
                        nestedItems={[]}
                        href="#/management/login"
                    />
                    <ListItem
                        primaryText="评论管理"
                        value="/management/comment"
                        primaryTogglesNestedList={true}
                        nestedItems={[]}
                    />
                </SelectableList>
            </Drawer>
        );
    }
}

export default AppNavDrawer;
