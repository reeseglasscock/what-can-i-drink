import { Drink } from './drink.js';

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

  }
}
