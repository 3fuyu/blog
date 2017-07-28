/**
 * Created by 3fuyu on 2017/7/27.
 */

import {Component} from 'react';
import '../../../css/laboratory.less';

class About extends Component {
    state = {
        laboratories: [{
            title: '胜率很高的五子棋',
            pic: './images/gomoku.jpg',
            discription: '纯js，利用五子棋核心算法，每一步棋计算当前和下一步共196种权重可能',
            url: 'http://3fuyu.com/laboratory/gomoku/index.html'
        }]
    }

    componentWillMount () {
        document.body.scrollTop = 0;
    }
    goto (url) {
        window.open(url);
    }
    render() {
        let t = this;

        return (
            <div id="laboratory">
                <div className="top">
                    <h2 className="title">Laboratory</h2>
                    <p className="discription">less but butter</p>
                </div>
                <ul className="list">
                    {this.state.laboratories.map(function (value, key) {
                        return (
                            <li className="list-item" key={key} onClick = {() => t.goto(value.url)}>
                                <div className="photo"><img src={value.pic} alt=""/></div>
                                <div className="title">{value.title}</div>
                                <div className="discription">{value.discription}</div>
                                <i className="light"></i>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default About;
