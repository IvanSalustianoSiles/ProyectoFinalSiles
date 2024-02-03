// Importaciones
import 'bootstrap/dist/css/bootstrap.min.css'; // Importaciones de Bootstrap (instalado).
import 'bootstrap';
import Swal from 'sweetalert2'; //Importación de SweetAlert.
// Definiciones
let intentar = `Por favor, inténtelo de nuevo.`; //Variable para agregar a strings de mensajes de error.
let ok = document.querySelector("#ok-button"); // Botones de "OK".
let ok2 = document.querySelector("#ok2"); 
let ok3 = document.querySelector("#ok3");
let article1 = document.querySelector("#article-1"); //Article dedicado a la bienvenida a la aplicación.
let article2 = document.querySelector("#article-2"); // Article dedicado a los primeros ingresos de datos.
let article3 = document.querySelector("#article-tarjeta"); //Article dedicado a las tarjetas, tanto su carga como su posterior renovación y muestra de datos.
let form = document.querySelector("#form-1"); // Form contenedor de los dos primeros inputs del programa.
let divcuantosamigos = document.querySelector("#div-cuantosamigos"); // Div contenedor del primer ingreso.
let cantAmigos = document.querySelector("#input-cuantosamigos"); // Input del primer ingreso.
let divtotal = document.querySelector("#div-total"); // Div contenedor del segundo ingreso.
let total = document.querySelector("#input-total"); // Input del segundo ingreso.
let historialSection = document.querySelector("#historial-section"); // Sección contenedora del historial, con todas sus sesiones respectivamente almacenadas.
let mostrarHistorial = document.querySelector("#mostrar-historial"); // Botón para acceder al historial.
let labelcuantosamigos = document.querySelector("#label-cuantosamigos"); // Label del primer input. Actualmente en desuso pero igualmente declarado para su posterior uso.
let labeltotal = document.querySelector("#label-total"); // Label del segundo input. Actualmente en desuso pero igualmente declarado para su posterior uso.
let aside = document.querySelector("aside"); // Aside contenedor del total estipulado y el monto actual, para que el usuario pueda recordar en el proceso de carga de datos cuánto dinero va sumando, y cotejar con el total del pago. 
let p1aside = document.querySelector("#p1-aside"); // Primer p del aside. Muestra el total estipulado.
let p2aside = document.querySelector("#p2-aside"); // Segundo p del aside. Muestra el monto actual.
let calcular = document.querySelector("#calcular"); // Botón a partir de los ingresos de datos, para realizar acciones posteriores.
let reiniciar = document.querySelector("#reiniciar"); // Botón para reiniciar la página. Recomendable guardar la información en el historial antes por obvias razones.
let guardar = document.createElement("button"); // Botón para guardar los resultados en el historial.
let regresar = document.createElement("button"); // Botón para regresar desde el historial a aquella parte del sitio de donde haya venido.
let historialJS = JSON.parse(localStorage.getItem("historial")); // Variable que almacena el historial traido desde el local storage.
let noguardado = true; // Variable para analizar si el historial fue guardado o no. Al llegar a su uso se explicará con más detalle.
let booleanhelper = false; // Variable booleana para revisar si el usuario ya clickeó calcular, o no. Al llegar a su uso se explicará con más detalle.
let amigoAnimal; // Variable que almacena un objeto, correspondiente a un animal que cumpla la condición de un método find específico en la clase Amigo. 
let articulo; // Variable para almacenar el artículo que va delante del nombre de algún animal. Esto esencialmente para evitar expresiones como "El rata" o "La perezoso". Próximamente quizás varíe en función del usuario y no de su animal.
// Arrays
let animales = []; // Array para cargar cierta información sobre animales (nombre, imagen, color).
let historial = []; // Array que almacena el historial completo, el conjunto de sesiones. 
const Amigos = []; // Array para almacenar amigos.
// Clases
class Amigo { // Clase para definir objetos correspondientes a los atributos de cada amigo en particular.
    nombre;
    pagoReal;
    deuda;
    deudaPara;
    deudor;
    nombreAnimal;
    imagenAnimal;
    info;
    colorAnimal;
    constructor (nombre, pagoReal, pagoIdeal, deudor) {
        this.nombre = nombre; // Nombre del amigo.
        this.pagoReal = pagoReal; // Pago real del amigo.
        this.deuda = sumador (pagoIdeal, -this.pagoReal); // Deuda del amigo, obtenida a partir de la diferencia entre el pago ideal (pago promedio) y el pago real del amigo.
        this.deudaPara = -this.deuda; // Si su deuda es negativa, se multiplica por -1 y es lo que le deben, es decir, la deuda para con él, no de él. Eso es deudaPara.
        this.deudor = deudor; // Si el amigo es deudor o no; un booleano.    
        this.nombreAnimal = "animalTemporal"; // El nombre del animal asignado al amigo. Esta asignación se produce en los métodos de la clase. Para este y los siguientes atributos de la clase, se presentan valores temporales.
        this.imagenAnimal = "/SuperSammy-original/multimedia/cerdo.png"; // Imagen del animal asignado al amigo.
        this.info = "infoTemporal"; // Descripción del animal asignado al amigo.
        this.colorAnimal = "colorTemporal"; // Color correspondiente al animal asignado al amigo.       
    }
    ifAcreedor1 (deudaTotal) { // Método que evalúa lo que sucede si el usuario es acreedor.
        return new Promise ((resolve, reject) => {
            if (this.deuda < 0 || this.deuda == 0) { // Si el usuario es acreedor, quiere decir que su deuda es negativa o vale cero, es decir, que le deban dinero o no, no tiene deuda.
                let varDeudaTotal = sumador (deudaTotal, this.deudaPara) // varDeudaTotal almacena la suma entre la deuda total (suma de deudas a los acreedores) y deudaPara (deuda al acreedor específico). Esto se realizará de manera cíclica.
                resolve(varDeudaTotal);
            } else {
                reject(deudaTotal); // Si el caso de la promesa es el negativo, ifAcreedor1 nos devuelve la deuda total previa, sin cargarle la nueva deudaPara.
            }
        })
    }
    queAnimalEs (pagoIdeal) { // Método que evalúa qué animal es el amigo y en función de eso carga ciertos atributos de la clase.
        if (this.deudor == true) { 
            if (this.pagoReal > 0) {  
                this.nombreAnimal = "perezoso"; // Si es deudor pero pagó, es un perezoso. 
            } else if (this.pagoReal == 0) { 
                this.nombreAnimal = "rata"; // Si es deudor pero no pago, es una rata.
            } else {
                this.nombreAnimal = "mapache"; // Si es deudor y aparte su pago fue negativo, quiere decir que debe una deuda extra al total estipulado, por ende es un mapache. 
            }
        } else {
            if (this.pagoReal == total.value) {
                this.nombreAnimal = "cerdo"; // Si es acreedor y pagó todo, es un cerdo.
            } else if (this.pagoReal > pagoIdeal) {
                this.nombreAnimal = "pez-payaso"; // Si es acreedor y pagó más de lo que debería pero no todo, es un pez payaso.
            } else if (this.pagoReal == pagoIdeal) {
                this.nombreAnimal = "capibara"; // Si es acreedor y pagó justo lo que debía pagar, es un capibara.
            }
        }
        amigoAnimal = animales.find(animal => animal.nombre == this.nombreAnimal); // Utilizamos el método find para buscar dentro de Animales el animal cuyo nombre coincida con el atributo nombreAnimal. 
        this.imagenAnimal = amigoAnimal.imagen; // A partir de ello, almacenamos en amigoAnimal el objeto correspondiente al animal adecuado. 
        this.colorAnimal = amigoAnimal.color; // Luego, extraemos sus propiedades almacenándolas en los atributos de nuestra clase.
    }
    infoAnimales() { // Método que en función del atributo nombreAnimal determina la descripción del amigo y la retorna en un array.
        let info = []; // Array para almacenar la descripción de un amigo, compuesta por dos strings: El título, y el texto.
        switch (this.nombreAnimal) {
            case "cerdo":
                info = [`"Todos los animales son iguales, pero algunos más que otros"`, `Mítica frase de George Orwell referida a los cerdos como ${this.nombre}. Oh, ${this.nombre}, que tus baños en barro dorado jamás terminen, y tu famosa frase 'Nah, no se preocupen, yo pago esta', perdure por los siglos de los siglos, Amén. Alabado sea el cerdo de ${this.nombre} y qué hijo de p...`];
                break;
            case "pez-payaso":
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
class sesion { // Clase que dictamina los objetos que almacenarán una sesión cada uno.
    cantAmigos; // Cantidad de amigos.
    total; // Total del pago.
    amigos; // Array con los amigos y su información.
    amigosLength; // Largo de dicho array.
    deudaTotal; // La deuda total correspondiente a una sesión.
    constructor (cantAmigos, total, amigos, amigosLength, deudaTotal) {
        this.cantAmigos = cantAmigos;
        this.total = total;
        this.amigos = amigos;
        this.amigosLength = amigosLength;
        this.deudaTotal = deudaTotal;
    }
}
// Fetch
fetch("/data/animales.json") // Utilizamos el método fetch para traer la información de los animales desde animales.json.
.then(respuesta => respuesta.json())
.then(data => {
    animales = [...data]; // Almacenamos en el array animales la información recogida, mediante el metodo spread.
});
// Funciones
function sumador (n1, n2) {
    let resultado = n1 + n2;
    return resultado;
}
function ifSegundosCases (deudorX, deudaN, deudaParaX, nombreX, deudaTotal, uldeudas) {
    if (deudorX == false) {
        let deudaNAX = deudaN * deudaParaX / deudaTotal;
        if (deudaNAX > 0) {            
            let lidebe = document.createElement("li");
            lidebe.innerText = `- Debe ${Math.round(deudaNAX)} pesos a`;
            lidebe.append(nombreX);
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
    amigocartel.classList.add("amigo-cartel");
    amigocartel.classList.add(`${objetoM.nombreAnimal}`);
    let fotoAnimal = document.createElement("img");
    let verMas = document.createElement("button");
    verMas.innerText = "ver más";
    verMas.classList.add(`${objetoM.nombreAnimal}`);
    verMas.classList.add(`ver-mas`);
    verMas.addEventListener("click",() => { // Evento para ver la descripción del animal.
        Swal.fire({
            title: `${objetoM.info[0]}`,
            text: `${objetoM.info[1]}`,
            confirmButtonColor: `${objetoM.colorAnimal}`,
            imageUrl: `${objetoM.imagenAnimal}`,
            customClass: {
                title: `${objetoM.nombreAnimal}`,
            },
            backdrop:`${objetoM.colorAnimal}`
        })
    })
    fotoAnimal.setAttribute("src", `${objetoM.imagenAnimal}`);
    fotoAnimal.classList.add("imagen-animal");
    articuloAnimales(objetoM.nombreAnimal);
    let animalMostrado = objetoM.nombreAnimal;
    if (objetoM.nombreAnimal == "pez-payaso") {
        animalMostrado = "pez payaso";
    }
    amigocartel.innerText = `${objetoM.nombre}, ${articulo} ${animalMostrado}`;
    if (objetoM.deudor == false) {
        ifAcreedor2 (objetoM.deudaPara, uldeudas);
    } else {
        for (let n = 0; n < protoAmigos.length; n++) {
            while (n != m && n < protoAmigos.length) {
                let objetoN = protoAmigos[n];
                let divNombre = document.createElement("div");
                divNombre.innerText = `${objetoN.nombre}`;
                divNombre.classList.add(`${objetoN.nombreAnimal}`);
                divNombre.classList.add("div-nombre");
                 ifSegundosCases (objetoN.deudor, objetoM.deuda, objetoN.deudaPara, divNombre, deudaTotal, uldeudas);
                 // (He cargado dos variables distintas que contienen los objetos originarios del array "Amigos", para separar en parámetros
                 // a las propiedades pertenecientes al deudor (con objetoM) de las pertenecientes a los acreedores (con objetoN). Esto gracias, además, a las condiciones del while contenedor.)
                n++;
            }
        }
    }
    return [amigocartel, fotoAnimal, uldeudas, verMas];
}
// Eventos (la mayoría)
form.onsubmit = (event) => {
    event.preventDefault(); // Prevenimos que el submit del primer form reinicie el sitio.
}
mostrarHistorial.addEventListener("click", ()=>{ // Evento para acceder al historial.
  let historialJS = JSON.parse(localStorage.getItem("historial"));
  if (historialJS !== null) {
    historial = [];
    for (let p = 0; p < historialJS.length; p++) {
      historial.push(historialJS[p]);
    }
    historialSection.innerHTML = "";
    historialSection.classList.remove("display-none");
    for (let q = 0; q < historial.length; q++) {
        let varHistorial = historial[q];
        let article4 = document.createElement("article");
        let sesionName = document.createElement("h1");
        sesionName.innerText = `Sesión N°${historial.length-q}`
        article4.append(sesionName);
        historialSection.append(article4);
        for (let m = 0; m < varHistorial.amigosLength; m++) {
            let tarjetaHistorial = document.createElement("div");
            tarjetaHistorial.classList.add("tarjetas");
            let [amigocartel2, fotoAnimal2, uldeudas2, verMas2] = mostrarDatos(varHistorial.amigos, m, varHistorial.deudaTotal);
            tarjetaHistorial.append(amigocartel2, fotoAnimal2, uldeudas2, verMas2);
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
      backdrop:`
      rgba(82, 214, 57, 0.8)`
    })
  }
})
ok.addEventListener("click", ()=>{ // Evento del primer OK.
    cantAmigos.setAttribute("type", "number");
    total.setAttribute("type", "number");
    article1.classList.add("display-none");
    article2.classList.remove("display-none");
    divcuantosamigos.classList.remove("display-none");
})
ok2.addEventListener("click", ()=>{ // Evento luego de ingresar la cantidad de amigos.
    if (cantAmigos.value <= 0) {
        Swal.fire({
            title: "Lo sentimos.",
            text: `"${cantAmigos.value}" no es una cantidad válida. Debe ser un número positivo. ${intentar}`,
            imageUrl: "./multimedia/seria4.jpeg",
            confirmButtonColor: "#52d639",
            timer: 4500,
            imageWidth: 350,
            backdrop:`
            rgba(82, 214, 57, 0.8)`
          }).then((respuesta) => {            
            cantAmigos.value = "";
            ok2.classList.remove("display-none");
          })
    } else {
        divcuantosamigos.classList.add("display-none");
        divtotal.classList.remove("display-none");
    }
})
ok3.addEventListener("click", ()=>{ // Evento luego de ingresar el total del pago.
    if (total.value <= 0) {
        Swal.fire({
            title: "Lo sentimos.",
            text: `"${total.value}" no es un número válido. Debe ser positivo. ${intentar}`,
            imageUrl: "./multimedia/seria3.jpeg",
            confirmButtonColor: "#52d639",
            timer: 4000,
            imageWidth: 350,
            backdrop:`
            rgba(82, 214, 57, 0.8)`
          }).then((respuesta) => {            
            total.value = "";            
            ok3.classList.remove("display-none");
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
                event.preventDefault(); // Prevenimos que se reinicie la página al darle a este submit.
            })
            article3.append(tarjeta);
            tarjeta.append(inputNombre, inputPago, cargar);
        }
        let conjuntoTarjetas = document.querySelectorAll(".form-tarjetas");
        for (let j = 0; j < conjuntoTarjetas.length; j++) {
            let varNombre = document.querySelector(`#inp1${j+1}`);
            let varPago = document.querySelector(`#inp2${j+1}`);
            let varCargar = document.querySelector(`#inp3${j+1}`);
            varCargar.addEventListener("click", () =>{ // Evento de cargar el nombre y el pago de un amigo.
                totalReal = sumador(totalReal, parseFloat(varPago.value));
                if (totalReal <= parseFloat(total.value)) {
                    p2aside.innerText = `Monto actual: ${totalReal}`;
                    if (totalReal == parseFloat(total.value)) {
                        p2aside.innerText = `Monto actual: ${totalReal} (límite alcanzado)`;       
                    }
                    if (parseFloat(varPago.value) < 0) {
                        Swal.fire({
                            title: `ATENCIÓN: El pago de ${varNombre.value} es menor a cero.`,
                            text: `Ten en cuenta que pagará una deuda extra a los acreedores del grupo de ${-varPago.value}.`,
                            imageUrl: "./multimedia/seria2.jpeg",
                            confirmButtonColor: "#52d639",
                            imageWidth: 350,
                            backdrop:`
                            rgba(82, 214, 57, 0.8)`
                        });
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
                        amigoVar.info = amigoVar.infoAnimales();;
                        Amigos.push (amigoVar);
                        if (Amigos.length == cantAmigos.value) {                       
                            calcular.classList.remove("display-none");
                            aside.classList.add("display-none");
                            article3.append(calcular);                
                        }
                    }, 0);
                } else if (totalReal > total.value) {
                    totalReal = sumador(totalReal, -parseFloat(varPago.value));
                    varPago.value = "";
                    Swal.fire({
                        title: "ERROR: Ha sobrepasado el total estipulado.",
                        text: `${intentar}`,
                        imageUrl: "./multimedia/seria5.jpeg",
                        confirmButtonColor: "#52d639",
                        timer: 3500,
                        imageWidth: 350,
                        backdrop:`
                        rgba(82, 214, 57, 0.8)`
                    })
                }
            })
        }
        calcular.addEventListener("click", () =>{ // Evento que ocurre al darle click a calcular.
            if (totalReal == parseFloat(total.value)){
                Swal.fire ({
                    title: "¿Listo para conocer de verdad a los animales de tus amigos?",
                    imageUrl: "./multimedia/carrusel-sammy9.jpeg",
                    imageWidth: 350,
                    confirmButtonText: "Sí",
                    confirmButtonColor: "#52d639",
                    showCancelButton: true,
                    cancelButtonColor: "#FF0000",
                    backdrop:`
                    rgba(82, 214, 57, 0.8)`,
                }).then(respuesta => {
                    if (respuesta.isConfirmed) {
                        Swal.fire({
                            title: "Calculando...",
                            imageUrl: "./multimedia/carrusel-sammy11.jpeg",
                            imageWidth: 400,
                            timer: 3000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            backdrop:`
                            rgba(82, 214, 57, 0.8)`,
                        }).then(respuesta=>{
                            booleanhelper = true;
                            for (let m = 0; m <= Amigos.length-1; m++) {
                                conjuntoTarjetas[m].innerHTML = "";
                                conjuntoTarjetas[m].classList.add("tarjetas");
                                let datosMostrados = mostrarDatos(Amigos, m, deudaTotal);
                                conjuntoTarjetas[m].append(datosMostrados[0], datosMostrados[1], datosMostrados[2], datosMostrados[3]);
                            }
                            article3.append(reiniciar);
                            article3.append(mostrarHistorial);
                            calcular.classList.add("display-none");
                            reiniciar.classList.remove("display-none");
                            reiniciar.addEventListener("click", () =>{ // Evento de reiniciar la aplicación.
                              window.location.reload();
                            })
                            guardar.innerText = `GUARDAR EN HISTORIAL`;
                            article3.append(guardar);
                            guardar.addEventListener("click", ()=>{ // Evento de guardar la sesión en el historial.
                                if (noguardado == true) {
                                    if (historialJS !== null) {
                                        historial = [];
                                        for (let p = 0; p < historialJS.length; p++) {
                                            historial.push(historialJS[p]);
                                        }       
                                    }
                                    let nuevaSesion = new sesion(cantAmigos.value, total.value, Amigos, Amigos.length, deudaTotal);
                                    historial.unshift(nuevaSesion);
                                    localStorage.removeItem("historial");
                                    localStorage.setItem("historial", JSON.stringify(historial));
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
                    } else {
                        Swal.fire({
                            title: "Regresando...",
                            imageUrl: "./multimedia/seria5.jpeg",
                            imageWidth: 350,
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            backdrop:`
                            rgba(82, 214, 57, 0.8)`,
                        })
                    }
                })
            } else {
                Swal.fire({
                    title: `ERROR.`,
                    text: `El total original estipulado (${total.value}) difiere del monto sumado entre sus compañeros (${totalReal}). ${intentar}`,
                    imageUrl: "./multimedia/seria5.jpeg",
                    confirmButtonColor: "#52d639",
                    imageWidth: 350,
                    backdrop:`
                    rgba(82, 214, 57, 0.8)`
                }).then((respuesta)=>{
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
    }
})
regresar.addEventListener("click", ()=>{ // Evento para regresar al historial desde donde sea que hayas estado.
    historialSection.classList.add("display-none");
    historialSection.innerHTML = "";
    if (booleanhelper == true) {
        article3.classList.remove("display-none");
    } else {
        article1.classList.remove("display-none");
    }
})