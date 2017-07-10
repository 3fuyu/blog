/**
 * Created by 3fuyu on 2016/10/13.
 */

import ReactDOM from "react-dom";
import {Component, PropTypes} from "react";
import "../../../css/base.less";
import "../../../css/home.less";
import "../../../css/markdown.less";
import moment from "moment";
import Loading from "../../components/lib/Loading";
import DataService from "../../service/DataService";
import IconButton from "../../../../../node_modules/material-ui/IconButton";
import RefreshIndicator from "../../../../../node_modules/material-ui/RefreshIndicator";
import FYT from "../../service/FYToolService";

let listData,
    pageObj,
    scrollTop = 0,
    eventLock = false;
class Home extends Component {

    state = {
        articleList: listData || [],
        pageObj: {},
        banner_1: '',
        banner_2: 'y-hide',
        styles: {
            footerStyle: {
                display: 'none'
            },
            pullUpFresh: {
                display: 'block'
            },
            loadingStyle: {
                display: 'block'
            }
        }
    };

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    componentWillMount() {
        this.getList();
    }

    componentDidMount() {
        this.navAnimation();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', function () {
            console.log('滚动已移除');
        });

        if (document.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', function () {
                console.log('监听上下滚动已移除');
            }, false);
        }

        document.getElementsByClassName('3fuyu-blog')[0].onmousewheel = '';//IE/Opera/Chrome
    }

    navAnimation() {
        let t = this,
            $target = $('#home .head'),
            $topup = $('#home .goup'),
            userAgent = window.navigator.userAgent,
            isFirfox = userAgent.indexOf('Firefox') > -1 ? true : false;

        // 100 像素前后逻辑
        let scrollTopFunc = function (e) {
            let scrollTop = 0,
                scrollBottom = 0,
                scrollTarget = $(window);

            let get_scrollTop_of_body = function () {
                let _scrollTop;

                if (typeof window.pageYOffset != 'undefined') {//pageYOffset指的是滚动条顶部到网页顶部的距离
                    _scrollTop = window.pageYOffset;
                } else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
                    _scrollTop = document.documentElement.scrollTop;
                } else if (typeof document.body != 'undefined') {
                    _scrollTop = document.body.scrollTop;
                }
                return _scrollTop;
            }

            scrollTop = get_scrollTop_of_body();

            if (isFirfox) {
                scrollBottom = scrollTarget.scrollBottom();
            } else {
                scrollBottom = document.body.offsetHeight - document.body.scrollTop - window.innerHeight;
            }

            if (scrollTop > 0) {
                $target.addClass('head-move');
            } else if (scrollTop === 0) {
                $target.removeClass('head-move');
            }

            if (scrollTop > 100 && !$target.hasClass('head-content-up')) {
                $target.addClass('head-hide');
            } else {
                $target.removeClass('head-hide');
            }

            if (scrollTop > 1000 && scrollBottom > 300) {
                $topup.addClass('goup-show');
            } else {
                $topup.removeClass('goup-show');
            }

            if (scrollBottom === 0) {
                if (!eventLock) {
                    eventLock = true;
                    t.getData('', function () {
                        // 确保渲染完成 2s 内不刷新接口
                        setTimeout(function () {
                            eventLock = false;
                        }, 2000);
                    });
                }
            }
        }

        if (document.addEventListener) {
            window.addEventListener('scroll', function (e) {
                scrollTopFunc(e);
            });
        } else {//W3C
            document.getElementsByClassName('3fuyu-blog')[0].onscroll = scrollTopFunc;//IE/Opera/Chrome
        }

        // 后面文章向上向下滚动鼠标逻辑
        let scrollFunc = function (e) {
            e = e || window.event;
            if (e.wheelDelta) {//IE/Opera/Chrome浏览器
                if (e.wheelDelta > 0) { // 向上滚动
                    $target.removeClass('head-hide').addClass('head-content-up');
                } else {
                    $target.removeClass('head-content-up');
                }
            } else if (e.detail) {//Firefox浏览器
                if (e.detail < 0) { // 向上滚动
                    $target.removeClass('head-hide').addClass('head-content-up');
                } else {
                    $target.removeClass('head-content-up');
                }
            }
        }

        /*注册鼠标事件*/
        if (isFirfox) {
            window.addEventListener('DOMMouseScroll', scrollFunc, false);
        } else {
            document.getElementsByClassName('3fuyu-blog')[0].onmousewheel = scrollFunc;//IE/Opera/Chrome
        }
    }

    getList() {
        let t = this;

        if (!listData) {
            t.getData();
        } else {
            window.scrollTo(0, scrollTop);
            if (listData.pageObj && listData.pageObj.isFinish) {
                t.setState({
                    styles: {
                        footerStyle: {
                            display: 'block'
                        },
                        pullUpFresh: {
                            display: 'none'
                        }
                    }
                });
            }
        }
    }

    getData(para, callback) {
        let t = this,
            pageIndex = para && para.pageIndex || t.state.pageObj && t.state.pageObj.nextPage || 1;

        if (!(para && para.type) && pageObj && pageObj.isFinish) {
            return;
        }

        DataService.queryArticleList({
            type: para && para.type || '',
            pageSize: 10,
            pageIndex: pageIndex
        }).then(function (data) {
            if (listData) {
                listData = listData.concat(data.data);
            } else {
                listData = data.data;
            }

            pageObj = data.pageObj;

            t.setState({
                articleList: listData,
                pageObj: data.pageObj,
                styles: {
                    footerStyle: {
                        display: data.pageObj.isFinish ? 'block' : 'none'
                    },
                    pullUpFresh: {
                        display: data.pageObj.isFinish ? 'none' : 'block'
                    },
                    loadingStyle: {
                        display: 'none'
                    }
                }
            });

            callback && callback();
        });
    }

    cacheScroll() {
        scrollTop = document.body.scrollTop;
    }

    goDetail(value) {
        let date = new Date(value.postDate),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            id = value.id,
            hash = 'article/' + year + '/' + month + '/' + day + '/' + id; //详情页路由规则， 年/月/日/id

        this.cacheScroll();

        this.context.router.push(hash);
    }

    goTop() {
        let nowTime = 0,
            changeDistance = 0,
            distance = document.body.scrollTop,
            nowDistance = 0;

        let time = setInterval(function () {
            nowDistance = document.body.scrollTop;
            if (nowDistance > 10000) {

            }

            if (nowDistance > distance / 2) {
                nowTime += 0.5 + (nowDistance - distance / 2) / (distance / 2);
            } else if (nowTime > 1) {
                nowTime -= 0.5 + (distance / 2 - nowDistance) / (distance / 2);
            } else {
                nowTime = 1;
            }

            changeDistance = nowTime;

            document.body.scrollTop = document.body.scrollTop - changeDistance;
            if (document.body.scrollTop === 0) {
                clearInterval(time);
            }
        }, 1);
    }

    category(e) {
        let type = e.currentTarget.getAttribute('class').split(' ')[1],
            $target = $(e.currentTarget);

        listData = [];
        pageObj = {};

        if (type !== 'laboratory' && type !== 'about') {
            this.state.styles.loadingStyle = {display: 'block'};
            this.forceUpdate();

            $target.parent().children().removeClass('selected');
            $target.addClass('selected');
            window.scrollTo(0, 0);
        }

        // type 0 all 1 web 2 linux
        switch (type) {
            case 'home':
                $target.removeClass('selected');
                this.context.router.push('/');
                this.setBanner('big');
                this.getData({type: 0, pageIndex: 1});
                break;
            case 'web':
                this.setBanner('small');
                this.getData({type: 1, pageIndex: 1});
                break;
            case 'linux':
                this.setBanner('small');
                this.getData({type: 2, pageIndex: 1});
                break;
            case 'laboratory':
                FYT.tips('正在开发中  ：）');
                break;
            case 'github':
                window.open('https://github.com/3fuyu');
                break;
            case 'about':
                listData = null;
                pageObj = null;
                scrollTop = 0;
                eventLock = false;
                this.context.router.push('/about');
                // this.setBanner('small');
                break;
            default:
                break;
        }
    }

    setBanner(type) {
        if (type === 'small') {
            this.setState({
                banner_1: 'y-hide',
                banner_2: ''
            });
        } else if (type === 'big') {
            this.setState({
                banner_1: '',
                banner_2: 'y-hide'
            })
        }
    }

    render() {
        return (
            <div id="home">
                <div className="head">
                    <span className="menu-logo"><img src="images/3fuyu.png" alt="" className="logo"/></span>
                    <ul className="menu-list">
                        <li className="menu-item home" onClick={(e) => this.category(e)}>
                            <div>HOME
                                <div className="line"></div>
                            </div>
                        </li>
                        <li className="menu-item web" onClick={(e) => this.category(e)}>
                            <div>WEB
                                <div className="line"></div>
                            </div>
                        </li>
                        <li className="menu-item linux" onClick={(e) => this.category(e)}>
                            <div>LINUX
                                <div className="line"></div>
                            </div>
                        </li>
                        <li className="menu-item laboratory" onClick={(e) => this.category(e)}>
                            <div>LABORATORY
                                <div className="line"></div>
                            </div>
                        </li>
                        <li className="menu-item github" onClick={(e) => this.category(e)}>
                            <div>GITHUB
                                <div className="line"></div>
                            </div>
                        </li>
                        <li className="menu-item about" onClick={(e) => this.category(e)}>
                            <div>ABOUT
                                <div className="line"></div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="banner">
                    <img src="images/banner_small.jpg" className={this.state.banner_1} alt=""/>
                    <img src="images/banner_small_two.jpg" className={this.state.banner_2} alt=""/>
                </div>

                <div className="content">
                    <div className="article-list">
                        {this.state.articleList.map((value, key) => (
                            <div className="article-item" key={key} onClick={() => this.goDetail(value)}>
                                <div className="item-title">
                                    <h2>{value.postTitle}</h2>
                                </div>
                                <div className="item-content">
                                    <div dangerouslySetInnerHTML={{
                                        __html: value.postMdContent
                                            ? value.postMdContent.substring(0, 500) : value.postContent
                                    }}
                                         className="article-content">
                                    </div>
                                    <span className="item-content-more">
                                        read more
                                        <i className="iconfont icon-pullright"></i>
                                    </span>
                                </div>
                                <div className="item-footer">
                                    <div className="author">
                                        <img src="images/3fuyu_small.jpg" alt=""/>
                                        <div className="author-name">{value.postAuthor}</div>
                                        <div className="article-time">{moment(value.postDate)
                                        .format("MMMM Do YYYY")}</div>
                                    </div>
                                    <div className="count">
                                        <ul className="count-list">
                                            <li className="count-item count-one">
                                                <i className="iconfont icon-attention"></i>&nbsp;{value.viewCount || 0}
                                            </li>
                                            <li className="count-item count-two">
                                                <i className="iconfont icon-comment_light"></i>&nbsp;{value.commentCount || 0}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Loading style={this.state.styles.loadingStyle}/>
                    </div>
                </div>
                <div className="footer" style={this.state.styles.footerStyle}>
                    <div className="footer-content">
                        <div>Remembering that you are going to die</div>
                        <div>Stay Hungry Stay Foolish</div>
                        <div className="footer-content-github">
                            <IconButton
                                iconClassName="muidocs-icon-custom-github"
                                href="https://github.com/3fuyu"
                            />
                        </div>
                        <div className="ICP">
                            <img src="images/3fuyu_small.jpg" alt=""/>
                            <span>Copyright © 2014 - {new Date().getFullYear()} ICP 16097049. All Rights Reserved. Powered By 3Fuyu.</span>
                        </div>
                    </div>
                </div>
                <div className="pull-up-fresh" style={this.state.styles.pullUpFresh}>
                    <RefreshIndicator
                        size={40}
                        left={0}
                        top={0}
                        status="loading"
                    />
                </div>
                <div className="goup" onClick={() => this.goTop()}>
                    <i className="iconfont icon-pullup"></i>
                </div>
            </div>
        );
    }
}

export default Home;