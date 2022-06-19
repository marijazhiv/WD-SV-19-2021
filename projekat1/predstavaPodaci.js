let firebase5Url = "https://pozorista-a30a0-default-rtdb.europe-west1.firebasedatabase.app/";

let podaciUrl = firebase5Url + "predstave.json";

let podaciRequest = new XMLHttpRequest();
podaciRequest.onreadystatechange = function () {
  if (this.readyState == 4) { 
    if (this.status == 200) { 


      console.log(this.responseText); 

      let predstave = JSON.parse(this.responseText);
      

      let target = document.getElementById("sveOPredstavi");
      let target1=document.getElementById("rejting");

      for (let i in predstave) {
            let predstava = predstave[i]; 
           
            for (let j in predstava){
                if (j==idPredstave1){
                let pr=predstava[j];
                let ukupno=pr.ocene[0]+pr.ocene[1]+pr.ocene[2]+pr.ocene[3]+pr.ocene[4]
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
              <li><label for="number" id="vasaOcena"> <strong>Vaša ocena:</strong></label> 
                <input type="number" id="ocena" name="Ocena"
                min="1" max="5"> </li> <br> <hr> <br>
              <li>
                <a href = "izmena.html?${j}?${i}?${[pr.ocene[0],pr.ocene[1], pr.ocene[2], pr.ocene[3], pr.ocene[4]]}">
          <strong>Izmenite podatke</strong>
            </button>
              </li> <br> <br>
              `;

                target.innerHTML += template;
                let template1=`<span class="heading">Ocene korisnika</span>
            <p> bazirano na ${pr.ocene[0]+pr.ocene[1]+pr.ocene[2]+pr.ocene[3]+pr.ocene[4]} ocena.</p>
            <hr style="border:3px solid #f1f1f1">
            
            <div class="row">
              <div class="side">
                <div>Ocena 5</div>
              </div>
              <div class="middle">
                <div class="bar-container">
                  <div class="bar-5" style="width:${(pr.ocene[4]/ukupno)*100}%; height: 18px; background-color: #04AA6D;"></div>
                </div>
              </div>
              <div class="side right">
                <div>${pr.ocene[4]}</div>
              </div>
              <div class="side">
                <div>Ocena 4</div>
              </div>
              <div class="middle">
                <div class="bar-container">
                  <div class="bar-4" style="width:${(pr.ocene[3]/ukupno)*100}%; height: 18px; background-color: #2196F3;"></div>
                </div>
              </div>
              <div class="side right">
                <div>${pr.ocene[3]}</div>
              </div>
              <div class="side">
                <div>Ocena 3</div>
              </div>
              <div class="middle">
                <div class="bar-container">
                  <div class="bar-3" style="width:${(pr.ocene[2]/ukupno)*100}%; height: 18px; background-color: #00bcd4;"></div>
                </div>
              </div>
              <div class="side right">
                <div>${pr.ocene[2]}</div>
              </div>
              <div class="side">
                <div>Ocena 2</div>
              </div>
              <div class="middle">
                <div class="bar-container">
                  <div class="bar-2" style="width:${(pr.ocene[1]/ukupno)*100}%; height: 18px; background-color: #ff9800;"></div>
                </div>
              </div>
              <div class="side right">
                <div>${pr.ocene[1]}</div>
              </div>
              <div class="side">
                <div>Ocena 1</div>
              </div>
              <div class="middle">
                <div class="bar-container">
                  <div class="bar-1" style="width:${(pr.ocene[0]/ukupno)*100}%; height: 18px; background-color: #f44336;"></div>
                </div>
              </div>
              <div class="side right">
                <div>${pr.ocene[0]}</div>
              </div>
            </div>`

            target1.innerHTML+=template1

        }
    }
        }
      }
    }
};


function getIdFromUrl() { 
  const path = decodeURI(window.location.toString());
  console.log(path);
  const pozoristeId = path.split("?")[1];
  const predstavaId = path.split("?")[2];
  let a=[];
  a[0]=pozoristeId;
  a[1]=predstavaId;
  return a;
}
let niz=getIdFromUrl(); 
let idPredstave1=niz[0];
let idPozorišta=niz[1];
podaciRequest.open("GET", firebase5Url + "predstave.json");
podaciRequest.send();

const commentContainer = document.getElementById('allComments');
document.getElementById('addComments').addEventListener('click', function (ev) {
   addComment(ev);
});


function addComment(ev) {
  let commentText, wrapDiv;
  const textBox = document.createElement('div');
  const replyButton = document.createElement('button');
  //replyButton.classList.add("are");
  replyButton.className = 'reply';
  replyButton.innerHTML = 'Reply';
  replyButton.style.background = "#FFCCFF";
  replyButton.style.marginTop = "10px";
  //const likeButton = document.createElement('button');
  //likeButton.classList.add("are");
  //likeButton.innerHTML = 'Like';
  //likeButton.className = 'likeComment';
  const deleteButton = document.createElement('button');
  //deleteButton.classList.add("are");
  deleteButton.innerHTML = 'Delete';
  deleteButton.className = 'deleteComment';
  deleteButton.style.background = "#FFCCFF";
  deleteButton.style.marginTop = "10px";
  if(hasClass(ev.target.parentElement, 'container')) {
      const wrapDiv = document.createElement('div');
      wrapDiv.className = 'wrapper';
      wrapDiv.style.marginLeft = 0;
      commentText = document.getElementById('comment').value;
      document.getElementById('comment').value = '';
      textBox.innerHTML = commentText;
      //textBox.classList.add("are");
      textBox.style.backgroundColor = "#FFCCFF";
      //textBox.style.borderRadius = "5px";
      //textBox.style.marginLeft="100px";
//wrapDiv.append(textBox, replyButton, likeButton, deleteButton);
      wrapDiv.append(textBox, replyButton, deleteButton);
      commentContainer.appendChild(wrapDiv);
  } else {
      wrapDiv = ev.target.parentElement;
      commentText = ev.target.parentElement.firstElementChild.value;
      textBox.innerHTML = commentText;
      //textBox.classList.add("are");
      textBox.style.backgroundColor = "#FFCCFF";
      wrapDiv.innerHTML = '';
      //wrapDiv.append(textBox, replyButton, likeButton, deleteButton);
      wrapDiv.append(textBox, replyButton, deleteButton);
  }
  setOnLocalStorage();
}


function setOnLocalStorage () {
  localStorage.setItem('template', document.getElementById('allComments').innerHTML);
}
function hasClass(elem, className) {
  return elem.className.split(' ').indexOf(className) > -1;
}

document.getElementById('allComments').addEventListener('click', function (e) {
  if (hasClass(e.target, 'reply')) {
      const parentDiv = e.target.parentElement;
      const wrapDiv = document.createElement('div');
      //wrapDiv.style.height="20px";
      wrapDiv.style.marginLeft = (Number.parseInt(parentDiv.style.marginLeft) + 15).toString() + 'px';
      wrapDiv.className = 'wrapper';
      const textArea = document.createElement('textarea');
      //textArea.classList.add("are");
      textArea.style.marginRight = '20px';
      textArea.style.resize="none";
      const addButton = document.createElement('button');
      addButton.className = 'addReply';
      addButton.innerHTML = 'ADD';
      addButton.style.height="25px";
      addButton.style.marginRight="8px";
      addButton.style.background="#FFCCFF";
      const cancelButton = document.createElement('button');
      cancelButton.innerHTML = 'Cancel';
      cancelButton.className='cancelReply'; 
      cancelButton.style.background="#FFCCFF";
      cancelButton.style.marginRight="8px";
      cancelButton.style.height="25px";
      wrapDiv.append(textArea, addButton, cancelButton);
      parentDiv.appendChild(wrapDiv); 

  } else if(hasClass(e.target, 'addReply')) {
      addComment(e);
  } else if(hasClass(e.target, 'cancelReply')) {
      e.target.parentElement.innerHTML = '';
      setOnLocalStorage();
  } else if(hasClass(e.target, 'deleteComment')) {
      e.target.parentElement.remove();
  }
});


