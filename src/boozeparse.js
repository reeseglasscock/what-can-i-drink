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
    let foundInstruction= new Instruction(body.drinks[0].strGlass, body.drinks[0].strInstructions, body.drinks[0].strIngredient1);
    return foundInstruction;
  }
}
