import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
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

        let boozeInfo = new Booze();
        let promise2 = boozeInfo.getDrinkInfo(drink.name)

        promise2.then(function(response){
          let newBoozeParse2 = new BoozeParse();
          let foundDrinkInstructions = newBoozeParse2.getDrinkInfo(response)
          console.log(foundDrinkInstructions.instructions);
          $('.drinkInfo').append(`<figure><img src=${drink.image}><figcaption><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#${drink.id}">
    ${drink.name}</button></figcaption></figure>
            <div class="modal fade" id="${drink.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">${drink.name}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    ${foundDrinkInstructions.instructions}
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>`)
        }, function(error) {
          $('.showError').text(`There was an error: ${error.message}`);
        });

      })
    }, function(error) {
      $('.showError').text(`There was an error: ${error.message}`);
    });
  })
})
