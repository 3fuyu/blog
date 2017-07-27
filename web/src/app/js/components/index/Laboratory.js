/**
 * Created by 3fuyu on 2017/7/27.
 */

import {Component} from 'react';
import '../../../css/laboratory.less';

class About extends Component {
    componentWillMount () {
        document.body.scrollTop = 0;
    }
    render() {
        return (
            <div id="laboratory">
                <ul>
                    <li>
                        <div>五子棋</div>
                        <div>不会输的五子棋</div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default About;
