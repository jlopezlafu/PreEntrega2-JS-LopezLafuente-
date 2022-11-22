const carrito = [];
let totalCarrito;
let contenedor = document.getElementById("misprods");


function renderizarProds() {
  for (const producto of productos) {
    contenedor.innerHTML += `
            <div class="card col-sm-2">
                <img src=${producto.foto} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.name}</h5>
                    <p class="card-text">$ ${producto.price}</p>
                    <button id="btn${producto.id}" class="btn btn-primary">Añadir al Carrito </button>
                </div>
            </div>
        `;
  }

  //EVENTOS
  productos.forEach(producto => {
    //evento para cada boton
    document.getElementById(`btn${producto.id}`).addEventListener("click", function () {
      agregarAlCarrito(producto);
    });
  })
}

renderizarProds();

/* Funciones */
function agregarAlCarrito(productoComprado) {
  carrito.push(productoComprado);
  console.table(carrito);
  alert("Producto: " + productoComprado.name + " agregado al carrito!");
  document.getElementById("tablabody").innerHTML += `
        <tr>
            <td>${productoComprado.name}</td>
            <td>${productoComprado.price}</td>
        </tr>
    `;

  totalCarrito = carrito.reduce((acumulador, producto) => acumulador + producto.price, 0);
  let infoTotal = document.getElementById("total");
  infoTotal.innerText = "Total a pagar $: " + totalCarrito;
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

const infoStorage = localStorage.getItem('carrito')
console.log('carrito', infoStorage)

/* me falta crear la funcion solo deje el evento */

const btnVaciar = document.getElementById("vaciar")
btnVaciar.addEventListener('click', function () {
}
);


const btnFinalizar = document.getElementById("finalizar")
btnFinalizar.addEventListener('click', function () {
}
);