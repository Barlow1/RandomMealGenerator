import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { Card } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import ListGroup from "react-bootstrap/ListGroup";
import RandomMeal from "./RandomMeal.jsx";

class MealCardBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDirections : true
        };
        this.showDirections = this.showDirections.bind(this);
        this.showIngredients = this.showIngredients.bind(this);
        this.displayAsIngredientsList = this.displayAsIngredientsList.bind(this);
        this.displayAsMeasurementList = this.displayAsMeasurementList.bind(this);

        this.meal = props.meal;
    }
    showDirections() {
        this.setState({showDirections:true});
    }
    showIngredients() {
        this.setState({showDirections:false});
    }
    displayAsIngredientsList() {
            if (this.meal) {
               let mealsObject = Object.entries(this.meal);
                return mealsObject.map(([key, value]) => {
                    if (key.startsWith("strIngredient") && value.length > 1) {
                        return <ListGroup.Item key={key}>{value}</ListGroup.Item>;
                    }
                })
            }  else {
                return (<h1>No Results </h1>)
            }

    }
    displayAsMeasurementList() {
        if (this.meal) {
            console.log(this.meal);
            let mealsObject = Object.entries(this.meal);
            return mealsObject.map(([key, value]) => {
                if (key.startsWith("strMeasure") && value.length > 0) {
                    return <ListGroup.Item  key={key}>{value}</ListGroup.Item>;
                }
            })
        }  else {
            return (<h1>No Results </h1>)
        }

    }
    render() {
        let { showDirections } = this.state;
        let meal = this.meal;
            return (
                <div>
                    <Nav variant="tabs" defaultActiveKey="#directions">
                        <Nav.Item>
                            <Nav.Link onSelect={this.showDirections} href="#directions">Directions</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onSelect={this.showIngredients} href="#ingredients">Ingredients</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    { showDirections && <Card.Body>
                        <Card.Title>{meal.strMeal}</Card.Title>
                        <Card.Text>{meal.strInstructions}
                        </Card.Text>
                    </Card.Body>}

                    {!showDirections && <Card.Body>
                        <Card.Title>{meal.strMeal}</Card.Title>
                        <Card.Text>Ingredients</Card.Text>
                        <div className="row">
                            <div className="two-column-list col-md-6">
                                <ListGroup>
                                    {this.displayAsIngredientsList()}
                                </ListGroup>
                                </div>
                                <div className="two-column-list col-md-6">
                                <ListGroup>
                                    {this.displayAsMeasurementList()}
                                </ListGroup>
                            </div>
                        </div>
                    </Card.Body>}
                </div>
            );
        }

}
export default MealCardBody;