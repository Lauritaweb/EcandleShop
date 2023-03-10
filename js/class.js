//clase constructora para los productos
class Producto {
    constructor(codigo, nombre, descrition, valor, img){
        //atributos 
        this.codigo = codigo
        this.nombre = nombre
        this.descrition = descrition
        this.valor = valor
        this.img = img
    } 
}

//definimos los objetos como constantes
// const prod1 = new Producto(01,"Tin Lima","Vela aromatica de cera vegetal en envase metalico esmaltado",2790,"Tin_Lima.jpg")
// const prod2 = new Producto(02,"Max Citrus", "Vela de cera vegetal en envase de vidrio de 12 cm de diametro y 12 cm de alto",7100, "Max_Citrus.jpg")
// const prod3 = new Producto(03,"Glow Silver XL","Vela aromatica de cera vegetal en vaso de vidrio de 12 cm de diametro y 12 cm de alto",5900,"Glow_Silver_XL.jpg")
// const prod4 = new Producto(04,"Vela Queen II Black Vetiver","Vela de cera vegetal en vaso de vidrio con campana protectora de 9 cm de diametro y 12 cm de alto",5000,"Vela_Queen_II.jpg")
// const prod5 = new Producto(05,"Sandia Pepino 10 X 10","Vela de 10 cm de diametro y 10 cm de alto",3450,"Sandia_Pepino_10X10.jpg")
// const prod6 = new Producto(06,"Cubito Citrus","Vela cubo de 5,5 cm de lado y 5,5 cm de alto", 850, "Cubito_Citrus.jpg")
// const prod7 = new Producto (07,"Vela Tin Pepino","Es una fragancia unisex, cítrica, fresca y limpia. Ideal para los ambientes cálidos veraniegos en espacios abiertos y relajados.",2500,"Tin_Pepino.jpg")
// const prod8 = new Producto (08,"Tin Canela", "Las fragancias orientales tienen gran intensidad y residualidad a lo largo de las horas. Son invasivas, abarcativas y la persona que las use nunca pasará inadvertida.",1020,"Tin_Canela.jpg")

//Mi array para los productos, lleno el array con los objetos ya creados
let galeriaVelas = []

const loadGaleriaVelas = async()=>{
    const response = await fetch(`js/velas.json`)
    const data = await response.json()
    for (let vela of data){
        let productoNuevo = new Producto(vela.codigo, vela.nombre, vela.descrition,vela.valor,vela.img)
        galeriaVelas.push(productoNuevo)
    }
    console.log(galeriaVelas)
    localStorage.setItem("galeriaVelas",JSON.stringify(galeriaVelas))
}

//condicional que evalua si hay algo en storage
if(localStorage.getItem("galeriaVelas")){
    for (let vela of JSON.parse(localStorage.getItem("galeriaVelas"))){
        let velasStorage = new Producto (vela.codigo, vela.nombre, vela.descrition,vela.valor,vela.img)
        galeriaVelas.push(velasStorage)
    }
    console.log(galeriaVelas)
}else{
    console.log("Seteamos por primera vez, entra sólo en la primera vez")
    loadGaleriaVelas()
}

// class constructora para el carrito

//clase constructora de los objetos del carrito
class ObjectTrolley{
    constructor (prod, cant, valor, cod){
        this.prod= prod;
        this.cant = cant;
        this.valor=valor;
        this.cod = cod;
    }
}

//array carrito inicia vacio
let miTrolley = []
//condicional que evalue si hay algo en storage
if(localStorage.getItem("miTrolley")){
    //si existe algo en el storage lo carga
    miTrolley = JSON.parse(localStorage.getItem("miTrolley"))
}else{
    //guardo mi array en el local storage
    localStorage.setItem("miTrolley", JSON.stringify(miTrolley))
}

