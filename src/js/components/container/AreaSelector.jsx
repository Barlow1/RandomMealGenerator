import React, {Component} from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';


class AreaSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            area: this.props.area
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({area: event.target.value});
        this.props.callback(event.target.value);
    }


    render() {
        return (
            <label>Pick an Area:  <select value={this.state.area} onChange={this.handleChange.bind(this)}>
                    <option value="None">None</option>
                    <option value="American">American</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Italian">Italian</option>
                    <option value="Chinese">Chinese</option>
                </select>
            </label>
        );
    }
}

const wrapper = document.getElementById("create-area-selector");
wrapper ? ReactDOM.render(<AreaSelector/>, wrapper) : false;
export default AreaSelector;