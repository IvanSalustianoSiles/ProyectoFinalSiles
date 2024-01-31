import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import Swal from 'sweetalert2';
let intentar = `Por favor, inténtelo de nuevo.`;
let ok = document.querySelector("#ok-button");
let ok2 = document.querySelector("#ok2");
let ok3 = document.querySelector("#ok3");
let article1 = document.querySelector("#article-1");
let article2 = document.querySelector("#article-2");
let form = document.querySelector("#form-1");
let divcuantosamigos = document.querySelector("#div-cuantosamigos");
let cantAmigos = document.querySelector("#input-cuantosamigos");
let labelerror1 = document.querySelector("#labelerror-cuantosamigos");
let divtotal = document.querySelector("#div-total");
let total = document.querySelector("#input-total");
let labelerror2 = document.querySelector("#labelerror-total");
let article3 = document.querySelector("#article-tarjeta");
let calcular = document.querySelector("#calcular");
let reiniciar = document.querySelector("#reiniciar");
let historialSection = document.querySelector("#historial-section");
let mostrarHistorial = document.querySelector("#mostrar-historial");
let labelcuantosamigos = document.querySelector("#label-cuantosamigos");
let labeltotal = document.querySelector("#label-total");
let aside = document.querySelector("aside");
let p1aside = document.querySelector("#p1-aside");
let p2aside = document.querySelector("#p2-aside");
let perroraside = document.querySelector("#perror-aside");
let perror2aside = document.querySelector("#perror2-aside");
let perrorarticle = document.querySelector("#perror-article");
let guardar = document.createElement("button");
let regresar = document.createElement("button");
let sesionJS = JSON.parse(localStorage.getItem("sesion"));
let noguardado = true;
let booleanhelper = false;
let amigoAnimal;
let articulo;
guardar.classList.add("display-none");
form.onsubmit = (event) => {
    event.preventDefault();
}
let animales = [];
fetch("/data/animales.json")
.then(respuesta => respuesta.json())
.then(data => {
    animales = [...data];
});
const Amigos = [];
class Amigo {
    // ("Amigo" es un objeto que contiene los atributos de cada amigo en particular, junto con un método.
    nombre;
    pagoReal;
    deuda;
    deudaPara;
    deudor;
    constructor (nombre, pagoReal, pagoIdeal, deudor) {
        this.nombre = nombre;
        this.pagoReal = pagoReal;
        this.deuda = sumador (pagoIdeal, -this.pagoReal);
        this.deudaPara = -this.deuda; // (Si su deuda es negativa, se multiplica por -1 y es lo que le deben, es decir, la deuda para con él, no de él. Eso es deudaPara.)
        this.deudor = deudor;        
        this.nombreAnimal = "animalTemporal";
        this.imagenAnimal = "/SuperSammy-original/multimedia/cerdo.png";
        this.info = "infoTemporal";        
    }
    ifAcreedor1 (deudaTotal) {
        // (Si el usuario es acreedor, quiere decir que su deuda es negativa o vale cero, es decir, que le deben dinero o no pero no tiene deuda.)
        return new Promise ((resolve, reject) => {
            if (this.deuda < 0 || this.deuda == 0) {
                let varDeudaTotal = sumador (deudaTotal, this.deudaPara)
                resolve(varDeudaTotal);
                // (La variable deudor, por otro lado, es un booleano que define si la persona es deudora o no.)
            } else {
                reject(deudaTotal);
            }
        })
    }
    queAnimalEs (pagoIdeal) {
        if (this.deudor == true) {
            if (this.pagoReal > 0) {
                this.nombreAnimal = "perezoso";
            } else if (this.pagoReal == 0) {
                this.nombreAnimal = "rata";
            } else {
                this.nombreAnimal = "mapache";
            }
        } else {
            if (this.pagoReal == total.value) {
                this.nombreAnimal = "cerdo";
            } else if (this.pagoReal > pagoIdeal) {
                this.nombreAnimal = "pez payaso";
            } else if (this.pagoReal == pagoIdeal) {
                this.nombreAnimal = "capibara";
            }
        }
        amigoAnimal = animales.find(animal => animal.nombre == this.nombreAnimal);
        this.imagenAnimal = amigoAnimal.imagen;
        console.log(this.nombreAnimal);
        console.log(this.imagenAnimal);
    }
    infoAnimales() {
        let info = [];
        switch (this.nombreAnimal) {
            case "cerdo":
                info = [`"Todos los animales son iguales, pero algunos más que otros"`, `Mítica frase de George Orwell referida a los cerdos como ${this.nombre}. Oh, ${this.nombre}, que tus baños en barro dorado jamás terminen, y tu famosa frase 'Nah, no se preocupen, yo pago esta', perdure por los siglos de los siglos, Amén. Alabado sea el cerdo de ${this.nombre} y qué hijo de p...`];
                break;
            case "pez payaso":
                info = [`Puedo imaginar que no muchos miembros del grupo te respetan...`, `"Daaale, ${this.nombre}, vos tenés...una vez, por nosotros...". Es cierto que tu ex dijo que habían muchos peces en el mar, y es por eso mismo que empezó por alejarse de ${this.nombre}, el más payaso y simp de todos.`];    
                break;
            case "capibara":
                info = [`El animal más amistoso del mundo.`, `Síp, ese es ${this.nombre}, nuestro capibara barrial; jamás tendrá problemas con nadie, montará lomos de grandes aves y domesticará los más hostiles cocodrilos: Pero ${this.nombre}, jamás deberá ni le deberán nada, puesto que es el perfecto capibara de nuestros corazones deudores.`];
                break;
            case "perezoso":
                info = [`Qué pereza. ¿No es así, ${this.nombre}?`, `Armar un CV...buscar...más le vale al perezoso de ${this.nombre} seguir manteniendo una buena relación con sus padres, porque me contó un perezocito que quieren que se mude y pague lo que debe...`];
                break;
            case "rata":
                info = [`${this.nombre}: La rata rastrera.`, `Podrías al menos haber pagado un peso, con lo devaluado que está, pero parece que a ${this.nombre} le fascinan las trampas de queso.`];
            break;
            case "mapache":
                info = [`RAE: "[...]Sucio, delincuente; ${this.nombre}."`, `Veo una pasión por parte de ${this.nombre} de urgar en la basura de los demás. No sólo tuvo el gran gesto de no pagar, sino de robarle a sus amigos por fuera de este pago...${this.nombre} es un animal muy tierno a la vista, porque roba hasta tu atención.`];    
            break;
        }
        return info;
    }
}
let sesion = [];
class historial {
    cantAmigos;
    total;
    amigos;
    amigosLength;
    deudaTotal;
    constructor (cantAmigos, total, amigos, amigosLength, deudaTotal) {
        this.cantAmigos = cantAmigos;
        this.total = total;
        this.amigos = amigos;
        this.amigosLength = amigosLength;
        this.deudaTotal = deudaTotal;
    }
}
function sumador (n1, n2) {
    let resultado = n1 + n2;
    return resultado;
}
function ifSegundosCases (deudorX, deudaN, deudaParaX, nombreX, deudaTotal, uldeudas) {
    if (deudorX == false) {
        let deudaNAX = deudaN * deudaParaX / deudaTotal;
        if (deudaNAX > 0) {            
            let lidebe = document.createElement("li");
            lidebe.innerText = `- Debe ${Math.round(deudaNAX)} pesos a ${nombreX}.` 
            uldeudas.append(lidebe);         
        }
    }
}
function ifAcreedor2 (deudaParaY, uldeudas) {
    let lideben = document.createElement("li");
    if (deudaParaY > 0) {
        lideben.innerText = `- Le deben ${Math.round(deudaParaY)} pesos y no debe.` 
    } else if (deudaParaY == 0) {
        lideben.innerText = `- No le deben dinero y no debe.` 
    }
    uldeudas.append(lideben);         
}
function articuloAnimales(animal) {
    if (animal == "rata" ) {
        articulo = "La";
    } else {
        articulo = "El";
    }
}
function mostrarDatos(protoAmigos, m, deudaTotal) {
    let objetoM = protoAmigos[m];
    let uldeudas = document.createElement("ul");
    let amigocartel = document.createElement("h2");
    let fotoAnimal = document.createElement("img");
    let verMas = document.createElement("button");
    console.log(objetoM.info);
    verMas.innerText = "ver más";
    verMas.addEventListener("click",() => {
        Swal.fire({
            title: `${objetoM.info[0]}`,
            text: `${objetoM.info[1]}`,
            imageUrl: `${objetoM.imagenAnimal}`,
        })
    })
    fotoAnimal.setAttribute("src", `${objetoM.imagenAnimal}`);
    fotoAnimal.classList.add("imagen-animal");
    articuloAnimales(objetoM.nombreAnimal);
    amigocartel.innerText = `${objetoM.nombre}, ${articulo} ${objetoM.nombreAnimal}`;
    if (objetoM.deudor == false) {
        ifAcreedor2 (objetoM.deudaPara, uldeudas);
    } else {
        for (let n = 0; n < protoAmigos.length; n++) {
            while (n != m && n < protoAmigos.length) {
                let objetoN = protoAmigos[n];
                 ifSegundosCases (objetoN.deudor, objetoM.deuda, objetoN.deudaPara, objetoN.nombre, deudaTotal, uldeudas);
                 // (He cargado dos variables distintas que contienen los objetos originarios del array "Amigos", para separar en parámetros
                 // a las propiedades pertenecientes al deudor (con objetoM) de las pertenecientes a los acreedores (con objetoN). Esto gracias, además, a las condiciones del while contenedor.)
                n++;
            }
        }
    }
    return [amigocartel, fotoAnimal, uldeudas, verMas];
}
mostrarHistorial.addEventListener("click", ()=>{
  let sesionJS = JSON.parse(localStorage.getItem("sesion"));
  if (sesionJS !== null) {
    sesion = [];
    for (let p = 0; p < sesionJS.length; p++) {
      sesion.push(sesionJS[p]);
    }
    historialSection.innerHTML = "";
    historialSection.classList.remove("display-none");
    for (let q = 0; q < sesion.length; q++) {
        let varSesion = sesion[q];
        // cargarDatos(varSesion.amigosLength, varSesion.amigos, varSesion.deudaTotal);
        let article4 = document.createElement("article");
        historialSection.append(article4);
        for (let m = 0; m < varSesion.amigosLength; m++) {
            let tarjetaHistorial = document.createElement("div");
            let varMostrarDatos = mostrarDatos(varSesion.amigos, m, varSesion.deudaTotal);
            tarjetaHistorial.append(varMostrarDatos[0]);
            tarjetaHistorial.append(varMostrarDatos[1]);
            tarjetaHistorial.append(varMostrarDatos[2]);
            tarjetaHistorial.append(varMostrarDatos[3]);
            historialSection.append(tarjetaHistorial);
            article4.append(tarjetaHistorial);
        }
    }
    regresar.innerText = `Volver al sistema`;
    historialSection.append(regresar);
    if (booleanhelper == true) {
        article3.classList.add("display-none");
    } else {
        article1.classList.add("display-none");
    }
  } else {
    Swal.fire({
      title: "Lo sentimos :(",
      text: "Aún no tienes historial.",
      imageUrl: "./multimedia/seria2.jpeg",
      imageWidth: 350,
    })
  }
})
ok.addEventListener("click", ()=>{
    article1.classList.add("display-none");
    article2.classList.remove("display-none");
    divcuantosamigos.classList.remove("display-none");
})
ok2.addEventListener("click", ()=>{
    if (cantAmigos.value <= 0) {
        labelcuantosamigos.classList.add("display-none");
        labelerror1.innerText = `Lo sentimos, "${cantAmigos.value}" no es una cantidad válida. Debe ser un número positivo. ${intentar}`
        cantAmigos.value = "";
        cantAmigos.disabled = true;
        labelerror1.classList.remove("display-none");
        let ok21 = document.createElement("button");
        ok21.innerText = `OK`;
        ok2.classList.add("display-none");
        divcuantosamigos.append(ok21);
        ok21.addEventListener("click", () =>{
            labelerror1.classList.add("display-none");            
            ok21.classList.add("display-none");
            labelcuantosamigos.classList.remove("display-none");
            ok2.classList.remove("display-none");
            cantAmigos.disabled = false;
        })
     } else {
         divcuantosamigos.classList.add("display-none");
         divtotal.classList.remove("display-none");
    }
})
ok3.addEventListener("click", ()=>{
    if (total.value <= 0) {
        labeltotal.classList.add("display-none");
        labelerror2.innerText = `Lo sentimos, pero "${total.value}" no es un número válido. Debe ser positivo. ${intentar}`;
        total.value = "";
        total.disabled = true;
        labelerror2.classList.remove("display-none");
        let ok31 = document.createElement("button");
        ok31.innerText = `OK`;
        ok3.classList.add("display-none");
        divtotal.append(ok31);
        ok31.addEventListener("click", () =>{
            labelerror2.classList.add("display-none");            
            ok31.classList.add("display-none");
            labeltotal.classList.remove("display-none");
            ok3.classList.remove("display-none");
            total.disabled = false;
        })
    } else {
        divtotal.classList.add("display-none");
        let pagoIdeal = total.value / cantAmigos.value;
        let deudaTotal = 0;            
        let totalReal = 0;
        aside.classList.remove("display-none");
        p1aside.innerText = `Total estipulado: ${total.value}`;
        p2aside.innerText = `Monto actual: ${totalReal}`;
        for (let i = 1; i <= cantAmigos.value; i++) {
            let tarjeta = document.createElement("form");
            tarjeta.classList.add("form-tarjetas");
            let inputNombre = document.createElement("input");
            inputNombre.classList.add("inputs-nombres");
            inputNombre.setAttribute("placeholder", `¿Quién es el amigo N°${i}`);
            inputNombre.setAttribute("id", `inp1${i}`);
            inputNombre.required = true;
            let inputPago = document.createElement("input");
            inputPago.classList.add("inputs-pagos");
            inputPago.required = true;
            inputPago.setAttribute("placeholder", `¿Cuánto pagó?`);
            inputPago.setAttribute("type", "number");
            inputPago.setAttribute("id", `inp2${i}`);
            let cargar = document.createElement("input");
            cargar.setAttribute("type", "submit");
            cargar.setAttribute("value", "CARGAR");
            cargar.setAttribute("id", `inp3${i}`);
            tarjeta.addEventListener("submit", (event) =>{
                event.preventDefault();
            })
            article3.append(tarjeta);
            tarjeta.append(inputNombre, inputPago, cargar);
        }
        let conjuntoTarjetas = document.querySelectorAll(".form-tarjetas");
        for (let j = 0; j < conjuntoTarjetas.length; j++) {
            let varTarjeta = conjuntoTarjetas[j];
            let varNombre = document.querySelector(`#inp1${j+1}`);
            let varPago = document.querySelector(`#inp2${j+1}`);
            let varCargar = document.querySelector(`#inp3${j+1}`);
            varTarjeta.addEventListener("submit", () =>{
                totalReal = sumador(totalReal, parseFloat(varPago.value));
                if (totalReal <= total.value) {
                    p2aside.innerText = `Monto actual: ${totalReal}`;
                    if (totalReal == total.value) {
                        p2aside.innerText = `Monto actual: ${totalReal} (límite alcanzado)`;       
                    }
                    if (parseFloat(varPago.value) < 0) {
                        perror2aside.innerText = `ATENCIÓN: El pago de ${varNombre.value} es menor a cero. Ten en cuenta que pagará una deuda extra a los acreedores del grupo de ${-varPago.value}.`
                        perror2aside.classList.remove("display-none");
                        let oknegative = document.createElement("button");
                        oknegative.innerText = `OK`;
                        perror2aside.append(oknegative);
                        oknegative.addEventListener("click", () =>{
                            perror2aside.classList.add("display-none");
                            oknegative.classList.add("display-none");
                        })
                    }
                    varNombre.disabled = true;
                    varPago.disabled = true;                    
                    varCargar.disabled = true;
                    let amigoVar = new Amigo (varNombre.value, varPago.value, pagoIdeal, true);
                    amigoVar.ifAcreedor1 (deudaTotal)
                    .then((respuesta) => {
                        amigoVar.deudor = false;
                        deudaTotal = respuesta;
                    })
                    .catch((error) => {
                        amigoVar.deudor = true;
                        deudaTotal = error;
                    });
                    setTimeout(() => {
                        amigoVar.queAnimalEs(pagoIdeal);
                        amigoVar.info = amigoVar.infoAnimales();
                        Amigos.push (amigoVar);
                        if (Amigos.length == cantAmigos.value) {                       
                            calcular.classList.remove("display-none");
                            aside.classList.add("display-none");
                            article3.append(calcular);                
                        }
                    }, 0);
                } else if (totalReal > total.value) {
                    totalReal = sumador(totalReal, -parseFloat(varPago.value));
                    perroraside.innerText = `ERROR. Ha sobrepasado el total estipulado. ${intentar}`;
                    perroraside.classList.remove("display-none");
                    varPago.value = "";
                    let oksobrepas = document.createElement("button");
                    oksobrepas.innerText = `OK`;
                    perroraside.append(oksobrepas);
                    oksobrepas.addEventListener("click", () =>{
                        perroraside.classList.add("display-none");
                        oksobrepas.classList.add("display-none");
                    })
                }
            })
        }
        calcular.addEventListener("click", () =>{
            if (totalReal == parseFloat(total.value)){
                Swal.fire ({
                    title: "¿Listo para conocer de verdad a los animales de tus amigos?",
                    imageUrl: "./multimedia/carrusel-sammy9.jpeg",
                    imageWidth: 350,
                    confirmButtonText: "Sí",
                    confirmButtonColor: "#52d639",
                    showCancelButton: true,
                    cancelButtonColor: "#FF0000"
                }).then(respuesta => {
                    if (respuesta.isConfirmed) {
                        Swal.fire({
                            title: "Calculando...",
                            imageUrl: "./multimedia/carrusel-sammy11.jpeg",
                            imageWidth: 400,
                            timer: 3000,
                            timerProgressBar: true,
                            showConfirmButton: false
                        }).then(respuesta=>{
                            booleanhelper = true;
                            for (let m = 0; m <= Amigos.length-1; m++) {
                                conjuntoTarjetas[m].innerHTML = "";
                                let varMostrarDatos2 = mostrarDatos(Amigos, m, deudaTotal);
                                conjuntoTarjetas[m].append(varMostrarDatos2[0]);
                                conjuntoTarjetas[m].append(varMostrarDatos2[1]);
                                conjuntoTarjetas[m].append(varMostrarDatos2[2]);
                                conjuntoTarjetas[m].append(varMostrarDatos2[3]);
                            }
                            article3.append(reiniciar);
                            article3.append(mostrarHistorial);
                            calcular.classList.add("display-none");
                            reiniciar.classList.remove("display-none");
                            reiniciar.addEventListener("click", () =>{
                              window.location.reload();
                            })
                            guardar.innerText = `GUARDAR EN HISTORIAL`;
                            guardar.classList.remove("display-none");
                            article3.append(guardar);
                            guardar.addEventListener("click", ()=>{
                                if (noguardado == true) {
                                    if (sesionJS !== null) {
                                        sesion = [];
                                        for (let p = 0; p < sesionJS.length; p++) {
                                            sesion.push(sesionJS[p]);
                                        }       
                                    }
                                    let nuevoHistorial = new historial(cantAmigos.value, total.value, Amigos, Amigos.length, deudaTotal);
                                    sesion.unshift(nuevoHistorial);
                                    localStorage.removeItem("sesion");
                                    localStorage.setItem("sesion", JSON.stringify(sesion));
                                    historialSection.innerHTML = "";
                                    noguardado = false;
                                  } else {
                                    Swal.fire({
                                        title: "Lo sentimos :(",
                                        text: "Ya has guardado tu historial.",
                                        imageUrl: "./multimedia/seria3.jpeg",
                                        imageWidth: 350,
                                        confirmButtonColor: "#52d639",
                                        backdrop:`
                                        rgba(82, 214, 57, 0.8)`,                                           
                                    })
                                }                  
                            })
                        })
                    }
                })
                // Swal.fire({
                //     title: "Calculando...",
                //     imageUrl: "./multimedia/carrusel-sammy11.jpeg",
                //     imageWidth: 400,
                //     timer: 3000,
                //     timerProgressBar: true,
                //     showConfirmButton: false
                // }).then(respuesta=>{
                //     booleanhelper = true;
                //     for (let m = 0; m <= Amigos.length-1; m++) {
                //         conjuntoTarjetas[m].innerHTML = "";
                //         let varMostrarDatos2 = mostrarDatos(Amigos, m, deudaTotal);
                //         conjuntoTarjetas[m].append(varMostrarDatos2[0]);
                //         conjuntoTarjetas[m].append(varMostrarDatos2[1]);
                //         conjuntoTarjetas[m].append(varMostrarDatos2[2]);
                //         conjuntoTarjetas[m].append(varMostrarDatos2[3]);
                //     }
                //     article3.append(reiniciar);
                //     article3.append(mostrarHistorial);
                //     calcular.classList.add("display-none");
                //     reiniciar.classList.remove("display-none");
                //     reiniciar.addEventListener("click", () =>{
                //       window.location.reload();
                //     })
                //     guardar.addEventListener("click", ()=>{
                //       if (noguardado == true) {
                //         if (sesionJS !== null) {
                //           sesion = [];
                //           for (let p = 0; p < sesionJS.length; p++) {
                //             sesion.push(sesionJS[p]);
                //           }       
                //         }
                //         let nuevoHistorial = new historial(cantAmigos.value, total.value, Amigos, Amigos.length, deudaTotal);
                //         sesion.unshift(nuevoHistorial);
                //         localStorage.removeItem("sesion");
                //         localStorage.setItem("sesion", JSON.stringify(sesion));
                //         historialSection.innerHTML = "";
                //         noguardado = false;
                //       } else {
                //         Swal.fire({
                //           title: "Lo sentimos :(",
                //           text: "Ya has guardado tu historial.",
                //           imageUrl: "./multimedia/seria3.jpeg",
                //           imageWidth: 350,
                //           confirmButtonColor: "#52d639",
                //           backdrop:`
                //           rgba(82, 214, 57, 0.8)`,                                           
                //         })
                //       }                   
                //     })
                // })
            } else {
                perrorarticle.innerText = `El total original estipulado (${total.value}) difiere del monto sumado entre sus compañeros (${totalReal}). ${intentar}`;
                perrorarticle.classList.remove("display-none");
                article3.append(perrorarticle);
                let okdifiere = document.createElement("button");
                okdifiere.innerText = `OK`;
                article3.append(okdifiere);
                okdifiere.addEventListener("click", () => {
                    perrorarticle.classList.add("display-none");
                    okdifiere.classList.add("display-none");
                    totalReal = 0;
                    p2aside.innerText = `Monto actual: ${totalReal}`;
                    Amigos.splice(0, Amigos.length);
                    calcular.classList.add("display-none");
                    aside.classList.remove("display-none");
                    for (let l = 0; l < conjuntoTarjetas.length; l++) {
                        let varPago = document.querySelector(`#inp2${l+1}`);
                        varPago.value = "";
                        varPago.disabled = false;
                        let varCargar = document.querySelector(`#inp3${l+1}`);
                        varCargar.disabled = false;
                    }
                }) 
            }
        })
            // Swal.fire({
            //     title: "¿Listo para conocer de verdad a los animales de tus amigos?",
            //     imageUrl: "./multimedia/carrusel-sammy9.jpeg",
            //     imageWidth: 350,
            //     confirmButtonText: "Sí",
            //     confirmButtonColor: "#52d639",
            //     showCancelButton: true,
            //     cancelButtonColor: "#FF0000"
            // }).then(respuesta => {
            //     if (respuesta.isConfirmed) {
            //         Swal.fire({
            //             title: "Calculando...",
            //             imageUrl: "./multimedia/carrusel-sammy11.jpeg",
            //             imageWidth: 400,
            //             timer: 3000,
            //             timerProgressBar: true,
            //             showConfirmButton: false
            //         }).then(respuesta=>{
            //             if (totalReal == parseFloat(total.value)) {
            //                 booleanhelper = true;
            //                 for (let m = 0; m <= Amigos.length-1; m++) {
            //                     conjuntoTarjetas[m].innerHTML = "";
            //                     let varMostrarDatos2 = mostrarDatos(Amigos, m, deudaTotal);
            //                     conjuntoTarjetas[m].append(varMostrarDatos2[0]);
            //                     conjuntoTarjetas[m].append(varMostrarDatos2[1]);
            //                     conjuntoTarjetas[m].append(varMostrarDatos2[2]);
            //                     conjuntoTarjetas[m].append(varMostrarDatos2[3]);
            //                 }
            //                 article3.append(reiniciar);
            //                 article3.append(mostrarHistorial);
            //                 calcular.classList.add("display-none");
            //                 reiniciar.classList.remove("display-none");
            //                 reiniciar.addEventListener("click", () =>{
            //                   window.location.reload();
            //                 })
            //                 guardar.addEventListener("click", ()=>{
            //                   if (noguardado == true) {
            //                     if (sesionJS !== null) {
            //                       sesion = [];
            //                       for (let p = 0; p < sesionJS.length; p++) {
            //                         sesion.push(sesionJS[p]);
            //                       }       
            //                     }
            //                     let nuevoHistorial = new historial(cantAmigos.value, total.value, Amigos, Amigos.length, deudaTotal);
            //                     sesion.unshift(nuevoHistorial);
            //                     localStorage.removeItem("sesion");
            //                     localStorage.setItem("sesion", JSON.stringify(sesion));
            //                     historialSection.innerHTML = "";
            //                     noguardado = false;
            //                   } else {
            //                     Swal.fire({
            //                       title: "Lo sentimos :(",
            //                       text: "Ya has guardado tu historial.",
            //                       imageUrl: "./multimedia/seria3.jpeg",
            //                       imageWidth: 350,
            //                       confirmButtonColor: "#52d639",
            //                       backdrop:`
            //                       rgba(82, 214, 57, 0.8)`,                                           
            //                     })
            //                   }                   
            //                 })
            //             } else {
            //                 perrorarticle.innerText = `El total original estipulado (${total.value}) difiere del monto sumado entre sus compañeros (${totalReal}). ${intentar}`;
            //                 perrorarticle.classList.remove("display-none");
            //                 article3.append(perrorarticle);
            //                 let okdifiere = document.createElement("button");
            //                 okdifiere.innerText = `OK`;
            //                 article3.append(okdifiere);
            //                 okdifiere.addEventListener("click", () => {
            //                     perrorarticle.classList.add("display-none");
            //                     okdifiere.classList.add("display-none");
            //                     totalReal = 0;
            //                     p2aside.innerText = `Monto actual: ${totalReal}`;
            //                     Amigos.splice(0, Amigos.length);
            //                     calcular.classList.add("display-none");
            //                     aside.classList.remove("display-none");
            //                     for (let l = 0; l < conjuntoTarjetas.length; l++) {
            //                         varPago = document.querySelector(`#inp2${l+1}`);
            //                         varPago.value = "";
            //                         varPago.disabled = false;
            //                         varCargar = document.querySelector(`#inp3${l+1}`);
            //                         varCargar.disabled = false;
            //                     }
            //                 })                
            //             }
            //             guardar.innerText = `GUARDAR EN HISTORIAL`;
            //             guardar.classList.remove("display-none");
            //             article3.append(guardar);
            //         })
            //     } else {
            //         Swal.fire({
            //             title: "Regresando...",
            //             imageUrl: "./multimedia/seria5.jpeg",
            //             imageWidth: 350,
            //             timer: 2000,
            //             timerProgressBar: true,
            //             showConfirmButton: false
            //         })
            //     }
            // })                     
    }
})
regresar.addEventListener("click", ()=>{
historialSection.classList.add("display-none");
historialSection.innerHTML = "";
if (booleanhelper == true) {
    article3.classList.remove("display-none");
} else {
    article1.classList.remove("display-none");
}
})