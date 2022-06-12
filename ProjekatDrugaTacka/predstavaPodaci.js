let firebase5Url = "https://pozorista-a30a0-default-rtdb.europe-west1.firebasedatabase.app/";

let podaciUrl = firebase5Url + "predstave.json";

let podaciRequest = new XMLHttpRequest();
podaciRequest.onreadystatechange = function () {
  if (this.readyState == 4) { 
    if (this.status == 200) { 


      console.log(this.responseText); 

      let predstave = JSON.parse(this.responseText);
      

      let target = document.getElementById("sveOPredstavi");
      

      for (let i in predstave) {
            let predstava = predstave[i]; 
           
            for (let j in predstava){
                if (j==idPredstave1){
                let pr=predstava[j];
                console.log(j);
                let template = ` 
                <img src="${pr.slika}" width="500px" height="300px"> <br> <hr>
                <li><strong>Naziv:</strong> ${pr.naziv}</li> <br>
              <li><strong>Kod:</strong> ${pr.kod}</li> <br>
              <li><strong>Kratak opis:</strong> <br>
              ${pr.kratakOpis}</li> <br>
              <li><strong>Trajanje:</strong>${pr.trajanje}</li> <br>
              <li><strong>Žanr:</strong>${pr.zanr}</li> <br> <hr>
              <li><strong>Detaljan opis:</strong> <br>${pr.opis}
                </li> <br>
              <li><strong>Cena karte:</strong>${pr.cena}</li> <br>
              <li><strong>Maksimalan broj osoba:</strong> ${pr.maxOsobe}</li> <br>
              <li><strong>Prosečna ocena:</strong> ${pr.ocena}</li> <br>
              <li><label for="number"> <strong>Vaša ocena:</strong></label> 
                <input type="number" id="ocena" name="Ocena"
                min="1" max="5"> </li> <br> <hr> <br>
              <li>
                <button class="GFG1" style="position: center;"
            onclick="window.location.href = 'izmena.html?${j}';">
          <strong>Izmenite podatke</strong>
            </button>
              </li> <br> <br>
              <li><button class="GFG" style="position: center;"
              onclick="window.location.href = 'predstava1.html';">
                  Obrišite predstavu
              </button></li>`;

                target.innerHTML += template;

        }
    }
        }
      }
    }
};


function getIdFromUrl() { /* Splituj json po id-u */
  const path = decodeURI(window.location.toString());
  console.log(path);
  const pozoristeId = path.split("?")[1];
  return pozoristeId;
}
let idPredstave1=getIdFromUrl(); /* Ucitaj iz firebasea */
podaciRequest.open("GET", firebase5Url + "predstave.json");
podaciRequest.send();