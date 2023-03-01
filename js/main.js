//muestro mis productos en las cards del html
function verCatalogo(arr){
  products.innerHTML=""
    for (let vela of arr){
        let card = document.createElement("article")
        card.className = "col-md-6 col-lg-3 mb-2"
        card.innerHTML =`
                <div class="card">
                    <img src="img/productos/${vela.img}" class="card-img-top w-100" alt="${vela.nombre}">
                    <div class="card-body">
                        <h2 class="card-title">${vela.nombre}</h2>
                        <p class="card-text">${vela.descrition}</p>
                        <p>Valor:<span class="price"> $ ${vela.valor}</span>
                        <div class="row box-plus-minus">
                            <div class="input-group w-50">
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-secondary" type="button" id="button-minus${vela.codigo}">-</button>
                                </div>
                                <input type="text" class="form-control" value="1" id="input-cant${vela.codigo}">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" id="button-plus${vela.codigo}">+</button>
                                </div>
                            </div>
                            <button class="btn w-50 mt-1 btn-add" id="agregarBtn${vela.codigo}"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                                Agregar al carrito 
                            </button>
                        </div>
                    </div>
                </div>
        `
       //se crean las cards 
       products.append(card)
        //capturamos los btn e input para agregar o restar cantidad
        let inputCant = document.getElementById(`input-cant${vela.codigo}`)
        let cant = parseInt(inputCant.value) 
        let subtotal
        document.getElementById(`button-plus${vela.codigo}`).addEventListener("click", ()=>{
            console.log("btn sumar funciona")
            cant = cant +1
            inputCant.value = cant
            console.log(cant)
            subtotal = vela.valor * cant
            console.log(subtotal)
        })
        document.getElementById(`button-minus${vela.codigo}`).addEventListener("click", ()=>{
            console.log("btn restar funciona")
            cant == 0?
            cant == 1 :
            cant = cant -1
            inputCant.value = cant
            console.log(cant)
        })
       //capturo el btn con código de vela
        let btnAdd = document.getElementById(`agregarBtn${vela.codigo}`)
        btnAdd.onclick = ()=>{
            //creamos el objeto para mandarlo al carrito
                const toTrolley = new ObjectTrolley (vela.nombre,inputCant.value,vela.valor, vela.cod)
                miTrolley.push(toTrolley)
                console.log("se muestra el array del carrito")
                console.log(miTrolley)
            //guardo mi array en el local storage
                localStorage.setItem("miTrolley", JSON.stringify(miTrolley))
            //sweet alert mostramos que se agrego al carrito un producto
                Swal.fire({
                    title: "Se ha agregado un producto a su carrito",
                    text:`El producto es ${vela.nombre}, su valor es: ${vela.valor} y el código es:${vela.codigo}, la cantidad es ${cant} y el subtotal es:${vela.valor * cant}`,
                    confirmButtonText:"Aceptar",
                    confirmButtonColor:"#ff0080",
                    timer:3000,
                    imageUrl:`img/productos/${vela.img}`,
                })
        }
    }
}


//// FUNCTIONS ////

//ordenamos los productos de Mayor a menor precio
function ordenarProductosMayor(arr){
    const ordenados = [].concat(arr)
    ordenados.sort((a,b)=> b.valor - a.valor)
    verCatalogo(ordenados)
}

//ordenamos los productos de menor a mayor precio
function ordenarProductosMenor(arr){
    const ordenados = [].concat(arr)
    ordenados.sort((a,b)=> a.valor - b.valor)
    verCatalogo(ordenados)
}

//ordenamos productos por nombre
function ordenarProductosAlf(arr){
    const ordenados = [].concat(arr)
    ordenados.sort((a, b) => {
        if (a.nombre > b.nombre) {
          return 1
        }
        if (a.nombre < b.nombre) {
          return -1
        }
        return 0
      })
      verCatalogo(ordenados)
}

// buscamos productos en nuestro array 
function buscarProd(buscado,arr){
    let busquedaArray = arr.filter(
        (vela) => vela.nombre.toLowerCase().includes(buscado.toLowerCase()) || vela.nombre.toLowerCase().includes(buscado.toLowerCase())
    )
    if(busquedaArray.length == 0){
        mensajes.innerText = `No hay coincidencias con su búsqueda`
        verCatalogo(busquedaArray)
    }else{
        mensajes.innerText = ""
        verCatalogo(busquedaArray)
    }
}

//agregamos productos a nuestro catalogo de velas
function addProduct(arr){
    const nuevoProd = new Producto(arr.length+1, inputName.value, inputDescription.value, inputValor.value,"Cubito_Citrus.jpg")
    console.log(nuevoProd)
    galeriaVelas.push(nuevoProd)
    verCatalogo(arr)
    //guardo en storage 
    localStorage.setItem("galeriaVelas", JSON.stringify(galeriaVelas))
    //sweet alert mostramos que se agrego un producto
    Swal.fire({
        title: "Se ha agregado un producto a su catalogo",
        confirmButtonText:"Aceptar",
        timer:3000,
    })
}

