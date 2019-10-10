import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input.jsx";
class FormContainer extends Component {
    constructor() {
        super();
        this.state = {
            seo_title: "",
            data: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }
    handleSubmit(event) {
        alert('An article was submitted: ' + this.state.seo_title);
        event.preventDefault();
    }
    render() {
        const { seo_title } = this.state;
        return (
            <form id="article-form" onSubmit={this.handleSubmit}>
                <Input
                    text="New Article: "
                    label="seo_title"
                    type="text"
                    id="seo_title"
                    value={seo_title}
                    handleChange={this.handleChange}
                />
            </form>
        );
    }
}
const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;
export default FormContainer;