/**
 * Created by 3fuyu on 2016/10/13.
 */

import ReactDOM from "react-dom";
import {Component, PropTypes} from "react";
import "../../../css/base.less";
import "../../../css/home.less";
import "../../../css/markdown.less";
import moment from "moment";
import DataService from "../../service/DataService";
import IconButton from "../../../../../node_modules/material-ui/IconButton";
import FYT from "../../service/FYToolService";

let listData,
    scrollTop = 0;
class Home extends Component {

    state = {
        articleList: listData || [],
        styles: {
            footerStyle: {
                display: 'none'
            }
        }
    };

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    componentWillMount() {
    }

    componentDidMount() {
        this.getData();
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
        let $target = $('#home .head'),
            userAgent = window.navigator.userAgent,
            isFirfox = userAgent.indexOf('Firefox') > -1 ? true : false;

        // 100 像素前后逻辑
        var scrollTopFunc = function (e) {
            let scrollTop = 0,
                scrollTarget = $(window);

            if (isFirfox) {
                scrollTop = scrollTarget.scrollTop();
            } else {
                scrollTop = e.target.getElementsByClassName('3fuyu-blog')[0].scrollTop;
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

    getData() {
        let t = this;

        if (!listData) {
            FYT.startLoading(ReactDOM.findDOMNode(document.getElementsByClassName('content')[0]));
            DataService.queryArticleList().then(function (data) {
                FYT.endLoading();

                listData = data;
                t.setState({
                    articleList: data,
                    styles: {
                        footerStyle: {
                            display: 'block'
                        }
                    }
                });
            });
        } else {
            window.scrollTo(0, scrollTop);
            t.setState({
                styles: {
                    footerStyle: {
                        display: 'block'
                    }
                }
            });
        }
    }

    categoryBackUp() {
        return (
            <div className="category">
                <ul className="category-list">
                    <li className="category-item">分类目录</li>
                    <li className="category-item">javascript</li>
                    <li className="category-item">java</li>
                    <li className="category-item">python</li>
                    <li className="category-item">mongodb</li>
                    <li className="category-item">nodejs</li>
                </ul>
            </div>
        )
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
        // window.open('http://' + window.location.host + this.context.router.createHref(hash));
    }
    render() {

        return (
            <div id="home">
                <div className="head">
                    <span className="menu-logo"><img src="images/3fuyu.png" alt="" className="logo"/></span>
                    <ul className="menu-list">
                        <li className="menu-item">HOME</li>
                        <li className="menu-item">WEB</li>
                        <li className="menu-item">UBUNTU</li>
                        <li className="menu-item">PYTHON</li>
                        <li className="menu-item">JAVA</li>
                    </ul>
                </div>
                <div className="banner">
                    <img src="images/banner_small.jpg" alt=""/>
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
                                            <li className="count-item count-one"></li>
                                            <li className="count-item count-two"></li>
                                            <li className="count-item count-three"></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
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
            </div>
        );
    }
}

export default Home;