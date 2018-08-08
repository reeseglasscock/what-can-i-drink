export class Booze {
  getBoozeByIngredient(ingredient) {
    return new Promise(resolve, reject) => {
      let request = new XMLHttpRequest();
      let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
      request.onload = () => {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    }
  }
}
