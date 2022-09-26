const stock = [];
class Ropa {

    constructor(titulo, descripcion, precio, imagen){
        this.titulo = titulo,
        this.descripcion = descripcion,
        this.precio = precio,
        this.imagen = "./img/default.png"
    }

}

const ropa1 = new Ropa("Remera", "remera blanca de la marca adidas", "250", "./img/default.png");
const ropa2 = new Ropa("Remera Negra", "remera negra de la marca nike para deporte", "1000", "./img/default.png");
const ropa3 = new Ropa("Pantalon", "pantalon jean de clor negro", "8000", "./img/default.png");
const ropa4 = new Ropa("buzo", "buzo de clor negro", "15000", "./img/default.png");

stock.push(ropa1,ropa2,ropa3, ropa4);

let producosStock = document.getElementById("productos");
function agregarProd(array){

    producosStock.innerHTML = "";
    array.forEach((ropa)=>{
        let productoNuevo = document.createElement("div");
        productoNuevo.innerHTML = `<div id="" class="card" style="width: 18rem;">
                                <img src="${ropa.imagen}" class="card-img-top" alt="${ropa.titulo}">
                                <div class="card-body">
                                <h4 class="card-title">${ropa.titulo}</h4>
                                <p class="card-text">${ropa.descripcion}</p>
                                <p class="">Precio: ${ropa.precio} </p>
                                <a href="#" class="btn btn-primary agregarCarrito">Agregar al carrito</a>
                                </div>
        </div>`;
        producosStock.append(productoNuevo);
    })
    let btnAgregarCarrito = document.getElementsByClassName("agregarCarrito");
    for(let compra of btnAgregarCarrito){
        compra.addEventListener("click", ()=>{
            alert("Peoducto Agregado al carrito")
        })
    }
    }



function agregarRopa(array){
let tituloDePrendaAgregada = document.getElementById("tituloPrenda");
let descripcionDePrendaAgregada = document.getElementById("descripcionPrenda");
let precioDePrendaAgregada = document.getElementById("precioPrenda");
let prendaAgregada = new Ropa (tituloDePrendaAgregada.value, descripcionDePrendaAgregada.value, parseInt(precioDePrendaAgregada.value), "./img/default.png");
stock.push(prendaAgregada);
tituloDePrendaAgregada.value = "";
descripcionDePrendaAgregada.value = "";
precioDePrendaAgregada.value = "";
agregarProd(array)
}

let continuarEdicionPrenda = document.getElementById("continuarEdicionPrenda");

continuarEdicionPrenda.addEventListener("click", ()=>{
    agregarRopa(stock)
})
let todo = document.getElementById("todo");
todo.addEventListener("click", ()=>{
    todo.className += " active";
    agregarProd(stock)
})

