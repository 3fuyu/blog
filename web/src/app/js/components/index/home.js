/**
 * Created by 3fuyu on 2016/10/13.
 */

import {Component} from "react";
import "../../../css/base.less";
import "../../../css/home.less";
import moment from "moment";
import DataService from "../../service/DataService";

class Home extends Component {

    state = {
        articleList: []
    };

    componentWillMount() {
        this.getData();
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

        // /*注册鼠标事件*/
        if (isFirfox) {
            window.addEventListener('DOMMouseScroll', scrollFunc, false);
        } else {
            document.getElementsByClassName('3fuyu-blog')[0].onmousewheel = scrollFunc;//IE/Opera/Chrome
        }
    }

    getData() {
        let t = this;

        DataService.queryArticalList().then(function (data) {
            t.setState({
                articleList: data
            });
        });
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

    render() {
        return (
            <div id="home">
                <div className="head">
                    <span className="menu-logo"><img src="images/logo.png" alt="" className="logo"/></span>
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
                            <div className="article-item" key={key}>
                                <div className="item-title">
                                    <span>{value.postTitle}</span>
                                </div>
                                <div className="item-content">
                                    <div>{value.postContent.substring(0, 300)}
                                        <span className="item-content-more">
                                            <i className="iconfont icon-pullright"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="item-footer">
                                    <div className="author">
                                        <img src="images/logo_small.jpg" alt=""/>
                                        <div className="author-name">{value.postAuthor}</div>
                                        <div className="article-time">{moment(value.postDate).format('YY-MM-DD')}</div>
                                    </div>
                                    <div className="count">
                                        <ul className="count-list">
                                            <li className="count-item count-one">234</li>
                                            <li className="count-item count-two">44</li>
                                            <li className="count-item count-three">22</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="footer">
                    <div>made by 3fuyu</div>
                </div>
            </div>
        );
    }
}

export default Home;