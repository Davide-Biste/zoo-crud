let dati = [];

function fetchDati(){
    fetch('/animali')
    .then(res=>res.json())
    .then(json=>{
        dati = json;
        CaricaDati();
    })
    .catch(err=>alert(err));
}

function fetchClassi(){
    fetch('/classi')
    .then(res=>res.json())
    .then(json=>{
        dati = json;
        CaricaClassi();
    })
    .catch(err=>alert(err));
}

function eventButton(){
document.addEventListener('input',()=>{

    let btn = document.getElementById("aggiungi-ani");
    let nome = document.getElementById("nome");
    let razza = document.getElementById("razza");

        if(nome.value == "" || razza.value == ""){
            btn.setAttribute("disabled", true)
        }
        else{
            btn.removeAttribute("disabled")
        }
    })
}

function eventButtonCla(){
    document.addEventListener('input',()=>{
    
        let btn = document.getElementById("aggiungi-cla");
        let nome = document.getElementById("nome");
        let descrizione = document.getElementById("descrizione");
    
            if(nome.value == "" || descrizione.value == ""){
                btn.setAttribute("disabled", true)
            }
            else{
                btn.removeAttribute("disabled")
            }
        })
    }


function inputChange(value){
    if(!value){
        
    }
}

const container = document.querySelector("tbody");

function CaricaDati(){
    const container = document.querySelector("tbody");
    for(var k=0; k<dati.length; ++k){
        const tr = document.createElement("tr");
        for(var prop in dati[k]){
            if(prop === '_id') continue;
            if(prop === '__v') continue;
            const td = document.createElement("td");
            td.innerHTML = dati[k][prop];
            td.classList = prop;
            tr.appendChild(td);
        }
        const azioni = document.createElement("td");
        
        const modifica = document.createElement("button");
        modifica.innerHTML="MODIFICA";
        modifica.addEventListener('click', updateModal);
        modifica.classList = "btn btn-warning mod-ani";

        const elimina = document.createElement("button");
        elimina.innerHTML="&nbspELIMINA&nbsp";
        elimina.addEventListener('click', deleteModal);
        elimina.classList = "btn btn-danger del-ani";
        
        azioni.appendChild(modifica);
        azioni.appendChild(elimina);

        tr.appendChild(azioni);

        container.appendChild(tr);
    }
}

function CaricaClassi(){
    const container = document.querySelector("tbody");
    // svuota tabella
     container.innerHTML="";
    while(container.firstChild) container.removeChild(container.firstChild);

    for(var k=0; k<dati.length; ++k){
        const tr = document.createElement("tr");
        for(var prop in dati[k]){
            if(prop === '_id') continue;
            if(prop === '__v') continue;
            const td = document.createElement("td");
            td.innerHTML = dati[k][prop];
            td.classList = prop;
            // aggiunta stile / classi / ...
            tr.appendChild(td);
        }
        const azioni = document.createElement("td");
        
        const modifica = document.createElement("button");
        modifica.innerHTML="MODIFICA";
        modifica.addEventListener('click', updateClassi);
        modifica.classList = "btn btn-warning mod-cla";
        //modifica.style = "border-radius: 1rem 1rem 0rem 0rem; font-size:1.2rem;";

        const elimina = document.createElement("button");
        elimina.innerHTML="&nbspELIMINA&nbsp";
        elimina.addEventListener('click', deleteClassi);
        elimina.classList = "btn btn-danger del-cla";
        //elimina.style = "border-radius: 0rem 0rem 1rem 1rem; font-size:1.2rem; padding-right: 1rem;";
        
        azioni.appendChild(modifica);
        azioni.appendChild(elimina);

        tr.appendChild(azioni);

        container.appendChild(tr);
    }
}

function caricaBox(){
    let a = document.getElementById("prova");
    a.innerHTML = modanimale[0].nome;
}



function deleteModal(event){
    let modal = document.getElementById("Modal");
    modal.style.display = "block";

    let id = document.getElementById("strong-id");

    const object = event.target.parentNode.parentNode;
    const idScritto = object.querySelector("td").innerHTML;

    id.innerHTML = idScritto;

    let annulla = document.getElementById("btn-close");
    annulla.addEventListener('click', Annulla);

    let elimina = document.getElementById("btn-eliminaid");
    elimina.addEventListener('click', ()=>{
        const row = event.target.parentNode.parentNode;
        const id = row.querySelector("td.idAnimale").innerHTML;
        
        // rimuovo la riga dall'HTML
        container.removeChild(row);

        let modal = document.getElementById("Modal");
        modal.style.display = "none";
    
        const idid = {
            idAnimale: id
        };
        fetch('/animali/elimina/', {
            method: 'DELETE',
            body: ObjectToURL(idid),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })


    });
}

