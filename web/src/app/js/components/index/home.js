/**
 * Created by 3fuyu on 2016/10/13.
 */

import {Component} from "react";
import "../../../css/base.less";
import "../../../css/home.less";

class Home extends Component {
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

    render() {
        return (
            <div id="home">
                <div className="head">
                    <span className="menu-logo"><img src="images/logo_test.png" alt="" className="logo"/></span>
                    <ul className="menu-list">
                        <li className="menu-item">HOME</li>
                        <li className="menu-item">WEB</li>
                        <li className="menu-item">UBUNTU</li>
                        <li className="menu-item">PYTON</li>
                        <li className="menu-item">JAVA</li>
                    </ul>
                </div>
                <div className="banner">
                    <img src="images/banner_small.jpg" alt=""/>
                </div>
                <div className="content">
                    <div className="article-list">
                        <div className="article-item">
                            <div className="item-banner">
                                <img src="images/blackbord.png" alt=""/>
                            </div>
                            <div className="item-title">
                                <span>让一切可见–视觉设计师如何运用“体验地图”工具</span>
                            </div>
                            <div className="item-footer">
                                <div className="author">作者： 3fuyu</div>
                                <div className="count">
                                    <ul className="count-list">
                                        <li className="count-item count-one">295</li>
                                        <li className="count-item count-two">30</li>
                                        <li className="count-item count-three">2</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="article-item">
                            <div className="item-banner">
                                <img src="images/blackbord.png" alt=""/>
                            </div>
                            <div className="item-title">
                                <span>让一切可见–视觉设计师如何运用“体验地图”工具</span>
                            </div>
                            <div className="item-footer">
                                <div className="author">作者： 3fuyu</div>
                                <div className="count">
                                    <ul className="count-list">
                                        <li className="count-item count-one">295</li>
                                        <li className="count-item count-two">30</li>
                                        <li className="count-item count-three">2</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="article-item">
                            <div className="item-banner">
                                <img src="images/blackbord.png" alt=""/>
                            </div>
                            <div className="item-title">
                                <span>让一切可见–视觉设计师如何运用“体验地图”工具</span>
                            </div>
                            <div className="item-footer">
                                <div className="author">作者： 3fuyu</div>
                                <div className="count">
                                    <ul className="count-list">
                                        <li className="count-item count-one">295</li>
                                        <li className="count-item count-two">30</li>
                                        <li className="count-item count-three">2</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="article-item">
                            <div className="item-banner">
                                <img src="images/blackbord.png" alt=""/>
                            </div>
                            <div className="item-title">
                                <span>让一切可见–视觉设计师如何运用“体验地图”工具</span>
                            </div>
                            <div className="item-footer">
                                <div className="author">作者： 3fuyu</div>
                                <div className="count">
                                    <ul className="count-list">
                                        <li className="count-item count-one">295</li>
                                        <li className="count-item count-two">30</li>
                                        <li className="count-item count-three">2</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="article-item">
                            <div className="item-banner">
                                <img src="images/blackbord.png" alt=""/>
                            </div>
                            <div className="item-title">
                                <span>让一切可见–视觉设计师如何运用“体验地图”工具</span>
                            </div>
                            <div className="item-footer">
                                <div className="author">作者： 3fuyu</div>
                                <div className="count">
                                    <ul className="count-list">
                                        <li className="count-item count-one">295</li>
                                        <li className="count-item count-two">30</li>
                                        <li className="count-item count-three">2</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="article-item">
                            <div className="item-banner">
                                <img src="images/blackbord.png" alt=""/>
                            </div>
                            <div className="item-title">
                                <span>让一切可见–视觉设计师如何运用“体验地图”工具</span>
                            </div>
                            <div className="item-footer">
                                <div className="author">作者： 3fuyu</div>
                                <div className="count">
                                    <ul className="count-list">
                                        <li className="count-item count-one">295</li>
                                        <li className="count-item count-two">30</li>
                                        <li className="count-item count-three">2</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="article-item">
                            <div className="item-banner">
                                <img src="images/blackbord.png" alt=""/>
                            </div>
                            <div className="item-title">
                                <span>让一切可见–视觉设计师如何运用“体验地图”工具</span>
                            </div>
                            <div className="item-footer">
                                <div className="author">作者： 3fuyu</div>
                                <div className="count">
                                    <ul className="count-list">
                                        <li className="count-item count-one">295</li>
                                        <li className="count-item count-two">30</li>
                                        <li className="count-item count-three">2</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Home;