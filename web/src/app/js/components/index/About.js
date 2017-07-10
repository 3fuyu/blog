/**
 * Created by 3fuyu on 2017/7/7.
 */

import {Component} from 'react';
import Power from './About_power';
import '../../../css/about.less';
import IconButton from "../../../../../node_modules/material-ui/IconButton";

class About extends Component {
    componentWillMount () {
        document.body.scrollTop = 0;
    }
    render() {
        return (
            <div id="about">
                <div className="head">
                    <img className="logo" src="images/3fuyu_bg.jpg" alt=""/>
                    <p className="discription">3Fuyu</p>
                </div>
                <div className="body">
                    <div className="about_me">
                        <p className="title">About Me</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            3fuyu(张宇)，93年生，平常喜欢跑步，大学跑了三年，工作之后有时间就会跑，现在基本每晚四公里。另外还是Steve
                            Jobs的狂热粉丝，自传读过不下3遍，因此也被“扭曲厂力”感染上了轻微强迫症。</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            其实，我的真实身份是一枚前端攻城狮，狂热的技术爱好者。如今正是前端遍地开花的时代，一个月不吸收点新知识发发，回头再看前端就是一脸懵逼的状态。因此也提醒自己达摩克利斯之剑一直悬在头上。平常喜欢折腾技术，比如这个blog（该站建成于2017.6，基于React
                            + Node +
                            Mongodb，其中之前的技术文章来源于本人2014年至今用wordpress记录的文章）就是用腻了wordpress，hexo等等套路，想搞一些不仅仅限于技术文章，完全自己控制的个人站，比如Laboratory，会持续放出自己实验性的项目。</p>
                    </div>
                    <div className="about_power">
                        <p className="title">Power <span>(随时更新)</span></p>
                        <div className="about_power_content">
                            <Power/>
                        </div>
                    </div>
                    <div className="contact_me">
                        <p className="title">Contact Me</p>
                        <p>Github:&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/3fuyu" target="_blank">3fuyu</a>
                        </p>
                        <p>QQ:&nbsp;&nbsp;&nbsp;&nbsp;326141543</p>
                        <p>E-mail:&nbsp;&nbsp;&nbsp;&nbsp;sdlgdxzhangyu@163.com</p>
                        {/*<p>Social:&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://segmentfault.com/u/3fuyu" target="_blank">segmentfault </a>*/}
                             {/*| <a href="https://www.zhihu.com/people/zhang-yu-79-30/activities" target="_blank">知乎</a>*/}
                        {/*</p>*/}
                    </div>
                    <div className="attention">
                        <p className="title">Attention</p>
                        <div className="attention_list">
                            <a href="https://facebook.github.io/react/" target="_blank"><img src="images/react.png" alt=""/></a>
                            <a href="https://cn.vuejs.org/" target="_blank"><img src="images/vue.jpg" alt=""/></a>
                            <a href="https://angularjs.org/" target="_blank"><img src="images/angular.jpg" alt=""/></a>
                            <a href="http://weex.apache.org/cn/" target="_blank"><img src="images/weex.png" alt=""/></a>
                            <a href="https://nodejs.org/en/" target="_blank"><img src="images/nodejs.jpg" alt=""/></a>
                            <a href="https://www.mongodb.com/" target="_blank"><img src="images/mongodb.jpg" alt=""/></a>
                            <a href="https://electron.atom.io/" target="_blank"><img src="images/electron.png" alt=""/></a>
                        </div>
                    </div>
                </div>
                <div className="footer">
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

export default About;
