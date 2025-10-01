

let baseDatos = [];
fetch ("./json/usuarios.json")
.then(response => response.json())
.then(data => {
  baseDatos = data;
});




//////////////////////// INICIO DE SESION//////////////////////////


const form = document.querySelector("#formulario");
const iniciaUsuario = document.querySelector("#user");
const iniciaPass = document.querySelector("#password");
const iniciarSesion = document.querySelector("btnLogin");

let puedeContinuar = true;
let intentosFallidos = 0;


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const usuarioValido = document.querySelector("#user").value;
    const contraseniaValida = document.querySelector("#password").value;
    const usuarioEncontrado = baseDatos.find((ingreso) => ingreso.usuario === usuarioValido);
    const contraseñaEncontrada = baseDatos.find((ingreso) => ingreso.contraseña === contraseniaValida);


    while (intentosFallidos < 3) {
        
        if (usuarioEncontrado && contraseñaEncontrada) {
            puedeContinuar = true;
            break;
        } else {
            puedeContinuar = false;
            intentosFallidos++;
            Swal.fire("Usuario o contraseña incorrecta.");
            return;
        }
    }

    if (puedeContinuar && intentosFallidos < 3) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Bienvenido/a",
        showConfirmButton: false,
        timer: 1100,
      })
        localStorage.setItem ("usuario-ingresado", JSON.stringify (usuarioEncontrado));
        setTimeout (redirigir, 1200);

    } else {
        Swal.fire({
          icon: "error",
          title: "Usuario bloqueado.",
          text: "Dirigirse a Administracion.",
        });
    }

function redirigir (){
  window.location.pathname = './javascriptCoderhouse/html/historiaClinica.html';
}
     
});


  





