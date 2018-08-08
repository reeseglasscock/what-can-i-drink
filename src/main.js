import $ from 'jquery';
import 'bootstrap';
// import './styles.css';
import { Booze } from './booze.js';
import { BoozeParse } from './boozeparse.js';

$(document).ready(function() {
  $('#findDrink').click(function() {
    let ingredient = $('#ingredient').val();
    $('#ingredient').val("");
    $('.drinkInfo').text("");

    let booze = new Booze();
    let promise = booze.getBoozeByIngredient(ingredient);

    promise.then(function(response) {
      let newBoozeParse = new BoozeParse();
      let foundDrinks = newBoozeParse.getDrinks(response);
      foundDrinks.forEach(function(drink) {
        console.log(drink);
        $('.drinkInfo').append(`<li>${drink.name}</li>`)
      })
    }, function(error) {
      $('.showError').text(`There was an error: ${error.message}`);
    });
  })
})
