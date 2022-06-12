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
predstave8Request.onreadystatechange = function (){
  if (this.readyState == 4) {
    if (this.status == 200) { 
     
    let predstave=JSON.parse(predstave8Request.responseText);
    for (let i in predstave) {
        let predstava = predstave[i]; 
       
        for (let j in predstava){
            if (j==idPr7){
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
          
          putRequest.onreadystatechange = function () {
            if (this.readyState == 4) {
              if (this.status == 200) {
              
              alert("Uspešno ste izvršili izmene!")
              
              window.location.href="predstava1.html?"+idPr7
          }else{
            alert("Greska pri unosu u bazu podataka!")
          }
  
        }
}
        putRequest.open("PUT", firebase10Url+ "/predstave/"+ id6 + "/"+idPr7 +'.json');
        
        putRequest.send(JSON.stringify(pred)); 
      } 
     
      });
  
  function getIdFromUrl() { 
      const path = decodeURI(window.location.toString());
      console.log(path);
      let predstavaId = path.split("?")[1];
      return predstavaId;
    }
    let idPr7=getIdFromUrl();

function getID(id){
  let i=new XMLHttpRequest()
  i.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
     
    let predstave=JSON.parse(i.responseText);
    for (let o in predstave) {
        let predstava = predstave[o]; 
       
        for (let j in predstava){
            if (j==id){
              return o
}
        }
      }
    }
  }
}
}
let id6=getID(idPr7)
