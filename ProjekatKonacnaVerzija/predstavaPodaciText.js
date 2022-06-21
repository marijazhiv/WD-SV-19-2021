let firebase11Url = "https://projekat-c78a2-default-rtdb.europe-west1.firebasedatabase.app/";

let podaciUrl = firebase11Url + "pozorista.json";

let podaciRequest = new XMLHttpRequest();
podaciRequest.onreadystatechange = function () {
  if (this.readyState == 4) { 
    if (this.status == 200) { 


      console.log(this.responseText); 

      let pozorista = JSON.parse(this.responseText);
      

      let target = document.getElementById("pp");
      

      for (let i in pozorista) {
        let pozoriste = pozorista[i]; 
        if (pozoriste.naziv==idPredstave1){
        
                let template = ` 

                <div id="predstava">
                 <img src="${pozoriste.slika}" width="500px" height=auto> <br> <hr>
                <li>Ime pozorišta:  ${pozoriste.naziv} </li><br>
            <li>Adresa:  ${pozoriste.adresa}</li> <br>
        <li>Broj predstava dostupnih na sajtu:  ${pozoriste.brojPredstava}  </li> <br></div>`;
              target.innerHTML += template;
              

        }
    }}
        }}
      


function getIdFromUrl() { /* Splituj json po id-u */
  const path = decodeURI(window.location.toString());
  console.log(path);
  const pozoristeId = path.split("?")[2];
  return pozoristeId;
}
let idPredstave1=getIdFromUrl(); /* Ucitaj iz firebasea */
podaciRequest.open("GET", firebase11Url + "pozorista.json");
podaciRequest.send();