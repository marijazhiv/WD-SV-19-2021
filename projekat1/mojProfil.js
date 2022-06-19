let firebaseK= "https://pozorista-a30a0-default-rtdb.europe-west1.firebasedatabase.app/"

let podaciRequest = new XMLHttpRequest();
podaciRequest.onreadystatechange = function () {
  if (this.readyState == 4) { 
    if (this.status == 200) { 


      

      let korisnici = JSON.parse(this.responseText);
      

      let target = document.getElementById("mojProfil");
    

      for (let i in korisnici) {
            if (i==idKorisnik){
                let korisnik = korisnici[i]; 
                  
                let template = `
                <img src="avatar1.webp" alt="Profilna slika" width="150px" height="150px">
        <li> Korisničko ime:${korisnik.korisnickoIme} </li> <br>
        <li> Lozinka:${korisnik.lozinka}</li> <br>
        <li> E-mail adresa: ${korisnik.email} </li> <br>
        <li> Ime: ${korisnik.ime}</li> <br>
        <li> Prezime:${korisnik.prezime}</li> <br> <hr color="violet"> <br>
        <li> Datum rođenja:${korisnik.datumRodjenja}  </li> <br>
        <li> Adresa: ${korisnik.adresa} bb</li> <br>
        <li>Broj telefona:${korisnik.telefon}</li> <br>
          <button class="GFG" style="position: center;"
      onclick="window.location.href = 'izmeni_korisnika.html?${i}';">
          Izmenite podatke
      </button>
        </li>`;
    target.innerHTML+=template  
    break;  
    }
}
}
}
};
podaciRequest.open("GET", firebaseK + "korisnici.json");
podaciRequest.send();
function getIdFromUrl() { /* Splituj json po id-u */
  const path = decodeURI(window.location.toString());
  console.log(path);
  const korisnikId = path.split("?")[1];
  return korisnikId;
}
idKorisnik=getIdFromUrl(); /* Ucitaj iz firebasea */