document.addEventListener("DOMContentLoaded", () => {
  //Definir Array de Cartas, deben estar repetidas para que existan las parejas
  const ArrayCartasOriginal = [
    {
      nombre: "Vscode",
      img: "assets/VSCarta.png",
    },
    {
      nombre: "Vscode",
      img: "assets/VSCarta.png",
    },
    {
      nombre: "Atom",
      img: "assets/AtomCarta.png",
    },
    {
      nombre: "Atom",
      img: "assets/AtomCarta.png",
    },
    {
      nombre: "SublimeText",
      img: "assets/SublimeCarta.png",
    },
    {
      nombre: "SublimeText",
      img: "assets/SublimeCarta.png",
    },

    {
      nombre: "Vim",
      img: "assets/VimCarta.png",
    },
    {
      nombre: "Vim",
      img: "assets/VimCarta.png",
    },
    {
      nombre: "NotePad",
      img: "assets/NotePadCarta.png",
    },
    {
      nombre: "NotePad",
      img: "assets/NotePadCarta.png",
    },
    {
      nombre: "Brackets",
      img: "assets/BracketsCarta.png",
    },
    {
      nombre: "Brackets",
      img: "assets/BracketsCarta.png",
    },
  ];

  // Randomizador de posicion para las Cartas.
  const ArrayCartas = ArrayCartasOriginal.sort((a, b) => 0.5 - Math.random());

  console.log(ArrayCartas);

  const contenedor = document.querySelector(".tablero");
  var CartasVolteadas = []; //array con las cartas seleccionadas
  var idCartasVolteadas = []; // array de Id de cartas que hemos cliclado, necesario para luego comprobar si [0] = a [1]
  var parejas = [];
  var campoPuntuacion = document.querySelector("#puntos");

  //Mostrar las Cartas en pantalla (Por la parte del Dorso)
  function mostrarCartas() {
    for (let i = 0; i < ArrayCartas.length; i++) {
      var carta = document.createElement("img"); // creamos la carta como una img
      carta.setAttribute("src", "./assets/DorsoCarta.png"); // la src es el dorso de las cartas
      carta.setAttribute("data-id", i); // atributo id
      carta.setAttribute("class", "carta");
      carta.addEventListener("click", voltearCarta);
      contenedor.appendChild(carta); //Colocamos la Carta en el Container
    }
  }

  // Comprobar aciertos
  function comprobarPareja() {
    var cartas = document.querySelectorAll("img"); // seleccionar todas las img de Cartas
    const primeraCarta = idCartasVolteadas[0];
    const segundaCarta = idCartasVolteadas[1];

    if (CartasVolteadas[0] == CartasVolteadas[1]) {

      mensajeAcierto(primeraCarta);
      cartas[primeraCarta].setAttribute("src", "assets/Blanco.png");
      cartas[segundaCarta].setAttribute("src", "assets/Blanco.png");

      console.log(p);
      parejas.push(parseInt(primeraCarta));
      parejas.push(parseInt(segundaCarta)); //añadir cartas emparejadas a un array para mantener el conteo
      console.log("Parejas Encontradas: " + parejas.length);
      console.log("Id de Parejas Encontradas: " + parejas);
      idCartasVolteadas = []

    }
    else {
      cartas[primeraCarta].setAttribute("src", "assets/DorsoCarta.png");
      cartas[segundaCarta].setAttribute("src", "assets/DorsoCarta.png");
      idCartasVolteadas = []
      mensajeFallo();
    }

    // limpiar Array de Cartas seleccionadas 
    CartasVolteadas = [];

    campoPuntuacion.textContent = parejas.length;

    console.log(
      "Cartas Seleccionadas: ",
      CartasVolteadas,
      " idCartas Seleccionadas: ",
      idCartasVolteadas
    );

    // Condicion de Victoria
    if (parejas.length == ArrayCartas.length / 2) {
      mensajeVictoria();
    }
  }

  // Voltear Carta
  function voltearCarta() {
    console.log(
      "Cartas Seleccionadas: ",
      CartasVolteadas,
      " idCartas Seleccionadas: ",
      idCartasVolteadas,
      " Id de Parejas Acertadas: " + parejas
    );

    var idCarta = this.getAttribute("data-id");
    console.log("id de la Carta: " + idCarta);
    console.log("indexof Cartas Seleccionadas: " + idCartasVolteadas.indexOf(idCarta));
    console.log("indexof Parejas Acertadas: " + parejas.indexOf(idCarta));
    if (idCartasVolteadas.indexOf(idCarta) != -1 || parejas.indexOf(idCarta) == 1) {

    } else {
      CartasVolteadas.push(ArrayCartas[idCarta].nombre);
      idCartasVolteadas.push(idCarta);

      //Cambiar la imagen de la carta seleccionada
      this.setAttribute("src", ArrayCartas[idCarta].img);

      // Comprobar si las 2 cartas coinciden, llamando a la funcion
      if (CartasVolteadas.length == 2) {
        setTimeout(comprobarPareja, 500);
        //añadir un bloqueo a los clicks durante el tiempo de ejecuccion de la funcion para que no se levanten mas de 2 cartas mientras se comprueba.
      }

    }


  }

  // inicializar funcion
  mostrarCartas();
});

function mensajeAcierto() {
  var popup = document.getElementById("myPopup");
  document.getElementById("myPopup").innerHTML = "Acierto +1pts";
  popup.classList.toggle("show");
}

function mensajeFallo() {
  var popup = document.getElementById("myPopup");
  document.getElementById("myPopup").innerHTML =
    "Fallaste, vuelve a intentarlo";
  popup.classList.toggle("show");
}

function mensajeVictoria() {
  var popup = document.getElementById("myPopup");
  document.getElementById("myPopup").innerHTML =
    "Felicidades, has descubierto todas las parejas";
  popup.classList.toggle("show");
}