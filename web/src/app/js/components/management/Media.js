/**
 * Created by 3fuyu on 2017/2/14.
 */

import React, {PropTypes, Component} from "react";
import RaisedButton from "../../../../../node_modules/material-ui/RaisedButton";

const styles = {
    button: {
        margin: 12,
    },
    exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
};

class Media extends Component {


    render() {
        return (
            <div>
                <RaisedButton
                    label="Choose an Image"
                    labelPosition="before"
                    style={styles.button}
                    containerElement="label"
                >
                    <input type="file" style={styles.exampleImageInput}/>
                </RaisedButton>
            </div>
        );
    }
}

export default Media;