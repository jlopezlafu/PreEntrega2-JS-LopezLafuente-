let producto = parseInt(
  prompt(
    "Escoge el producto que deseas comprar: 1.camiseta - 2.short - 3.pantalon - 4.buzo"
  )
);
let seguirComprando = true;
let totalCompra = 0;
let decision;
// arreglo de productos
const productosArray = []
/* clases */
class NewProduct {
  constructor(id, name, price, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
}
const camiseta = new NewProduct(1, "camiseta", 9000, 50);
productosArray.push(camiseta);
const short = new NewProduct(2, "short", 4000, 40);
productosArray.push(short);
const pantalon = new NewProduct(3, "pantalon", 4500, 20);
productosArray.push(pantalon);
const buzo = new NewProduct(4, "buzo", 5700, 32);
productosArray.push(buzo);

console.log(productosArray)
/* Ciclos */
while (seguirComprando === true) {
  totalCompra = totalCompra + productosArray[producto - 1].price

  decision = parseInt(prompt("Queres añadir algo mas a tu carrito? 1.Si - 2.No"));
  if (decision === 1) {
    producto = parseInt(
      prompt(
        "Escoge el producto que deseas Agregar: 1.camiseta - 2.short - 3.pantalon - 4.buzo"
      )
    );
  } else {
    seguirComprando = false;
  }
}

const totalCompraConDescuento = descuento(totalCompra);
alert(`El total de tu carrito es ${totalCompraConDescuento}`);


/* Funciones */
function descuento(valor) {
  let descuento = 0;
  if (valor <= 10000) {
    descuento = 5;
  } else if (valor > 10000 && valor <= 15000) {
    descuento = 10;
  }
  else if (valor > 15000 && valor <= 20000) {
    descuento = 15;
  }
  else {
    descuento = 20;
  }

  let valorDescuento = valor * (descuento / 100);
  let valorFinal = valor - valorDescuento;
  return valorFinal;
}