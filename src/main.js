import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Booze } from './booze.js';
import { BoozeParse } from './boozeparse.js';
import { Foaas } from './foaas.js';



$(document).ready(function() {
  //getting all ingredients
  let boozeIngredients = new Booze();
  let ingredientsPromise = boozeIngredients.getAllIngredients();
  ingredientsPromise.then(function(response) {
    let newIngredientParse = new BoozeParse();
    let allIngredients = newIngredientParse.getAllIngredientsParse(response);
    allIngredients.forEach(function(ingredient) {
      $('#ingredient1Selector').append(`<option>${ingredient}</option>`);
    });
  });

  //age verification modal
  $('#ageVerification').modal({
    backdrop: 'static',
    keyboard: false
  });

  $('#underage').click(function() {
    $("#overage").hide();
    $("#underage").hide();
    let foaas = new Foaas();
    let foaasPromise = foaas.getFoaas();
    foaasPromise.then(function(response) {
      let body = JSON.parse(response);
      $('#ageVerificationDenied').append(`
        <div class="modal-body">
        <iframe src="https://giphy.com/embed/5ftsmLIqktHQA" width="480" height="372" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
        <p>${body.message}${body.subtitle}</p>
        </div>`);
    });
  });

  //search functionality
  // $('#findDrink').click(function() {
  //   let ingredient = $('#ingredient1Selector').val();
  //   let ingredient2 = $('#ingredient2').val();
  //   $('#ingredient').val("");
  //   $('#ingredient2').val("");
  //   $('.drinkInfo').text("");
  //
  //   let booze = new Booze();
  //   let promise = booze.getBoozeByIngredient(ingredient);
  //
  //   //begin outer promise
  //   promise.then(function(response) {
  //     let newBoozeParse = new BoozeParse();
  //     let foundDrinks = newBoozeParse.getDrinks(response);
  //
  //     foundDrinks.forEach(function(drink) {
  //
  //       let boozeInfo = new Booze();
  //       let promise2 = boozeInfo.getDrinkInfo(drink.name)
  //
  //       promise2.then(function(response){
  //         let newBoozeParse2 = new BoozeParse();
  //         let foundDrinkInstructions = newBoozeParse2.getDrinkInfo(response)
  //       }, function(error) {
  //         $('.showError').text(`There was an error: ${error.message}`);
  //       });
  //
  //     })
  //   }, function(error) {
  //     $('.showError').text(`There was an error: ${error.message}`);
  // });


  $('#findDrink').click(function() {
    let ingredient = $('#ingredient1Selector').val();
    // let ingredient2 = $('#ingredient2').val();
    $('#ingredient').val("");
    // $('#ingredient2').val("");
    $('.drinkInfo').text("");

    let booze = new Booze();
    let promise = booze.getBoozeByIngredient(ingredient);

    //begin outer promise
    promise.then(function(response) {
      let newBoozeParse = new BoozeParse();
      let foundDrinks = newBoozeParse.getDrinks(response);

      foundDrinks.forEach((drink) => {

        let boozeInfo = new Booze();
        let promise2 = boozeInfo.getDrinkInfo(drink.name);

        promise2.then(function(response){
          let newBoozeParse2 = new BoozeParse();
          let foundDrinkInstructions = newBoozeParse2.getDrinkInfo(response);
          let html = "";
          html += `
            <div class="card">
              <figure class="drink-img">
                <img src=${drink.image}>
                <figcaption class="drink-btn">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#${drink.id}">${drink.name}</button>
                </figcaption>
              </figure>
            </div>
            <div class="modal fade" id="${drink.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">${drink.name}</h5>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p>${foundDrinkInstructions.glass}</p>
                    <p>${foundDrinkInstructions.instructions}</p>
                    <div class="col">
                    ${foundDrinkInstructions.ingredientAmount.map(function(ingredient, index){
    return "<p>" + foundDrinkInstructions.ingredientAmount[index] + " " + foundDrinkInstructions.ingredient[index] + "</p>";
  }).join('')}
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>`

          $('.drinkInfo').append(html)

          console.log(html)



        }, function(error) {
          $('.showError').text(`There was an error: ${error.message}`);
        });

      });
    }, function(error) {
      $('.showError').text(`There was an error: ${error.message}`);
    });
  });
});
