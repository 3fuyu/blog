import React, {Component, PropTypes} from "react";
import Drawer from "../../../../../node_modules/material-ui/Drawer";
import {List, ListItem, MakeSelectable} from "../../../../../node_modules/material-ui/List";
import {spacing, typography} from "../../../../../node_modules/material-ui/styles";
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
        const self = this;
        const url = '/versions.json';
        const request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                self.setState({
                    muiVersions: JSON.parse(request.responseText),
                    version: JSON.parse(request.responseText)[0],
                });
            }
        };

        request.open('GET', url, true);
        request.send();
    }

    firstNonPreReleaseVersion() {
        let version;
        for (let i = 0; i < this.state.muiVersions.length; i++) {
            version = this.state.muiVersions[i];
            // If the version doesn't contain '-' and isn't 'HEAD'
            if (!/-/.test(version) && version !== 'HEAD') {
                break;
            }
        }
        return version;
    }

    handleVersionChange = (event, index, value) => {
        if (value === this.firstNonPreReleaseVersion()) {
            window.location = 'http://www.material-ui.com/';
        } else {
            window.location = `http://www.material-ui.com/${value}`;
        }
    };

    currentVersion() {
        if (window.location.hostname === 'localhost') return this.state.muiVersions[0];
        if (window.location.pathname === '/') {
            return this.firstNonPreReleaseVersion();
        } else {
            return window.location.pathname.replace(/\//g, '');
        }
    }

    handleRequestChangeLink = (event, value) => {
        window.location = value;
    };

    handleTouchTapHeader = () => {
        this.context.router.push('/');
        this.props.onRequestChangeNavDrawer(false);
    };

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
            <Drawer open={open} className="menu">
                <div className="menu-title">
                    3fuyu 管理后台
                </div>
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
                    primaryTogglesNestedList={true}
                    nestedItems={[]}
                    href="#/management/login"
                />
                <ListItem
                    primaryText="评论管理"
                    primaryTogglesNestedList={true}
                    nestedItems={[]}
                />
            </Drawer>
        );
    }
}

export default AppNavDrawer;