function deleteClassi(event){
    let modal = document.getElementById("Modal");
    modal.style.display = "block";

    let id = document.getElementById("strong-id");

    const object = event.target.parentNode.parentNode;
    const idScritto = object.querySelector("td").innerHTML;

    id.innerHTML = idScritto;

    let annulla = document.getElementById("btn-close");
    annulla.addEventListener('click', Annulla);

    let elimina = document.getElementById("btn-eliminaid");
    elimina.addEventListener('click', ()=>{
        const row = event.target.parentNode.parentNode;
        const id = row.querySelector("td").innerHTML;
        
        // rimuovo la riga dall'HTML
        container.removeChild(row);

        let modal = document.getElementById("Modal");
        modal.style.display = "none";
    
        const idid = {
            idClasse: id
        };
    
        fetch('/classi/elimina/', {
            method: 'DELETE',
            body: ObjectToURL(idid),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })


    });
    
}

function updateClassi(event){
    
    //apro modal
    let modal = document.getElementById("ModalMod");
    modal.style.display = "block";

    const object = event.target.parentNode.parentNode;


    const idScritto = object.querySelector("td").innerHTML;

    const nomeScritto = object.querySelector("td.nome").innerHTML;

    const descrizione = object.querySelector("td.descrizione").innerHTML;


    let id = document.getElementById("strong-id-mod");

    id.innerHTML = idScritto;

    document.getElementById("idclasse-mod").value = idScritto;
    document.getElementById("nome-mod").value = nomeScritto;
    document.getElementById("descrizione-mod").value = descrizione;



    let annulla = document.getElementById("btn-close-mod");
    annulla.addEventListener('click', Annulla);

    
    let modifica = document.getElementById("btn-modificaid");
    modifica.addEventListener('click', ()=>{

        let modal = document.getElementById("ModalMod");
        modal.style.display = "none";

        const modifica = {
            idClasse: idScritto,
            nome: nomeScritto,
            descrizione: document.getElementById("descrizione-mod").value,
        };
    
        fetch('/classi/modifica/', {
            method: 'PUT',
            body: ObjectToURL(modifica),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })

        
       document.location.reload(true);
    });
}

