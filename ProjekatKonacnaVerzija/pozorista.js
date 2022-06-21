let firebase1Url = "https://projekat-c78a2-default-rtdb.europe-west1.firebasedatabase.app/";

let pozoristaUrl = firebase1Url + "pozorista.json";

let pozoristaRequest = new XMLHttpRequest();
pozoristaRequest.onreadystatechange = function () {
  if (this.readyState == 4) { /* Proveri da li je status 4xx tjs error */
    if (this.status == 200) { /* Proveri da li je status 2xx tjs da li browser dobija request*/


      console.log(this.responseText); 

      let pozorista = JSON.parse(this.responseText);
      console.log(pozorista);

      let target = document.getElementById("slike-container-predstava");
      

      for (let i in pozorista) {
        let pozoriste = pozorista[i]; /* Iteriraj svako pozoriste */
        let template = ` 
          <div id="predstava"> 
            <img src="${pozoriste.slika}">
            <a href="pozoriste1.html?${pozoriste.idPredstava}?${pozoriste.naziv}?${pozoriste.adresa}?${pozoriste.brojPredstava}"> ${pozoriste.naziv}</a>

                  
          </div>`;

        target.innerHTML += template; /* Ubacite u let template = ` html kod i obrisite ga iz html fajla */
      }
    }
  }
};

function getIdFromUrl() { /* Splituj json po id-u */
  const path = decodeURI(window.location.toString());
  console.log(path);
  const pozoristeId = path.split("=")[1];
  return pozoristeId;
}
getIdFromUrl(); /* Ucitaj iz firebasea */
pozoristaRequest.open("GET", firebase1Url + "pozorista.json");
pozoristaRequest.send();