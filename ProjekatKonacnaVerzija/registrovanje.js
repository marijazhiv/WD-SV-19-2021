let firebase2Url = "https://projekat-c78a2-default-rtdb.europe-west1.firebasedatabase.app/";

let korisnciUrl = firebase2Url + "korisnici.json";

let form = document.getElementById("login"); // forma login
let button1=document.getElementById("submit")
button1.addEventListener("click", function(e){
e.preventDefault();
  let korisnickoIme1 = document.getElementById("k_ime").value.trim(); // korisnik id
  let lozinka1 = document.getElementById("password").value.trim(); // lozinka id

  if (korisnickoIme1 == "" || lozinka1 == "") {
    alert("Polja ne smeju biti prazna");
  } else {
    let korisniciRequest = new XMLHttpRequest();
    korisniciRequest.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          console.log(this.responseText);
          let korisnici=JSON.parse(korisniciRequest.responseText);
          let login = false;
          for (let i in korisnici) {
            let korisnik = korisnici[i];
            let korisnickaImena = korisnik.korisnickoIme; 
            let lozinka2 = korisnik.lozinka;
            console.log(korisnickaImena, lozinka2);
            console.log(korisnickoIme1, lozinka1);
            if (korisnickaImena == korisnickoIme1 && lozinka2 == lozinka1) {
              alert("Uspesno ste se ulogovali! Dobrodosli!");
            meni=document.getElementById("meniii")
           
            template= `<li><a href="projekat.html">O nama</a></li>
            <li><a href="korisnik.html?${i}">Moj profil</a></li>
            
            <li><a href="projekat.html">Odajvite se</a></li>`
            ;

            meni.innerHTML=template;

              break;
            }
            
          }

          }
        //else{
            //alert("Problem sa unosom u bazu podataka")
       // }
      }
  
    }
    ;
    korisniciRequest.open("GET", firebase2Url + "korisnici.json");
    korisniciRequest.send();
  }
});


var ime = document.getElementById("ime");
var prezime = document.getElementById("prezime");
var korisnickoIme = document.getElementById("k_ime1");
var adresa = document.getElementById("adresa");
var email = document.getElementById("email");
var regexEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var lozinka = document.getElementById("password1");
var regexPsw = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/;
var brojTelefona = document.getElementById("telefon");
var regexBroj = /[0-9]{9}/;
var datum = document.getElementById("datum");
var buttonR = document.getElementById("submit1");
buttonR.addEventListener("click", function validate() {
  if (
    ime.value == "" ||
    prezime.value == "" ||
    korisnickoIme.value == "" ||
    adresa.value == "" ||
    email.value == "" ||
    lozinka.value == "" ||
    brojTelefona.value == "" ||
    datum.value == ""
  ) {
    alert("Morate popuniti polja ");
  } else if (!email.value.match(regexEmail)) {
    alert("Email nije ispravan");
    email.value = "";
  } else if (!lozinka.value.match(regexPsw)) {
    alert("Lozinka mora imati najmanje 8 karaktera i brojeve");
    lozinka.value = "";
  } else if (!brojTelefona.value.match(regexBroj)) {
    alert("Broj mora imati 9 karaktera i oni moraju biti brojevi");
    brojTelefona.value = "";
  } else {
    var korisnikk={}
    korisnikk.adresa=adresa.value;
    korisnikk.datumRodjenja=datum.value;
    korisnikk.email=email.value;
    korisnikk.ime=ime.value;
    korisnikk.prezime=prezime.value;
    korisnikk.korisnickoIme=korisnickoIme.value;
    korisnikk.lozinka=lozinka.value;
    korisnikk.telefon=brojTelefona.value;

    let regfirebase= "https://projekat-c78a2-default-rtdb.europe-west1.firebasedatabase.app/"
    let regRequest=new XMLHttpRequest();  
    regRequest.onreadystatechange = function (e) {
      if (this.readyState==4){
        if (this.status==200){
          console.log(korisnikk)

        }
        alert("Greska!!")
      }


    }

   regRequest.open("POST", regfirebase+"korisnici.json")
   regRequest.send(JSON.stringify(korisnikk))
    let regr=document.getElementById("registracija");
    window.location.replace("projekat.html?korisnik="+ime.value);
    alert("Registrovali ste se");
  }
});