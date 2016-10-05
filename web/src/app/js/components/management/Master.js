import React, {Component, PropTypes} from "react";
import Title from "react-title-component";
import AppBar from "../../../../../node_modules/material-ui/AppBar";
import IconButton from "../../../../../node_modules/material-ui/IconButton";
import spacing from "../../../../../node_modules/material-ui/styles/spacing";
import getMuiTheme from "../../../../../node_modules/material-ui/styles/getMuiTheme";
import {darkWhite, lightWhite, grey900} from "../../../../../node_modules/material-ui/styles/colors";
import AppNavDrawer from "./AppNavDrawer";
import FullWidthSection from "./FullWidthSection";
import withWidth, {MEDIUM, LARGE} from "../../../../../node_modules/material-ui/utils/withWidth";

class Master extends Component {
    static propTypes = {
        children: PropTypes.node,
        location: PropTypes.object,
        width: PropTypes.number.isRequired,
    };

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    static childContextTypes = {
        muiTheme: PropTypes.object,
    };

    state = {
        navDrawerOpen: false,
    };

    getChildContext() {
        return {
            muiTheme: this.state.muiTheme,
        };
    }

    componentWillMount() {
        this.setState({
            muiTheme: getMuiTheme(),
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
        this.setState({
            muiTheme: newMuiTheme,
        });
    }

    getStyles() {
        const styles = {
            appBar: {
                position: 'fixed',
                // Needed to overlap the examples
                zIndex: this.state.muiTheme.zIndex.appBar + 1,
                top: 0,
            },
            root: {
                paddingTop: spacing.desktopKeylineIncrement,
                minHeight: 400,
            },
            content: {
                margin: spacing.desktopGutter,
            },
            contentWhenMedium: {
                margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
            },
            footer: {
                backgroundColor: grey900,
                textAlign: 'center',
            },
            a: {
                color: darkWhite,
            },
            p: {
                margin: '0 auto',
                padding: 0,
                color: lightWhite,
                maxWidth: 356,
            },
            browserstack: {
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                margin: '25px 15px 0',
                padding: 0,
                color: lightWhite,
                lineHeight: '25px',
                fontSize: 12,
            },
            browserstackLogo: {
                margin: '0 3px',
            },
            iconButton: {
                color: darkWhite,
            },
        };

        if (this.props.width === MEDIUM || this.props.width === LARGE) {
            styles.content = Object.assign(styles.content, styles.contentWhenMedium);
        }

        return styles;
    }

    handleTouchTapLeftIconButton = () => {
        this.setState({
            navDrawerOpen: !this.state.navDrawerOpen,
        });
    };

    handleChangeRequestNavDrawer = (open) => {
        this.setState({
            navDrawerOpen: open,
        });
    };

    handleChangeList = (event, value) => {
        this.context.router.push(value);
        this.setState({
            navDrawerOpen: false,
        });
    };

    handleChangeMuiTheme = (muiTheme) => {
        this.setState({
            muiTheme: muiTheme,
        });
    };

    render() {
        const {
            location,
            children,
        } = this.props;

        let {
            navDrawerOpen,
        } = this.state;

        const {
            prepareStyles,
        } = this.state.muiTheme;

        const router = this.context.router;
        const styles = this.getStyles();
        const title =
            router.isActive('/get-started') ? 'Get Started' :
                router.isActive('/customization') ? 'Customization' :
                    router.isActive('/components') ? 'Components' :
                        router.isActive('/management') ? 'Management' :
                            router.isActive('/discover-more') ? 'Discover More' : '';

        let docked = false;
        let showMenuIconButton = true;

        if (this.props.width === LARGE && title !== '') {
            docked = true;
            navDrawerOpen = true;
            showMenuIconButton = false;

            styles.navDrawer = {
                zIndex: styles.appBar.zIndex - 1,
            };
            styles.root.paddingLeft = 256;
            styles.footer.paddingLeft = 256;
        } else {
            styles.appBar.display = 'none';
            navDrawerOpen = false;
            showMenuIconButton = false;
        }

        return (
            <div className="test-master">
                <Title render="3fuyu's blog"/>
                <AppBar
                    onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
                    title={title}
                    zDepth={0}
                    iconElementRight={
                        <IconButton
                          iconClassName="muidocs-icon-custom-github"
                          href="https://github.com/callemall/material-ui"
                        />
                    }
                    style={styles.appBar}
                    showMenuIconButton={showMenuIconButton}
                />
                {title !== '' ?
                    <div style={prepareStyles(styles.root)} className="test-content1">
                        <div style={prepareStyles(styles.content)} className="test-content2">
                            {React.cloneElement(children, {
                                onChangeMuiTheme: this.handleChangeMuiTheme,
                            })}
                        </div>
                    </div> :
                    children
                }
                <AppNavDrawer
                    style={styles.navDrawer}
                    location={location}
                    docked={docked}
                    onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
                    onChangeList={this.handleChangeList}
                    open={navDrawerOpen}
                />
            </div>
        );
    }
}

export default withWidth()(Master);
