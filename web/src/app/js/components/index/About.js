/**
 * Created by 3fuyu on 2017/7/7.
 */

import {Component} from 'react';
import Power from './About_power';
import '../../../css/about.less'

class About extends Component {
    render() {
        return (
            <div id="about">
                <div className="head">
                    <img className="logo" src="images/3fuyu_bg.jpg" alt=""/>
                    <p className="discription">3Fuyu</p>
                </div>
                <div className="body">

                    <div className="life">
                        <p className="title">About Me</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            3fuyu(张宇)，93年生，平常喜欢跑步，大学跑了三年，工作之后有时间就会跑，现在基本每晚四公里。另外还是Steve
                            Jobs的狂热粉丝，自传读过不下3遍，因此也被“扭曲厂力”感染上了轻微强迫症。</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            其实，我的真实身份是一枚前端攻城狮，狂热的技术爱好者。如今正是前端遍地开花的时代，一个月不吸收点新知识发发，回头再看前端就是一脸懵逼的状态。因此也提醒自己达摩克利斯之剑一直悬在头上。平常喜欢折腾技术，比如这个blog（该站建成于2017.6，基于React + Node + Mongodb，其中之前的技术文章来源于本人2014年至今用wordpress记录的文章）就是用腻了wordpress，hexo等等套路，想搞一些不仅仅限于技术文章，完全自己控制的个人站，比如Laboratory，会持续放出自己实验性的项目。</p>
                    </div>
                    <div className="work">
                        <p className="title">Work</p>
                        <p>职业： 前端攻城狮（只是会<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一点点PS，别误会）</p>
                        <p>Email: sdlgdxzhangyu@163.com</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
