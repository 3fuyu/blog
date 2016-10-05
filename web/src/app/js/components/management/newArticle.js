/**
 * Created by 3fuyu on 16/10/5.
 */

import React, {Component, PropTypes} from 'react';
import TextField from '../../../../../node_modules/material-ui/TextField';
import DatePicker from '../../../../../node_modules/material-ui/DatePicker';

class NewArticle extends Component {
    render () {
        return (
            <div>
                <TextField
                    hintText="Title"
                    fullWidth={true}
                />

                <DatePicker hintText="Portrait Dialog" />
            </div>
        );
    }
}

export default NewArticle;