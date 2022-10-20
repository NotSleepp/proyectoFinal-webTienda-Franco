let stock = [];
let prodctosAComprar = [];

class Ropa {

    constructor(id, titulo, descripcion, precio, imagen, cantidad){
        this.id = id,
        this.titulo = titulo,
        this.descripcion = descripcion,
        this.precio = precio,
        this.imagen = "./img/default.png",
        this.cantidad =0
    }

}
/*
const ropa1 = new Ropa(1,"Remera", "remera blanca de la marca adidas", "250", "./img/default.png");
const ropa2 = new Ropa(2,"Remera Negra", "remera negra de la marca nike para deporte", "1000", "./img/default.png");
const ropa3 = new Ropa(3,"Pantalon", "pantalon jean de clor negro", "8000", "./img/default.png");
const ropa4 = new Ropa(4,"buzo", "buzo de clor negro", "15000", "./img/default.png");
*/


setTimeout(()=>{agregarProd(stock)},500)

let producosStock = document.getElementById("productos");
function agregarProd(array){
    producosStock.innerHTML = "";
    array.forEach((ropa)=>{
        let productoNuevo = document.createElement("div");
        productoNuevo.innerHTML = `<div id="cuerpoCard${ropa.id}" class="card cardOscuta" style="width: 18rem;">
                                <img src="${ropa.imagen}" class="card-img-top" alt="${ropa.titulo}">
                                <div class="card-body">
                                <h4 class="card-title">${ropa.titulo}</h4>
                                <p class="card-text">${ropa.descripcion}</p>
                                <p class="">Precio: ${ropa.precio} </p>
                                <a id="agregarbtn${ropa.id}" href="#" class="btn btn-dark agregarCarrito">Agregar al carrito</a>
                                </div>
        </div>`;
        producosStock.append(productoNuevo);

        let btnAgregar = document.getElementById(`agregarbtn${ropa.id}`);
        btnAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(ropa);
            Toastify({
                text: `producto: "${ropa.titulo}" se agrego al carrito`,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "#fff",
                  color: "#000",
                },
                onClick: function(){} // Callback after click
              }).showToast();
        });
    })}

    const cantidadCarrito = document.getElementById("cantidadCarrito");

    function agregarAlCarrito(ropa){

        let ropaAgregada = prodctosAComprar.find(function(producto){return producto.id == ropa.id})
    
        if(ropaAgregada == undefined){
        console.log(ropaAgregada);
        prodctosAComprar.push(ropa);
        localStorage.setItem("carrito", JSON.stringify(prodctosAComprar));
        ropa.cantidad++
        cantidadCarrito.innerHTML = `<p>${ropa.cantidad}</p>`
        }else{
            ropa.cantidad++
            cantidadCarrito.innerHTML = `<p>${ropa.cantidad}</p>`
            console.log("Agrergado")
            sumaDeCompra(prodctosAComprar)
        }

    }

    if(localStorage.getItem("carrito")){
        prodctosAComprar = JSON.parse(localStorage.getItem("carrito"));
    }else{
        localStorage.setItem("carrito", JSON.stringify(prodctosAComprar));
    }

    function agregarRopa(array){
        let tituloDePrendaAgregada = document.getElementById("tituloPrenda");
        let descripcionDePrendaAgregada = document.getElementById("descripcionPrenda");
        let precioDePrendaAgregada = document.getElementById("precioPrenda");
        let prendaAgregada = new Ropa (stock.length+1,tituloDePrendaAgregada.value, descripcionDePrendaAgregada.value, parseInt(precioDePrendaAgregada.value), "./img/default.png", 0);
        array.push(prendaAgregada);
        localStorage.setItem("stock", JSON.stringify(array));
        tituloDePrendaAgregada.value = "";
        descripcionDePrendaAgregada.value = "";
        precioDePrendaAgregada.value = "";
    
        agregarProd(array)
        }

        let modalContenido = document.getElementById("modalAgregarProdcutoContenido");

modalContenido.innerHTML += `<div class="m-4 d-flex flex-column">
<form action="" class="d-flex flex-column">
  <div>
    <label class="alinear-imputs" for="tituloPrenda">Titulo:</label>
    <input id="tituloPrenda" class="ingreso__producto" type="text">
  </div>
  <div>
    <label class="alinear-imputs" for="descripcionPrenda">Descripción:</label>
    <textarea name="descripcionPrendaAgregar" id="descripcionPrenda" cols="5" rows="5"></textarea>
  </div>
  <div>
    <label class="alinear-imputs" for="precioPrenda">Precio:</label>
    <input id="precioPrenda" class="ingreso__producto" type="text">
  </div>
</form>

</div>`;

let continuarEdicionPrenda = document.getElementById("continuarEdicionPrenda");

continuarEdicionPrenda.addEventListener("click", ()=>{
    let tituloDePrendavalor = document.getElementById("tituloPrenda");
    let descripcionDePrendavalor = document.getElementById("descripcionPrenda");
    let precioDePrendavalor = document.getElementById("precioPrenda");

    if(tituloDePrendavalor.value == ""|| descripcionDePrendavalor.value == ""||precioDePrendavalor.value == ""){
        Swal.fire({
            icon: 'error',
            title: 'No ingreso bien el producto',
            text: 'Vuelva a intentarlo por favor',
          })
    }else{
    agregarRopa(stock)
    }
})



