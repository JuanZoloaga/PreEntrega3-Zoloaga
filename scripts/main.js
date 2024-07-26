//Crear carrito vacío
let carritoTotal = [];




//generar un carrito vacío como primera vez y guardar en Local Storage
const pasarLSCarritoaJSON = localStorage.getItem("carrito")
if(pasarLSCarritoaJSON == null){
    const hacerJSONCarrito = JSON.stringify(carritoTotal)
    localStorage.setItem("carrito",hacerJSONCarrito)
}



//mostrar en HTML el carrito
const contenedorCarrito = document.querySelector(".contenedor-productos-carrito")
const rowProducto = document.querySelector('.row-product')
const informacionCarrito = document.querySelector('.productos-carrito')
const valorTotal = document.querySelector(".total")
const contarProductos = document.querySelector('#contador-productos')

const mostrarHTML = () => {

    const pasarLSCarritoaJSON = localStorage.getItem("carrito")
    const pasarJSONCarritoaVarible = JSON.parse(pasarLSCarritoaJSON)

    let totalPagar= 0;
    
    let totalItemCarrito = 0;

    rowProducto.innerHTML=''

        
        //si no tiene nada el carrito muestra que no tiene nada
        if(!pasarJSONCarritoaVarible.length){
            contenedorCarrito.innerHTML=`
            <p>El carrito está vacío</p>
            `
        }else{

  

    
        //mostrar carrito por cada objeto del array "carrito parseado"
        pasarJSONCarritoaVarible.forEach( product => {
            const containerProducts = document.createElement("div")
            containerProducts.classList.add("productos-carrito")
    
            containerProducts.innerHTML = `       
                <div class="productos-carrito">
                    <div class="informacion-productos-carrito">
                        <span class="cantidad-producto-carrito">${product.cantidad}</span>
                        <p class="nombre-producto-carrito">${product.nombre}</p>
                        <span class="precio-producto-carrito">${product.precio}</span>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon-close" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                    </div>
                    `
    
            rowProducto.append(containerProducts)
    
            totalPagar = totalPagar + parseInt(product.precio.slice(1)) * parseInt(product.cantidad)
            totalItemCarrito = totalItemCarrito + product.cantidad
        })
    
        valorTotal.innerText = `$${totalPagar}`;
        contarProductos.innerText = totalItemCarrito;

    }
    }

mostrarHTML()


//funcionalidad que abra y cierre el carrito al seleccionar el icono "cart"
const botonAperturaCarrito = document.querySelector(".carrito-icono")


botonAperturaCarrito.addEventListener("click", () => {
    contenedorCarrito.classList.toggle('carrito-escondido')
    mostrarHTML()
})





//borrar producto en carrito
const carritoInfo = document.querySelector('.carrito')
carritoInfo.addEventListener('click' , s => {

    if(s.target.classList.contains('icon-close')){
        const eliminarProd = s.target.parentElement

        let seleccionProductoaEliminar = {
            nombre: eliminarProd.querySelector('p').textContent,
        };

        const pasarLSCarritoaJSON = localStorage.getItem("carrito")
        const pasarJSONCarritoaVarible = JSON.parse(pasarLSCarritoaJSON)

        const actualizarProductos = pasarJSONCarritoaVarible.filter((producto) => producto.nombre != seleccionProductoaEliminar.nombre)
        carritoTotal = [...actualizarProductos]
        const pasarCarritoTotalaJSON = JSON.stringify(carritoTotal)
        const pasarJSONCarritoaLS = localStorage.setItem("carrito",pasarCarritoTotalaJSON)
        mostrarHTML()
        
        }
})

//seleccionar producto y sumarlo al carrito
const productslist = document.querySelector('.productosavender')
productslist.addEventListener('click' , s => {

    if(s.target.classList.contains('seleccionarProducto')){
        const producto = s.target.parentElement

        let seleccionProducto = {
            nombre: producto.querySelector('h5').textContent,
            precio: producto.querySelector('h6').textContent,
            cantidad: parseInt(producto.querySelector('input').value),
        };

        const pasarLSCarritoaJSON = localStorage.getItem("carrito")
        const pasarJSONCarritoaVarible = JSON.parse(pasarLSCarritoaJSON)

        //si tiene producto en el carrito, sumarlo
        const buscarProducto = pasarJSONCarritoaVarible.some(producto => producto.nombre === seleccionProducto.nombre)
        if(buscarProducto){
            const actualizarProductos = pasarJSONCarritoaVarible.map(producto => {
                if(producto.nombre === seleccionProducto.nombre){
                    producto.cantidad = producto.cantidad + seleccionProducto.cantidad
                    return producto

                } else{
                    return producto
                }


            })
            carritoTotal = [...actualizarProductos]
            const pasarCarritoTotalaJSON = JSON.stringify(carritoTotal)
            const pasarJSONCarritoaLS = localStorage.setItem("carrito",pasarCarritoTotalaJSON)
            mostrarHTML()

        //si no lo tiene, agregar la línea nueva
        }else{
            carritoTotal = [...pasarJSONCarritoaVarible, seleccionProducto]
            const pasarCarritoTotalaJSON = JSON.stringify(carritoTotal)
            const pasarJSONCarritoaLS = localStorage.setItem("carrito",pasarCarritoTotalaJSON)
            mostrarHTML()

        }

        mostrarHTML()
    }

    mostrarHTML()
})


