let firebase6Url="https://projekat-c78a2-default-rtdb.europe-west1.firebasedatabase.app/";

let users1Url = firebase6Url + "korisnici.json";
let korisniciRequest = new XMLHttpRequest();
korisniciRequest.onreadystatechange = function () {
  if (this.readyState == 4) { 
    if (this.status == 200) {

    let korisnici=JSON.parse(korisniciRequest.responseText);
    console.log(korisnici);
    let target=document.getElementById('tabla');
    for (let i in korisnici) {
        let korisnik = korisnici[i];

        console.log(i)

    let template=`<tr>
        <td><img src="avatar1.webp" alt="Prvi" width="70px" height="70px"></td>
        <td>${korisnik.ime} ${korisnik.prezime} </td>
        <td>${korisnik.korisnickoIme}, ${korisnik.lozinka}</td>
        <td><a href="izmeni_korisnika.html?${i}">Izmeni podatke</a></td>
    </tr>`;
target.innerHTML += template; 
     } 
  }
 }
}

korisniciRequest.open("GET", firebase6Url + "korisnici.json");
korisniciRequest.send();
