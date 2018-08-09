import { Drink } from './drink.js';
import { Instruction } from './instruction.js'

export class BoozeParse {
  getDrinks(response) {
    let body = JSON.parse(response);
    let drinks = [];
    body.drinks.forEach(function(drink) {
      let foundDrink = new Drink(drink.strDrink, drink.strDrinkThumb, drink.idDrink);
      drinks.push(foundDrink);
    });
    return drinks;
  }

  getDrinkInfo(response) {
    let body = JSON.parse(response);
    //run loop to get all ingredients at [index] and then add in array to Instructions
    let ingredientsArray = [];
    let amountOfIngredients = [];
    for (let i = 1; i <= 15; i++) {
      if (typeof body.drinks[0][`strIngredient${i}`] === "string" && body.drinks[0][`strIngredient${i}`] !== "" ) {
        ingredientsArray.push(body.drinks[0][`strIngredient${i}`])
        amountOfIngredients.push(body.drinks[0][`strMeasure${i}`])
      }
    }
    let foundInstruction= new Instruction(body.drinks[0].strGlass, body.drinks[0].strInstructions, ingredientsArray, amountOfIngredients);
    return foundInstruction;
  }
}