function updateModal(event){
    //apro modal
    let modal = document.getElementById("ModalModAni");
    modal.style.display = "block";

    let object = event.target.parentNode.parentNode;


    let idAnimale = object.querySelector("td.idAnimale").innerHTML;

    let nome = object.querySelector("td.nome").innerHTML;

    let razza = object.querySelector("td.razza").innerHTML;

    let classe = object.querySelector("td.classe").innerHTML;



    let id = document.getElementById("strong-id-mod-ani");

    id.innerHTML = idAnimale;

    document.getElementById("idanimale-mod").value = idAnimale;
    document.getElementById("nome-mod").value = nome;
    document.getElementById("razza-mod").value = razza;
    insertCombo();
    


    
    //fare altri test




    let annulla = document.getElementById("btn-close-mod");
    annulla.addEventListener('click', Annulla);

    
    let modifica = document.getElementById("btn-modifica-ani");
    modifica.addEventListener('click', ()=>{

        let modal = document.getElementById("ModalModAni");
        modal.style.display = "none";
        
    
        const modifica = {
            idAnimale: idAnimale,
            nome: document.getElementById("nome-mod").value,
            razza: document.getElementById("razza-mod").value,
            classe: document.getElementById("classe").value,
        };
    
        fetch('/animali/modifica/', {
            method: 'PUT',
            body: ObjectToURL(modifica),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        document.location.reload(true);
    });
}



function Annulla(event){
    let modal = document.getElementById("Modal");
    modal.style.display = "none";
    document.location.reload(true)
}

function ObjectToURL(object){
    let parts = [];
    for(var part in object){
        parts.push(part+'='+object[part]);
    }
    return parts.join('&');
}


function insertCombo(){
    fetch('/classi/')
    .then(res=>res.json())
    .then(json=>{
        dati = json;
        combo();
    })
    .catch(err=>alert(err));
}


function combo(){
    const combo = document.getElementById("classe");
    for(var k=0; k<dati.length; ++k){    
        for(var prop in dati[k]){
            if(prop === '_id') continue;
            if(prop === '__v') continue;
            if(prop === "idClasse") continue;
            if(prop === "descrizione") continue;
            const option = document.createElement("option");
            option.innerHTML = dati[k][prop];
            option.value = dati[k][prop];
            
            try {
                combo.add(option, null); //Standard 
            }catch(error) {
                combo.add(option); // IE only
            }
        }
    }
}



function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("table");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("td")[n];
        y = rows[i + 1].getElementsByTagName("td")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            if(n ==0){
                document.getElementById("nometh").classList = "bi bi-caret-up-fill"; 
                document.getElementById("razzath").classList = "bi bi-caret-right-fill"; 
                document.getElementById("classeth").classList = "bi bi-caret-right-fill"; 
                document.getElementById("idth").classList = "bi bi-caret-right-fill"; 
            }
            else{
                if(n==1){
                    document.getElementById("nometh").classList = "bi bi-caret-right-fill"; 
                    document.getElementById("razzath").classList = "bi bi-caret-right-fill"; 
                    document.getElementById("classeth").classList = "bi bi-caret-right-fill"; 
                    document.getElementById("idth").classList = "bi bi-caret-up-fill"; 
                }
                else{
                    if(n == 2){
                        document.getElementById("nometh").classList = "bi bi-caret-right-fill"; 
                        document.getElementById("razzath").classList = "bi bi-caret-up-fill"; 
                        document.getElementById("classeth").classList = "bi bi-caret-right-fill"; 
                        document.getElementById("idth").classList = "bi bi-caret-right-fill"; 
                    }
                    else{
                        if(n == 3){
                            document.getElementById("nometh").classList = "bi bi-caret-right-fill"; 
                            document.getElementById("razzath").classList = "bi bi-caret-right-fill"; 
                            document.getElementById("classeth").classList = "bi bi-caret-up-fill"; 
                            document.getElementById("idth").classList = "bi bi-caret-right-fill"; 
                        }
                    }
                }
            }
            
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            if(n ==0){
                document.getElementById("nometh").classList = "bi bi-caret-down-fill"; 
                document.getElementById("idth").classList = "bi bi-caret-right-fill"; 
                document.getElementById("razzath").classList = "bi bi-caret-right-fill"; 
                document.getElementById("classeth").classList = "bi bi-caret-right-fill"; 
            }
            else{
                if(n==1){
                    document.getElementById("nometh").classList = "bi bi-caret-right-fill"; 
                    document.getElementById("idth").classList = "bi bi-caret-down-fill"; 
                    document.getElementById("razzath").classList = "bi bi-caret-right-fill"; 
                    document.getElementById("classethth").classList = "bi bi-caret-right-fill"; 
                }
                else{
                    if(n == 2){
                        document.getElementById("nometh").classList = "bi bi-caret-right-fill"; 
                        document.getElementById("idth").classList = "bi bi-caret-right-fill"; 
                        document.getElementById("razzath").classList = "bi bi-caret-down-fill"; 
                        document.getElementById("classeth").classList = "bi bi-caret-right-fill"; 
                    }
                    else{
                        if(n == 3){
                            document.getElementById("nometh").classList = "bi bi-caret-right-fill"; 
                            document.getElementById("idth").classList = "bi bi-caret-right-fill"; 
                            document.getElementById("razzath").classList = "bi bi-caret-right-fill"; 
                            document.getElementById("classeth").classList = "bi bi-caret-down-fill"; 
                        }
                    }
                }
            }
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }


  function sortTableCla(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("tableCla");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("td")[n];
        y = rows[i + 1].getElementsByTagName("td")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            if(n==0){
                document.getElementById("id").classList = "bi bi-caret-up-fill"; 
                document.getElementById("classe").classList = "bi bi-caret-right-fill"; 
            }
            else{
                document.getElementById("id").classList = "bi bi-caret-right-fill"; 
                document.getElementById("classe").classList = "bi bi-caret-up-fill"; 
            }
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            if(n==0){
                document.getElementById("id").classList = "bi bi-caret-down-fill"; 
                document.getElementById("classe").classList = "bi bi-caret-right-fill"; 
            }
            else{
                document.getElementById("id").classList = "bi bi-caret-right-fill"; 
                document.getElementById("classe").classList = "bi bi-caret-down-fill"; 
            }
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


let searchData = [];
function Ricerca(){
    let ricerca = document.getElementById("cerca").value;

    const search = {
        descrizione: ricerca,
    };

    fetch('/classi/ricerca/?descrizione='+ ricerca, {
        method: 'GET',
        
    })
    .then(res=>res.json())
    .then(json=>{
        searchData = json;
        CaricaRicerca();
    })
    .catch(err=>alert(err));
}

function CaricaRicerca(){
    const container = document.querySelector("tbody");
    // svuota tabella
     container.innerHTML="";
    while(container.firstChild) container.removeChild(container.firstChild);

    for(var k=0; k<searchData.length; ++k){
        const tr = document.createElement("tr");
        for(var prop in searchData[k]){
            if(prop === '_id') continue;
            if(prop === '__v') continue;
            const td = document.createElement("td");
            td.innerHTML = searchData[k][prop];
            td.classList = prop;
            // aggiunta stile / classi / ...
            tr.appendChild(td);
        }
        const azioni = document.createElement("td");
        
        const modifica = document.createElement("button");
        modifica.innerHTML="MODIFICA";
        modifica.addEventListener('click', updateClassi);
        modifica.classList = "btn btn-warning mod-cla";
        //modifica.style = "border-radius: 1rem 1rem 0rem 0rem; font-size:1.2rem;";

        const elimina = document.createElement("button");
        elimina.innerHTML="&nbspELIMINA&nbsp";
        elimina.addEventListener('click', deleteClassi);
        elimina.classList = "btn btn-danger del-cla";
        //elimina.style = "border-radius: 0rem 0rem 1rem 1rem; font-size:1.2rem; padding-right: 1rem;";
        
        azioni.appendChild(modifica);
        azioni.appendChild(elimina);

        tr.appendChild(azioni);

        container.appendChild(tr);
    }
}