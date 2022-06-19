let firebase10Url="https://pozorista-a30a0-default-rtdb.europe-west1.firebasedatabase.app/";

let users8Url = firebase10Url + "predstave.json";
let predstave8Request = new XMLHttpRequest();
var nazivPP  = document.getElementById("nazivPP");
var kodPP = document.getElementById("kodPP");
var trajanjePP = document.getElementById("trajanjePP");
var zanrPP = document.getElementById("zanrPP");
var maksPP = document.getElementById("maksPP");
var cenaPP = document.getElementById("cenaPP");
var  prosecnaOcenaPP= document.getElementById("prosecna_ocenaPP");
var detOpis = document.getElementById("detaljan_opisPP");
var kratOpis = document.getElementById("kratak_opisPP");
//var listaOcena=document.getElementById("ocene_listaPP")
predstave8Request.onreadystatechange = function (){
  if (this.readyState == 4) {
    if (this.status == 200) { 
     
    let predstave=JSON.parse(predstave8Request.responseText);
    for (let i in predstave) {
        let predstava = predstave[i]; 
       
        for (let j in predstava){
            if (j==idPredstave1){
                console.log(j)
                pr=predstava[j]
            nazivPP.value=pr.naziv;
            kodPP.value=pr.kod;
            kratOpis.value=pr.kratakOpis;
            trajanjePP.value=pr.trajanje;
            zanrPP.value=pr.zanr;
            detOpis.value=pr.opis;
            cenaPP.value=pr.cena;
            maksPP.value=pr.maxOsobe;
            break;
        }
   

    }
     } 
  }
 }
}
predstave8Request.open("GET", firebase10Url + "predstave.json");
predstave8Request.send();


let button6=document.getElementById('aaa');

button6.addEventListener("submit", function validate(e){
    e.preventDefault();


      if (
          nazivPP.value == "" ||
          kodPP.value == "" ||
          trajanjePP.value == "" ||
          zanrPP.value == "" ||
          maksPP.value == "" ||
          cenaPP.value == "" ||
          detOpis.value == "" ||
          kratOpis.value == "" 
          
        ) {
          alert("Morate popuniti polja ");
        }else {
          
          let putRequest=new XMLHttpRequest();
          var pred={};
              pred.naziv=nazivPP.value;
              pred.kod=kodPP.value;
              pred.kratakOpis=kratOpis.value;
              pred.trajanje=trajanjePP.value;
              pred.zanr=zanrPP.value;
              pred.opis=detOpis.value;
              pred.cena=cenaPP.value;
              pred.maxOsobe=maksPP.value;
              pred.ocene=ocenice;
          
          putRequest.onreadystatechange = function () {
            if (this.readyState == 4) {
              if (this.status == 200) {
              
              alert("Uspešno ste izvršili izmene!")
              
              window.location.href="predstava1.html?"+idPredstave1+"?"+idPozorišta;
          }else{
            alert("Greska pri unosu u bazu podataka!")
          }
  
        }
}
        putRequest.open("PUT", firebase10Url+ "/predstave/"+ idPozorišta+"/"+idPredstave1 +'.json');
        
        putRequest.send(JSON.stringify(pred)); 
      } 
     
      });
  
      function getIdFromUrl() {
      const path = decodeURI(window.location.toString());
      console.log(path);
      const pozoristeId = path.split("?")[1];
      const predstavaId = path.split("?")[2];
      let niz=path.split("?")[3];
  let b=niz.split(",");
  console.log(b)
  let o=[];
  for (num in b){
    let s=parseInt(b[num])
    o.push(s)

  }
  let a=[];
  a[0]=pozoristeId;
  a[1]=predstavaId;
  a[2]=o;
  return a;
}
let niz=getIdFromUrl(); /* Ucitaj iz firebasea */
let idPredstave1=niz[0];
let idPozorišta=niz[1];
let ocenice=niz[2];
console.log(ocenice);

document.getElementById("brisanje123").onclick = function(e){
  e.preventDefault();
  if(confirm("Da li ste sigurni da želite da obrišete predstavu?")){

      let request = new XMLHttpRequest();

      request.open("DELETE", firebase10Url +"/predstave/"+idPozorišta+"/"+ idPredstave1 +".json");
      request.setRequestHeader("Content-Type", "application/json");
      request.onreadystatechange = function(){
          if(this.readyState == 4){
              if(this.status == 200){

                  predstave = JSON.parse(request.responseText);
                  console.log(predstave);
              }
              else{
                  alert("Greška prilikom učitavanja svih predstava.");
              }
          }
      };

      request.send();

      alert("Obrisali ste predstavu")
      window.location.href = "projekat.html";

  }
  else{
      alert("Odustali ste")
  }
};



