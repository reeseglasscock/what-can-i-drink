export class BoozeParse {
  getDrinks(response) {
    let body = JSON.parse(response);
    let drinkNameArray = [];
    let drinkImageArray = [];
    let drinkIdArray = [];
    body.drinks.forEach(function(drink) {
      drinkNameArray.push(drink.strDrink);
      drinkImageArray.push(drink.strDrinkThumb);
      drinkIdArray.push(drink.idDrink);
    });
    return drinkNameArray;
  }
}
