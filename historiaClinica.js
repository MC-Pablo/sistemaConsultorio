let benzodiazepinas = [];
fetch("../json/benzodiazepinas.json")
  .then(response => response.json())
  .then(data => {
    benzodiazepinas = data;
  });


let antipsicoticos = [];

fetch("../json/antipsicoticos.json")
  .then(response => response.json())
  .then(data => {
    antipsicoticos = data;
  });

let antidepresivos = [];
fetch("../json/antidepresivos.json")
  .then(response => response.json())
  .then(data => {
    antidepresivos = data;
  });



let medicacionEnStockivos = [];
fetch("../json/medicacionEnStock.json")
  .then(response => response.json())
  .then(data => {
    medicacionEnStock = data;
  });



///////////////////SALUDO INICIAL///////////////////////////////////
function saludar() {
  const saludoBienvenida = document.querySelector("#saludo");
  const saludoInicial = localStorage.getItem("usuario-ingresado");
  const saludoEnLS = JSON.parse(saludoInicial);

  let saludo = document.createElement("h2");
  saludo.classList.add("saludoBienvenida");
  saludo.innerText = "¡Bienvenido/a " + saludoEnLS["usuario"] + "!";
  saludoBienvenida.append(saludo);
}
saludar();
crearnuevoform();


//////////////////FORMULARIO DE INGRESO DE PACIENTES ///////////////////////////
function crearnuevoform() {
  let formTratamiento = document.querySelector("#formulario2");
  formTratamiento.addEventListener("submit", (event) => {
    event.preventDefault();
    const valorT = document.querySelector("#inputTratamiento");
    let valorT1 = valorT.value;

    validarInputForm2(valorT1);
  });

  function validarInputForm2(valorT1) {

    if (valorT1.length < 5 || valorT1.length > 8) {
      alert("El valor debe tener entre 5 y 8 números. Intente nuevamente.");
      return;
    }

    if (!/^\d+$/.test(valorT1)) {
      alert("El valor solo debe contener números del 0 al 9.");
      return;
    }
    localStorage.setItem("Paciente", valorT1);
    let formTratamiento = document.querySelector("#formulario2");
    formTratamiento.remove();
    crearMenu();
  }
}


/////////////////////////MENU////////////////////////////
function crearMenu() {
  let menu = document.createElement("menu");

  menu.classList.add("mU");
  menu.id = 'menu'
  menu.innerHTML = `<li><button id="clozapina">Iniciar protocolo de Clozapina</button></li>`;
  menu.innerHTML += `<li><button id="tto">Iniciar tratamiento</button></li>`;
  menu.innerHTML += `<li><button id="stock">Medicamentos en stock</button></li>`;
  menu.innerHTML += `<li><button id="atras"> Volver atrás </button></li>`;
  const menuUs = document.querySelector("#menuUs");
  menuUs.append(menu);

  /////////////////////EVENTOS DEL MENU///////////////////////
  let iniciarProtocolo = document.querySelector('#clozapina');
  iniciarProtocolo.addEventListener("click", crearFormularioClozapina);

  let IniciarTratamiento = document.querySelector("#tto");
  IniciarTratamiento.addEventListener("click", iniciarTto);


  let stockMedicamentos = document.querySelector("#stock");
  stockMedicamentos.addEventListener("click", checkStock);

  let volverAtrás = document.querySelector("#atras");
  volverAtrás.addEventListener("click", atrás);

};


/////////////////PROTOCOLO DE CLOZAPINA///////////////////////