let btnshop = document.getElementById("btnshop");
let modalBody = document.getElementById("modalBody");
let precioTotal = document.getElementById("precioTotal");
let finalizarCompra = document.getElementById("finalizarCompra");

function agregarPrendasEnCarrito(array){
    modalBody.innerHTML = ""
    
    array.forEach((producto)=>{
        modalBody.innerHTML += `<div id="cardCarrito${producto.id}" class="card cardOscuta" style="width: 18rem;">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
        <div class="card-body">
          <h5 class="card-title">${producto.titulo}</h5>
          <p class="card-text">${producto.descripcion}</p>
          <p class="card-text">${producto.precio}</p>
          <p class="card-text">Cantidad: <span id="cantidadCarrito">${producto.cantidad}</span></p>
          <a id="eliminarDelCarrito${producto.id}" href="#" class="btn btn-primary"><i class="fa-solid fa-trash"></i></a>
        </div>
      </div>`;
      
    
    
     
    /*
      let eliminarDelCarrito = document.getElementById(`eliminarDelCarrito${producto.id}`);
      eliminarDelCarrito.addEventListener("click", ()=>{
        const item = prodctosAComprar.find((producto)=> producto.id === `eliminarDelCarrito${producto.id}`);
        const indice = prodctosAComprar.indexOf(item);
        prodctosAComprar.splice(indice, 1);
        
    })*/
    })
    
    array.forEach((producto,i)=>{
        let eliminarDelCarrito = document.getElementById(`eliminarDelCarrito${producto.id}`);
        eliminarDelCarrito.addEventListener("click",()=>{
            console.log(`el producto que se lemino es ${producto.titulo}`)
            array.splice(i, 1)
            console.log(array)
            localStorage.setItem("carrito", JSON.stringify(array));
            agregarPrendasEnCarrito(array)
        })
    })
 
    sumaDeCompra(array)
}

function sumaDeCompra(array){
    let acumulador=0;
    acumulador = array.reduce((acumulador, prodctosAComprar)=>{ 
        return Number(acumulador) + Number(prodctosAComprar.precio)
    },0)
    if(acumulador == 0){
        precioTotal.innerHTML = `No hay productos en el carrito`
    }else {
        precioTotal.innerHTML = `El total de la compra es ${acumulador}`;
    }
    
}


finalizarCompra.addEventListener("click", ()=>{
    terminarCompra()
})

function terminarCompra(){
    Swal.fire({
        title: '¿Desea comprar todo el carrito?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        confirmButtonColor: '#000',
        cancelButtonColor: 'grey',
      }).then((resultado)=>{
        if(resultado.isConfirmed && prodctosAComprar.length < 1){
            Swal.fire({
                toast: true,
                title: 'No tiene productos en el carrito',
                icon: 'error',
              })
        } if(resultado.isConfirmed && prodctosAComprar.length > 0){
            Swal.fire({
                toast: true,
                title: 'Carrito Comprado',
                icon: 'success',
              })
              prodctosAComprar = [];
              localStorage.removeItem("carrito");
        }
      })
    
}

btnshop.addEventListener("click", ()=>{
    
    agregarPrendasEnCarrito(prodctosAComprar)
    
});





 let cargarProductos= async ()=>{
   const response = await fetch('stock.json');
   const product = await response.json();
   for(let ropa of product){
    let productoNuevo = new Ropa (ropa.id,ropa.titulo,ropa.descripcion,ropa.precio,ropa.imagen,0);
    stock.push(productoNuevo)
    if(localStorage.getItem("stock")){
        stock = JSON.parse(localStorage.getItem("stock"));
    } else {
        localStorage.setItem("stock", JSON.stringify(product))
    }
    
   }
   
}
cargarProductos();


  //Buscador
  //Capturo el formulario para hacer buscador interno

  const buscador = document.getElementById("buscador");
  const btnBuscador = document.getElementById("btnBuscar");
  const paraElBuscador = document.getElementById("paraElBuscador");
  
const filtracion = ()=> {
    producosStock.innerHTML = '';
    paraElBuscador.innerHTML = '';
    let filtro = buscador.value.toLowerCase();
    for(let ropa of stock){
        let titulo = ropa.titulo.toLowerCase();
        if(titulo.indexOf(filtro) !== -1){
            
            paraElBuscador.innerHTML += `<div id="cuerpoCard${ropa.id}" class="card cardOscuta" style="width: 18rem;">
            <img src="${ropa.imagen}" class="card-img-top" alt="${ropa.titulo}">
            <div class="card-body">
            <h4 class="card-title">${ropa.titulo}</h4>
            <p class="card-text">${ropa.descripcion}</p>
            <p class="">Precio: ${ropa.precio} </p>
            <a id="agregarbuscadobtn${ropa.id}" href="#" class="btn btn-dark agregarCarrito">Agregar al carrito</a>
            </div>
</div>`;

        }
    }
    if(paraElBuscador.innerHTML === ''){
        paraElBuscador.innerHTML += `<p class="display-5 ">producto no encontrado</p>` 
    }
    
}

btnBuscador.addEventListener("click", ()=>{
    filtracion();
})

buscador.addEventListener("keyup", filtracion)

