import React, { Component } from "react";
import ReactDOM from "react-dom";
import RandomMeal from "../container/RandomMeal.jsx";

class MealsApp extends Component{
    render() {
return (
    <RandomMeal/>
)
    }
}
const wrapper = document.getElementById("meals-app");
wrapper ? ReactDOM.render(<MealsApp />, wrapper) : false;
export default MealsApp;