//VARIABLES GENERALES

//variable para agregar productos al HTML con fetch desde productos.json
const seccionAVender = document.getElementById("productosavender");

//variables para generar un carrito vacío en el LOCAL-STORAGE
let carritoTotal = [];
const carritoEnLocalStorage = localStorage.getItem("carrito")

//variables para actualizar carrito
const itemsCarrito = document.querySelector(".contenedor-productos-carrito")
const lineaProductoCarrito = document.querySelector('.listadoProductos')
const contarProductos = document.querySelector('#contador-productos')


//variable para abrir y cerrar carrito
const botonAperturaCarrito = document.querySelector(".carrito-icono")

//variable para eliminar productos del carrito
const carritoInfo = document.querySelector('.carrito')

//variable para seleccionar un producto y enviarlo al carrito
const productslist = document.querySelector('.productosavender')







//generar un carrito vacío como primera vez y guardar en Local Storage
carritoEnLocalStorage == null ? localStorage.setItem("carrito", JSON.stringify(carritoTotal)):"";

//funcionalidad de que tome los datos del localstorage, los paresee y luego los muestre en el carrito
const mostrarHTML = () => {

    transformarJSONdeCarritoaArray = JSON.parse(localStorage.getItem("carrito"))

    let totalPagar= 0;
    
    let totalItemCarrito = 0;

    itemsCarrito.innerHTML=''
        
        //si no tiene ningún producto, no muestra nada
        if(!transformarJSONdeCarritoaArray.length){
            itemsCarrito.innerHTML=`
            <div class="listadoProductos">
            <p class"carritovacio">El carrito está vacío</p>
            </div>
            `
            contarProductos.innerText = totalItemCarrito;


        }else{ //mostrar carrito por cada objeto del array "carrito parseado"



            transformarJSONdeCarritoaArray.forEach( product => {
            let containerProducts = document.createElement("div")
            containerProducts.classList.add("productos-carrito")
    
            containerProducts.innerHTML = `       
                    <div class="informacion-productos-carrito">
                        <span class="cantidad-producto-carrito">${product.cantidad}</span>
                        <p class="nombre-producto-carrito">${product.nombre}</p>
                        <span class="precio-producto-carrito">${product.precio}</span>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon-close" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                    </div>
                    `
    
                    itemsCarrito.append(containerProducts)
    
            totalPagar = totalPagar + parseInt(product.precio.slice(1)) * parseInt(product.cantidad)
            totalItemCarrito = totalItemCarrito + product.cantidad



        })

        let totalCarrito = document.createElement("div")
        totalCarrito.classList.add("total-cart")
        totalCarrito.innerHTML= `
                        <h3>Total</h3>
                        <span class="total">0</span>
                        `
        itemsCarrito.append(totalCarrito)

        valorTotal = document.querySelector('.total')

        //agregamos el precio a pagar total en el carrito
        valorTotal.innerText = `$${totalPagar}`;
        //agregamos info al contador de productos
        contarProductos.innerText = totalItemCarrito;

    }
}

mostrarHTML()



//mostrar productos en página productos
fetch('../scripts/productos.json')
    .then((response) => response.json())
    .then((datosProductos) => {
        datosProductos.forEach((producto) => {
            const div = document.createElement('div');

            div.innerHTML= `
            <div class="card" style="width: 26rem; height:44.5rem">
                <img src="${producto.img}" class="card-img-top" alt="producto">
                <div class="card-body">
                    <h5 class="nombreProducto">${producto.nombre}</h5>
                    <h6 class="precioProducto">${producto.precio}</h6>
                    <p class="infoProducto">${producto.infoProducto}</p>
                <div class="col-5">
                    <div class="form-group js-quantity form-quantity">
                    <div class="cantidad" data-component="product.quantity">
                    <span class="js-quantity-down form-quantity-icon btn" data-component="product.quantity.minus">
                    <svg class="icon-inline icon-w-12 icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M368 224H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h352c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path></svg>
                    </span>
                    <div class="form-control-container col" data-component="product.adding-amount">
                    <input type="number" id="cantidadProducto" class=" form-control js-quantity-input form-control-inline" autocorrect="off" autocapitalize="off" name="quantity" value="1" min="1" aria-label="Cambiar cantidad" data-component="adding-amount.value">
                    </div>
                    <span class="js-quantity-up form-quantity-icon btn" data-component="product.quantity.plus">
                    <svg class="icon-inline icon-w-12 icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path></svg>
                    </span>
                    </div>
                    </div>
                </div>
                <button type="button" class="seleccionarProducto">Agregar al carrito</button>
            </div>
            </div>
            `
            seccionAVender.appendChild(div);
        })
    })





//funcionalidad que abra y cierre el carrito al seleccionar el icono "cart"
botonAperturaCarrito.addEventListener("click", () => {
    itemsCarrito.classList.toggle('carrito-escondido')
})


//borrar producto en carrito
carritoInfo.addEventListener('click' , s => {

    
    if(s.target.classList.contains('icon-close')){
        eliminarProd = s.target.parentElement

        let seleccionProductoaEliminar = {
            nombre: eliminarProd.querySelector('p').textContent,
        };

        transformarJSONdeCarritoaArray = JSON.parse(localStorage.getItem("carrito"))

        actualizarProductos = transformarJSONdeCarritoaArray.filter((producto) => producto.nombre != seleccionProductoaEliminar.nombre)
        carritoTotal = [...actualizarProductos]
        localStorage.setItem("carrito", JSON.stringify(carritoTotal))


        Toastify({
            text: "has eliminado un producto",
            duration: 1500,
            className: "alert",
            style: {
                background: "linear-gradient(to right, #CC6600, #CC6600)",
              },
    
        }).showToast();

        }
    mostrarHTML()

})


//seleccionar producto y sumarlo al carrito
productslist.addEventListener('click' , s => {

    if(s.target.classList.contains('seleccionarProducto')){
        producto = s.target.parentElement

        let seleccionProducto = {
            nombre: producto.querySelector('h5').textContent,
            precio: producto.querySelector('h6').textContent,
            cantidad: parseInt(producto.querySelector('#cantidadProducto').value),
        };
        
        transformarJSONdeCarritoaArray = JSON.parse(localStorage.getItem("carrito"))


        //si el producto seleccionado ya está en el carrito, sumarlo a la cantidad
        const buscarProducto = transformarJSONdeCarritoaArray.some(producto => producto.nombre === seleccionProducto.nombre)
        if(buscarProducto){
            actualizarProductos = transformarJSONdeCarritoaArray.map(producto => {
                if(producto.nombre === seleccionProducto.nombre){
                    producto.cantidad = producto.cantidad + seleccionProducto.cantidad
                    return producto

                } else{
                    return producto
                }


            })
            carritoTotal = [...actualizarProductos]
            localStorage.setItem("carrito", JSON.stringify(carritoTotal))

        //si no lo tiene, agregar la línea nueva
        }else{
            carritoTotal = [...transformarJSONdeCarritoaArray, seleccionProducto]
            localStorage.setItem("carrito", JSON.stringify(carritoTotal))

        }

    }
mostrarHTML()
})

setTimeout(() => {
    Swal.fire({
        title: 'Bienvenido a nuestro emprendimiento!',
        icon: 'info',
        confirmButtonText: 'Continuar'
      })
}, 2000);