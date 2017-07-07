/**
 * Created by 3fuyu on 2017/7/7.
 */

import {Component} from 'react';
import Power from './About_power';
import '../../../css/about.less'

class About extends Component {
    render () {
        return (
            <div id="about">
                <div className="head">
                    <img className="logo" src="images/3fuyu_bg.jpg" alt=""/>
                    <p className="discription">3Fuyu</p>
                </div>
                <div className="line"></div>
                <div className="body">
                    <div className="left">
                        <div className="life">
                            <p className="title">Life</p>
                            <p>姓名： 张宇</p>
                            <p>年龄： {new Date().getFullYear() - 1993}</p>
                            <p>爱好： 跑步（不是一般能跑）</p>
                            <p>偶像： Steve Jobs</p>
                        </div>
                        <div className="work">
                            <p className="title">Work</p>
                            <p>职业： 前端攻城狮（只是会<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一点点PS，别误会）</p>
                            <p>Email: sdlgdxzhangyu@163.com</p>
                        </div>
                    </div>
                    <div className="right">
                        <p className="title">POWER</p>
                        <Power/>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