function crearFormularioClozapina() {

  const iniciarTto = document.querySelector('#nvoTto')
  iniciarTto.innerHTML = '';
  const medEnStock = document.querySelector('#verStock');
  medEnStock.innerHTML = '';
  const iniciarEs = document.querySelector("#iniciarEsquema");
  iniciarEs.innerHTML = '';
  const dosis = document.querySelector('#mostrarDosis');
  dosis.innerHTML = '';

  let iniciarProtocolo = document.querySelector('#menuCloza');
  iniciarProtocolo.innerHTML = '';


  const form = document.createElement('form');
  form.id = 'protocoloCloza';
  form.classList.add('formulario1');

  form.innerHTML = `<label for="inputCloza">Ingesar valores de Neutrófilos</label>`
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'inputCloza';
  input.classList.add('inputCloza');
  input.required = true;
  form.append(input);

  form.innerHTML += `<label for="inputFechaCloza">Ingesar fecha del estudio</label>`
  const input2 = document.createElement('input')
  input2.id = 'inputFechaCloza';
  input2.type = 'date';
  input2.classList.add('inputFechaCloza');
  form.append(input2);

  const button = document.createElement('button');
  button.type = 'submit';
  button.id = 'btnProtocolo';
  button.classList.add('btnProtocolo');
  button.innerText = 'Cargar'
  form.append(button);

  const menuCloza = document.querySelector('#menuCloza');
  menuCloza.append(form);


  ///////////////////VALIDACION DE PROTROCOLO/////////////////////////


  const formCloza = document.querySelector('#protocoloCloza');
  formCloza.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputCloza = document.querySelector("#inputCloza");
    const valorCloza = inputCloza.value;
    const inputFechaCloza = document.querySelector("#inputFechaCloza");
    const valorFechaCloza = inputFechaCloza.value;
    localStorage.setItem('valoresNeutropeniaFecha', valorFechaCloza);
    localStorage.setItem('valoresNeutropenia', valorCloza);
    validarInputCloza(valorCloza);
  });

  function validarInputCloza(valorCloza) {
    if (valorCloza <= 1500) {
      Swal.fire({
        icon: "error",
        title: "Indicadores de Neutropenia.",
        text: "Reevaluar titulación.",
      });
      return;
    };
    if (!/^\d+$/.test(valorCloza)) {
      alert("El valor solo debe contener números del 0 al 9.");
      return;
    };

  };
};





function checkStock() {

  const menuCloza = document.querySelector('#menuCloza');
  menuCloza.innerHTML = '';
  const iniciarTto = document.querySelector('#nvoTto')
  iniciarTto.innerHTML = '';
  const iniciarEs = document.querySelector("#iniciarEsquema");
  iniciarEs.innerHTML = '';
  const dosis = document.querySelector('#mostrarDosis');
  dosis.innerHTML = '';

  let stockMedicamentos = document.querySelector("#verStock");
  stockMedicamentos.innerHTML = '';


  const container = document.querySelector("#verStock");
  const titulo1 = document.createElement('h2');
  titulo1.textContent = "Benzodiazepinas";
  container.append(titulo1);

  benzodiazepinas.forEach(benzo => {
    const div = document.createElement('div');
    div.classList.add('listaBenzodiazepinas');
    div.innerHTML = `<div class="benzo">
  <h3 class="benzo-nombre">${benzo.nombre}</h3>
  <p class="benzo-dosis"> mg.${benzo.dosis}</p>
  <p class="benzo-stock">En stock: ${benzo.stock}</p>
</div>`;

    const container = document.querySelector("#verStock");
    container.append(div);

  });
  const titulo2 = document.createElement('h2');
  titulo2.textContent = "Antispicóticos";
  container.append(titulo2);
  antipsicoticos.forEach(antipsi => {
    const div = document.createElement('div');
    div.classList.add('listaAntipsicoticos');
    div.innerHTML += `<div class="antipsicoticos">
  <h3 class="psi-nombre">${antipsi.nombre}</h3>
  <p class="psi-dosis"> mg.${antipsi.dosis}</p>
  <p class="psi-stock">En stock: ${antipsi.stock}</p>
</div>`;

    const container = document.querySelector("#verStock");
    container.append(div);

  });

  const titulo3 = document.createElement('h2');
  titulo3.textContent = "Antidepresivos";
  container.append(titulo3);
  antidepresivos.forEach(antidep => {
    const div = document.createElement('div');
    div.classList.add('listaAntidepresivos');
    div.innerHTML += `<div class="antidepresivos">
  <h3 class="antiDep-nombre">${antidep.nombre}</h3>
  <p class="antiDep-dosis"> mg.${antidep.dosis}</p>
  <p class="antiDep-stock">En stock: ${antidep.stock}</p>
</div>`;

    const container = document.querySelector("#verStock");
    container.append(div);

    let iniciarProtocolo = document.querySelector('#clozapina');
    iniciarProtocolo.addEventListener("click", crearFormularioClozapina);


  });

}