//vemos el carrito 
function verCarrito(arr){
    bodyCarrito.innerHTML=""
    for (let vela of miTrolley){
        let bodyTrolle = document.createElement("article")
        bodyTrolle.className="ms-2"
        bodyTrolle.innerHTML=`
        <div class="d-flex align-items-center justify-content-between">
            <div>
                <h5>Prodcuto: ${vela.prod}</h5>
                <p>Valor por unidad: $ ${vela.valor}</p>
                <p>Cantidad: ${vela.cant}</p>
                <p><strong>Subtotal:</strong>${vela.valor * vela.cant}</p>
            </div>
            <button type="button" class="btn btn-outline-primary" id="btnRemoveItem" onclick="removeProd(miTrolley)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button>
        </div>
        <hr>
        `
        bodyCarrito.append(bodyTrolle)
    }
        //sumamos el total del carrito
        const totalCarrito = miTrolley.reduce((acc, vela)=> acc + (vela.valor * vela.cant) ,0)
        //ternario 
        totalCarrito == 0 ?
        sumaTotalCarrito.innerHTML=`No hay productos agregados` :
        sumaTotalCarrito.innerHTML=`<p class="ms-4">El total de su compra es: $ <strong>${totalCarrito}</strong></p>`
        totalAbonarFin.innerHTML=`
        <div class="bg-light p-2 mt-3">
            <p class="ms-2 fs-5 mt-4 text-pink">El total de su compra es: $ <strong>${totalCarrito}</strong></p>
        </div>
        `
        //return totalCarrito
        console.log(totalCarrito)
        console.log(miTrolley)
}
    

//limpiar carrito
function removeTrolley(arr){
    console.log("limpiamos carrito")
    let miTrolley = []
    localStorage.removeItem("miTrolley")
    localStorage.setItem("miTrolley", JSON.stringify(miTrolley))
    //refresh de pantalla para que limpie el storage
    location.reload()
}

//eliminamos producto de nuestro array
function removeProd(miTrolley){
    console.log("queremos borrar un elemento del carrito")
    //busco prod a eliminar
    let productoEliminar = miTrolley.find(vela=> vela.cod == miTrolley.id)
    console.log(productoEliminar)
    //busco indice
    let posicion = miTrolley.indexOf(productoEliminar)
    //borro producto
    miTrolley.splice(posicion,1)
    localStorage.setItem("miTrolley", JSON.stringify(miTrolley))
    //refresh de pantalla para que limpie el storage
    location.reload()
}

//loading
function mostrarLoading() {
    loading.classList.add('show');
}
  
function ocultarLoading() {
    loading.classList.remove('show');
}

function cargarContenido() {
    console.log("cargando")
    mostrarLoading();
    setTimeout(function() {
      // Aquí cargo el catalogo de velas
      verCatalogo(galeriaVelas)
      ocultarLoading();
    }, 2000);
}
// ends functions

///// EVENTOS ////

//select para ordenar
sort.addEventListener("change", ()=>{
    if(sort.value == "1"){
        console.log("quiere order de mayor a menor")
        ordenarProductosMayor(galeriaVelas)
    }else if(sort.value =="2"){
        console.log("quiere orden de menor a mayor")
        ordenarProductosMenor(galeriaVelas)
    }else if(sort.value == "3"){
        console.log("quiere orden alf")
        ordenarProductosAlf(galeriaVelas)
    }
})

//input search
inputSearch.addEventListener("input", ()=>{
    buscarProd(inputSearch.value, galeriaVelas)
})

//btn buscar
btnBuscar.addEventListener("click",()=>{
    buscarProd(inputSearch.value, galeriaVelas)
})

//btn agregar velas al catalogo
btnSave.addEventListener("click",()=>{
    addProduct(galeriaVelas)
})

//btn ver carrito
btnVerCarrito.addEventListener("click",()=>{
    verCarrito(miTrolley)
})

//btn limpiar carrito
btnCleanTrolley.addEventListener("click",()=>{
    removeTrolley(miTrolley)
})

//btn para confirmar y finalizar la compra
btnConfirm.addEventListener("click",()=>{
    console.log("va a terminar la compra")
})

//btn gracias por su compra
btnGracias.addEventListener("click",()=>{
   alert("va a finalizar la compra y se va a vaciar el carrito")
    removeTrolley(miTrolley)
    console.log("fin")
})

//llama al loading
window.addEventListener("load", cargarContenido);
// ends eventos
