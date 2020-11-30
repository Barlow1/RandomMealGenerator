import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/es/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/es/FormControl";
import Button from "react-bootstrap/Button"

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: this.props.search
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleHome = this.handleHome.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.search !== this.props.search) {
            this.setState({ search: this.props.search })
        }
    }
    handleChange(event) {
        this.setState({ search: event.target.value });
    }
    handleSubmit() {
        this.setState({ search: this.state.search });
        this.props.callback(this.state.search);
    }
    handleHome() {
        if (this.props.callbackHome !== null) {
            this.props.callbackHome();
        }
    }
    render() {
        return (
            <Navbar fixed="top" expand="lg">
                <Navbar.Brand href="#home">Random Meal</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={this.handleHome}>Home</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl onKeyPress={event => {
                            if (event.key === "Enter") {
                                this.handleSubmit();
                            }
                        }} value={this.state.search} onChange={this.handleChange} type="text" placeholder="Search" className="mr-sm-2" />
                        <Button onClick={this.handleSubmit} variant="outline">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>

        );
    }
}
const wrapper = document.getElementById("nav-bar");
wrapper ? ReactDOM.render(<NavBar />, wrapper) : false;
export default NavBar;