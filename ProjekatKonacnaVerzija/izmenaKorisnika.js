let firebase13Url="https://projekat-c78a2-default-rtdb.europe-west1.firebasedatabase.app/";

var forma=document.getElementById("forma123");
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

forma.addEventListener("submit", function validate(e){
  e.preventDefault();

    if (
        imeIK.value == "" ||
        prezimeIK.value == "" ||
        korisnickoImeIK.value == "" ||
        adresaIK.value == "" ||
        emailIK.value == "" ||
        lozinkaIK.value == "" ||
        brojTelefonaIK.value == "" ||
        datumIK.value == ""
      ) {
        alert("Morate popuniti polja ");
      } else if (!emailIK.value.match(regexEmail)) {
        alert("Email nije ispravan");
        email7.value = "";
      } else if (!lozinkaIK.value.match(regexPsw)) {
        alert("Lozinka mora imati najmanje 8 karaktera i brojeve");
        lozinkaIK.value = "";
      } else if (!brojTelefonaIK.value.match(regexBroj)) {
        alert("Broj mora imati 9 karaktera ");
        brojTelefonavalue = "";
      } else {
        
        let putRequest=new XMLHttpRequest();
        var korisn={};
            korisn.ime=imeIK.value;
            korisn.prezime=prezimeIK.value;
            korisn.adresa=adresaIK.value;
            korisn.telefon=brojTelefonaIK.value;
            korisn.korisnickoIme=korisnickoImeIK.value;
            korisn.lozinka=lozinkaIK.value;
            korisn.datumRodjenja=datumIK.value;
            korisn.email=emailIK.value;
        
        putRequest.onreadystatechange = function () {
          if (this.readyState == 4) { 
            if (this.status == 200) { 
            
            alert("Uspešno ste izvršili izmene!")
            
            window.location.href="administratorska.html"
        }else{
          alert("Greska pri unosu u bazu podataka!")
        }

      }

      

      }
      putRequest.open("PUT", firebase13Url+ "korisnici/"+ idPr7+'.json');
      
      putRequest.send(JSON.stringify(korisn)); 
    } 
   
    });

function getIdFromUrl() { 
    const path = decodeURI(window.location.toString());
    console.log(path);
    let predstavaId = path.split("?")[1];
    return predstavaId;
  }
  let idPr7=getIdFromUrl();
  let button0=document.getElementById("button0") 
  button0.addEventListener("click", function v(e){
  e.preventDefault();
  let deleteRequest=new XMLHttpRequest();
    var k={};
    deleteRequest.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) { 
      
        confirm("Da li sigurno želite izmenu?");
        
        window.location.href="administratorska.html";
    }else{
      alert("Greška pri unosu podataka u bazu!");
    }

  }

  

  }
  deleteRequest.open("PUT", firebase13Url+ "korisnici/"+ idPr7+'.json');
  
  deleteRequest.send(JSON.stringify(k)); 
} 
  );
 