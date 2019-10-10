import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {Card} from "react-bootstrap";
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
        this.sendSlack = this.sendSlack.bind(this);
    }

    componentWillMount() {
        this.getRandomMeal()
    }

    sendSlack() {
        let mealName = "";
        const mealString = this.state.meals.map(meal => {
            if (meal) {
                mealName = meal.strMeal.toString();
                return " " + new Date().getTime().toString() + " " + mealName + "\n " + meal.strMealThumb.toString() + " " + meal.strInstructions.toString();
            }
        });

        fetch('https://hooks.slack.com/services/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', {
            method: 'POST',
            body: JSON.stringify({
                text: mealString[0]
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data.toString());
            }).finally(() => {
            alert(`The recipe for ${mealName} has been successfully sent through slack`)
        });

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
                    this.setState({meals: data.meals}));
        };
        let requestSearch = async () => {
            await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + this.state.search)
                .then(response => response.json())
                .then(data => {
                        if (data.meals.length) {
                            super.setState({meals: data.meals})
                        }
                    }
                )
                .catch(e => console.log("No search results"));
        };
        let requestRandom = async () => {
            await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
                .then(response => response.json())
                .then(data => {
                    this.setState({meals: data.meals});
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
            await this.setState({area: childData, meals: [], showDirections: true, search: ""});
            await this.getRandomMeal();
        };
        callback()
    };

    callbackNav(childData) {
        console.log(childData);
        let callback = async () => {
            await this.setState({area: "None", meals: [], showDirections: true, search: childData});
            await this.getRandomMeal();
        };
        callback()
    };


    render() {
        const {meals} = this.state;
        console.log(meals);
        //this.post(meals);
        return (<div>
                <header>
                    <div className="container">
                        <div className="navbar navbar-static-top" id="nav-bar">
                            <NavBar search={this.state.search} callback={this.callbackNav}/>
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
                                <div className="col-md-4 align-self-center">
                                    <AreaSelector callback={this.callbackArea} area={this.state.area}/>
                                </div>
                                <div className="col-md-4 align-self-center">
                                    <button type="button" className="btn btn-primary"
                                            onClick={this.getRandomMeal}>Generate
                                        a new one
                                    </button>

                                </div>
                            </div>
                            <div className="row meal-card justify-content-center">
                                {meals.length ? <ul>
                                    {
                                        meals.map(
                                            meal =>
                                                <Card className="card w-75" key={meal.idMeal}>
                                                    <Card.Img className="card-image col-md-12" variant="top"
                                                              src={meal.strMealThumb}/>
                                                    <Card.Header>
                                                        <MealCardBody meal={meal}/>
                                                        <div className="col-md-4">
                                                            <button type="button"
                                                                    className="btn btn-primary align-self-end"
                                                                    onClick={this.sendSlack}>Send a slack
                                                            </button>
                                                        </div>
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
wrapper ? ReactDOM.render(<RandomMeal/>, wrapper) : false;
export default RandomMeal;