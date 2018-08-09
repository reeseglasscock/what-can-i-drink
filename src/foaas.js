export class Foaas {
  getFoaas() {
    return new Promise((resolve, reject) => {
      let names = "Ryan, Reese, and Nate";
      let request = new XMLHttpRequest();
      let url = `https://www.foaas.com/off/child/${names}`;
      request.onload = () => {
        console.log(request.status);
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.setRequestHeader("accept", "application/json");
      request.send();
    });
  }
}
