import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Card } from "react-bootstrap";
import MealCardBody from "./MealCardBody.jsx";
import AreaSelector from "./AreaSelector.jsx";
import NavBar from "../NavBar.jsx";

require('@babel/polyfill');


class RandomMeal extends Component {
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    constructor(props) {
        super(props);

        this.state = {
            meals: [],
            showDirections: true,
            area: "None",
            search: ""
        };
        this.componentWillMount = this.componentWillMount.bind(this);
        this.callbackArea = this.callbackArea.bind(this);
        this.callbackNav = this.callbackNav.bind(this);
        this.getRandomMeal = this.getRandomMeal.bind(this);
        this.callbackHome = this.callbackHome.bind(this);
    }

    componentWillMount() {
        this.getRandomMeal()
    }

    getRandomMeal() {
        let list = [];
        let area = this.state.area;
        let search = this.state.search;
        let requestArea = async () => {
            await
                fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=' + area)
                    .then(response => response.json())
                    .then(data => {
                        list = Object.values(data);
                        //fetch('https://www.themealdb.com/api/json/v1/1/random.php')
                        console.log(list);
                    }).then();

            await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + list[0][RandomMeal.getRandomInt(0, list[0].length)].strMeal)
                .then(response => response.json())
                .then(data =>
                    this.setState({ meals: data.meals }));
        };
        let requestSearch = async () => {
            await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + this.state.search)
                .then(response => response.json())
                .then(data => {
                    if (data.meals.length) {
                        super.setState({ meals: data.meals })
                    }
                }
                )
                .catch(e => console.log("No search results"));
        };
        let requestRandom = async () => {
            await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
                .then(response => response.json())
                .then(data => {
                    this.setState({ meals: data.meals });
                });
        };
        if (area === "None" && search === "") {
            requestRandom();
        } else if (area !== "None") {
            requestArea()
        } else if (search !== "") {
            requestSearch()
        }

    }

    callbackArea(childData) {
        let callback = async () => {
            await this.setState({ area: childData, meals: [], showDirections: true, search: "" });
            await this.getRandomMeal();
        };
        callback()
    };

    callbackNav(childData) {
        console.log(childData);
        let callback = async () => {
            await this.setState({ area: "None", meals: [], showDirections: true, search: childData });
            await this.getRandomMeal();
        };
        callback()
    };

    callbackHome() {
        let callback = async () => {
            await this.setState({ area: "None", meals: [], showDirections: true, search: "" });
            await this.getRandomMeal();
        };
        callback()
    };


    render() {
        const { meals } = this.state;
        console.log(meals);
        //this.post(meals);
        return (<div>
            <header>
                <div className="container">
                    <div className="navbar navbar-static-top" id="nav-bar">
                        <NavBar search={this.state.search} callbackHome={this.callbackHome} callback={this.callbackNav} />
                    </div>
                </div>
            </header>
            <div>
                <main>
                    <div className="body-container container">
                        <div className="row justify-content-center top-info">
                            <div className="col-md-4 align-self-center">
                                <h1>Random meal:</h1>
                            </div>
                            {this.state.search === "" &&
                                <div className="col-md-4 align-self-center">
                                    <AreaSelector callback={this.callbackArea} area={this.state.area} />
                                </div>}
                            {this.state.search === "" ? <div className="col-md-4 align-self-center">
                                <button type="button" className="btn btn-primary"
                                    onClick={this.getRandomMeal}>Generate
                                    a new one
                                    </button>

                            </div> : <button
                                type="button" className="btn btn-secondary"
                                onClick={this.callbackHome}>
                                    ◀ Back
                                    </button>
                            }
                        </div>
                        <div className="row meal-card justify-content-center">
                            {meals.length ? <ul>
                                {
                                    meals.map(
                                        meal =>
                                            <Card className="card w-75 mb-4" key={meal.idMeal}>
                                                <Card.Img className="card-image col-md-12" variant="top"
                                                    src={meal.strMealThumb} />
                                                <Card.Header>
                                                    <MealCardBody meal={meal} />
                                                </Card.Header>
                                            </Card>
                                    )}
                            </ul> : <p>No Results</p>}

                        </div>
                    </div>
                </main>
            </div>
        </div>
        );
    }
}

const wrapper = document.getElementById("random-meal");
wrapper ? ReactDOM.render(<RandomMeal />, wrapper) : false;
export default RandomMeal;