function atrás() {

  window.history.go();
}

function iniciarTto() {


  const menuCloza = document.querySelector('#menuCloza');
  menuCloza.innerHTML = "";
  const medEnStock = document.querySelector('#verStock');
  medEnStock.innerHTML = "";
  const iniciarEs = document.querySelector("#iniciarEsquema");
  iniciarEs.innerHTML = '';
  

  let IniciarTratamiento = document.querySelector("#nvoTto");
  IniciarTratamiento.innerHTML = '';


  const pacienteEnLS = localStorage.getItem("Paciente");

  const iniTto = document.querySelector('#nvoTto');
  iniTto.innerHTML = `<h2> Paciente: ${pacienteEnLS}</h2>
  <button type="submit" class="btnTto" id="btnHC"> Ver historia clínica </button>
  <button type="submit" class="btnTto" id="BtnNuevoTto"> Iniciar esquema </button>

  `

  let hc = document.querySelector("#btnHC");
  hc.addEventListener("click", verHistoriaClinica);

  let nuevoTto = document.querySelector("#BtnNuevoTto");
  nuevoTto.addEventListener("click", iniciarEsquema);
}

function iniciarEsquema() {

  const menuCloza = document.querySelector('#menuCloza');
  menuCloza.innerHTML = "";
  const medEnStock = document.querySelector('#verStock');
  medEnStock.innerHTML = "";
  const IniciarTratamiento = document.querySelector("#nvoTto");
  IniciarTratamiento.innerHTML = ''
  

  let iniciarEs = document.querySelector("#iniciarEsquema");
  iniciarEs.innerHTML = '';


  const buscarMedicamento = document.querySelector('#iniciarEsquema');
  buscarMedicamento.innerHTML = `
  <form class="formIniciarEsquema">
  <label for="buscarMed"> Agregar medicación </label>
  <input type="text" id="buscarMed" name="e" required>
  <button type="button" id="agregarMed"> Agregar </button>
  </form>
  `


  const agregarMedicacion = document.querySelector("#agregarMed");
  agregarMedicacion.addEventListener("click", agregarMedicamento);



  function agregarMedicamento() {

    const menuCloza = document.querySelector('#menuCloza');
    menuCloza.innerHTML = "";
    const medEnStock = document.querySelector('#verStock');
    medEnStock.innerHTML = "";
    const IniciarTratamiento = document.querySelector("#nvoTto");
    IniciarTratamiento.innerHTML = '';


    const nombreMedicamento = document.querySelector("#buscarMed").value.toLowerCase();
    const medicamentoEncontrado = medicacionEnStock.find(medicamento => medicamento.nombre == nombreMedicamento && medicamento.stock === "si");


    if (medicamentoEncontrado) {
      console.log(`Dosis disponibles: ${medicamentoEncontrado.dosis.join(", ")}`);
      mostrarDosis();

    } else {
      alert('Medicamento no encontrado o fuera de stock');
    }

    function mostrarDosis() {

      const menuCloza = document.querySelector('#menuCloza');
      menuCloza.innerHTML = "";
      const medEnStock = document.querySelector('#verStock');
      medEnStock.innerHTML = "";
      const IniciarTratamiento = document.querySelector("#nvoTto");
      IniciarTratamiento.innerHTML = '';

    
      let mostrarDosis = document.querySelector('#mostrarDosis');
      mostrarDosis.innerHTML =
        `
      <p> Medicamento: ${medicamentoEncontrado.nombre} </p>
      <p>Dosis disponibles (en mg.): ${medicamentoEncontrado.dosis.join(", ")}</p>
      <div class = "btnDosis" id ="btnDosis">
      <button type="button" class="borrarMed" id="borrar">Borrar </button>
      <button type="button" class="agregarMed" id="agregar"> Agregar </button>        
      </div>
      `

      let borrar = document.querySelector('#borrar');
      borrar.addEventListener('click', borrarMed);
      let agregar = document.querySelector('#agregar');
      agregar.addEventListener('click', agregarMed);

    };



  };

};

function agregarMed (){

}


function borrarMed() {
  let borrar = document.querySelector('#mostrarDosis');
  borrar.innerHTML = '';

}


function verHistoriaClinica() {

}

