let firebase8Url="https://projekat-c78a2-default-rtdb.europe-west1.firebasedatabase.app/";

let users2Url = firebase8Url + "korisnici.json";
let korisnici1Request = new XMLHttpRequest();
var imeIK = document.getElementById("imeIK");
var prezimeIK = document.getElementById("prezimeIK");
var korisnickoImeIK = document.getElementById("korisnickoimeIK");
var adresaIK = document.getElementById("adresaIK");
var emailIK = document.getElementById("emailIK");
var lozinkaIK = document.getElementById("lozinkaIK");
var brojTelefonaIK = document.getElementById("mobileIK");
var datumIK = document.getElementById("datumIK");
var regexEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var regexPsw = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/;
var regexBroj = /[0-9]{9}/;
korisnici1Request.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) { 
     
    let korisnici=JSON.parse(korisnici1Request.responseText)
    console.log(korisnici)
    for (let i in korisnici) {
        let korisnik=korisnici[i]
        if (i==idPr77){

            imeIK.value=korisnik.ime
            prezimeIK.value=korisnik.prezime
            adresaIK.value=korisnik.adresa
            datumIK.value=korisnik.datumRodjenja
            emailIK.value=korisnik.email
            lozinkaIK.value=korisnik.lozinka
            brojTelefonaIK.value=korisnik.telefon
            korisnickoImeIK.value=korisnik.korisnickoIme
            break;
        }
   

     
     } 
  }
 }
}
korisnici1Request.open("GET", firebase8Url + "korisnici.json");
korisnici1Request.send();



function getIdFromUrl() { 
    const path = decodeURI(window.location.toString());
    console.log(path);
    let predstavaId = path.split("?")[1];
    return predstavaId;
  }
  let idPr77=getIdFromUrl();