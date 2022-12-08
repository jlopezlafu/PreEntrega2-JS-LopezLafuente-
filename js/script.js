
let carrito = [];
const divisa = 'Pesos';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonComprar = document.querySelector('#boton-comprar');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const miLocalStorage = window.localStorage;


function renderizarProductos() {
  productos.forEach((producto) => {
    const miNodo = document.createElement('div');
    miNodo.classList.add('card', 'col-sm-3');
    const miNodoCardBody = document.createElement('div');
    miNodoCardBody.classList.add('card-body');
    const miNodoTitle = document.createElement('h5');
    miNodoTitle.classList.add('card-title');
    miNodoTitle.textContent = producto.name;
    const miNodoImagen = document.createElement('img');
    miNodoImagen.classList.add('img-fluid');
    miNodoImagen.setAttribute('src', producto.foto);
    const miNodoPrecio = document.createElement('p');
    miNodoPrecio.classList.add('card-text');
    miNodoPrecio.textContent = `${producto.price}${divisa}`;
    const miNodoBoton = document.createElement('button');
    miNodoBoton.classList.add('btn', 'btn-primary');
    miNodoBoton.textContent = 'Comprar';
    miNodoBoton.setAttribute('marcador', producto.id);
    miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
    miNodoCardBody.appendChild(miNodoImagen);
    miNodoCardBody.appendChild(miNodoTitle);
    miNodoCardBody.appendChild(miNodoPrecio);
    miNodoCardBody.appendChild(miNodoBoton);
    miNodo.appendChild(miNodoCardBody);
    DOMitems.appendChild(miNodo);
  });
}

function anyadirProductoAlCarrito(evento) {
  carrito.push(evento.target.getAttribute('marcador'))
  renderizarCarrito();
  guardarCarritoEnLocalStorage();
}

function renderizarCarrito() {
  DOMcarrito.textContent = '';
  const carritoSinDuplicados = [...new Set(carrito)];
  carritoSinDuplicados.forEach((item) => {
    const miItem = productos.filter((productos) => {
      return productos.id === parseInt(item);
    });
    const numeroUnidadesItem = carrito.reduce((total, itemId) => {
      return itemId === item ? total += 1 : total;
    }, 0);
    const miNodo = document.createElement('li');
    miNodo.classList.add('list-group-item', 'text-right', 'mx-4');
    miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].name} - ${miItem[0].price}${divisa}`;
    const miBoton = document.createElement('button');
    miBoton.classList.add('btn', 'btn-danger', 'mx-5');
    miBoton.textContent = 'X';
    miBoton.style.marginLeft = '1rem';
    miBoton.dataset.item = item;
    miBoton.addEventListener('click', borrarItemCarrito);
    miNodo.appendChild(miBoton);
    DOMcarrito.appendChild(miNodo);
  });
  DOMtotal.textContent = calcularTotal();
}

function borrarItemCarrito(evento) {
  const id = evento.target.dataset.item;
  carrito = carrito.filter((carritoId) => {
    return carritoId !== id;
  });
  renderizarCarrito();
  guardarCarritoEnLocalStorage();
}

function calcularTotal() {
  return carrito.reduce((total, item) => {
    const miItem = productos.filter((itemproductos) => {
      return itemproductos.id === parseInt(item);
    });
    return total + miItem[0].price;
  }, 0).toFixed(2);
}

function vaciarCarrito() {
  carrito = [];
  renderizarCarrito();
  localStorage.clear();
}

function guardarCarritoEnLocalStorage() {
  miLocalStorage.setItem('carrito', JSON.stringify(carrito));
}
function cargarCarritoDeLocalStorage() {
  if (miLocalStorage.getItem('carrito') !== null) {
    carrito = JSON.parse(miLocalStorage.getItem('carrito'));
  }
}
DOMbotonVaciar.addEventListener('click', vaciarCarrito);
DOMbotonVaciar.addEventListener('click', () => {
  swal("Carrito vacio");
})

DOMbotonComprar.addEventListener('click', () => {
  swal({
    title: "Compra aprobada",
    text: "Tu producto llegará en breve",
    icon: "success",
    button: "Continuar navegando",
  });
})

cargarCarritoDeLocalStorage();
renderizarProductos();
renderizarCarrito();
