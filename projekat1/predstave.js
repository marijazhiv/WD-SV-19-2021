let firebase4Url = "https://pozorista-a30a0-default-rtdb.europe-west1.firebasedatabase.app/";

let predstaveUrl = firebase4Url + "pozorista.json";

let pozoristaRequest = new XMLHttpRequest();
pozoristaRequest.onreadystatechange = function () {
  if (this.readyState == 4) { 
    if (this.status == 200) { 


      console.log(this.responseText); 

      let predstave = JSON.parse(this.responseText);
      console.log(predstave);

      let target = document.getElementById("slike-container-predstava");
      

      for (let i in predstave) {
        if (i==idPr){
            let predstava = predstave[i]; 
            console.log(predstava);
            for (let j in predstava){
                let pr=predstava[j];
                console.log(pr); 


                let template = ` 
                <div id="predstava"> 
            
                <img src="${pr.slika}">
                <a href="predstava1.html?${j}?${i}"> ${pr.naziv}</a>

                    
                </div>`;


                target.innerHTML += template;

        }
        }
      }
    }
  }
};

function getIdFromUrl() { 
  const path = decodeURI(window.location.toString());
  console.log(path);
  let predstavaId = path.split("?")[1];
  let nazivPr = path.split("?")[2];
  let adresa = path.split("?")[3];
  let brojPredstava = path.split("?")[4];
  return predstavaId;
}
let idPr=getIdFromUrl();
 /* Ucitaj iz firebasea */
pozoristaRequest.open("GET", firebase4Url + "predstave.json");
pozoristaRequest.send();