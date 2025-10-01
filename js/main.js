// VARIABLES GLOBALES 
const form = document.getElementById("vehiculo-form");

const inputFoto = document.getElementById("foto");
const inputNombre = document.getElementById("nombre");
const inputMarca = document.getElementById("marca");
const inputModelo = document.getElementById("modelo");
const inputKilometraje = document.getElementById("kilometraje");
const inputPrecio = document.getElementById("precio");

const contCard = document.getElementById("containerCars");

// Arrays globales persistentes en localStorage
let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// CREAR TARJETA VEHÍCULO 
function createNewVehicle(vehiculo) {
    const { id, foto, nombre, marca, modelo, kilometraje, precio } = vehiculo;

    const containerCard = document.createElement("div");
    containerCard.classList.add("col-md-6", "item-vehiculo");
    containerCard.dataset.id = id;

    const bodyCard = document.createElement("div");
    bodyCard.classList.add("card", "h-100");

    const img = document.createElement("img");
    img.src = foto;
    img.classList.add("card-img-top");

    const infoCard = document.createElement("div");
    infoCard.classList.add("card-body");

    const nameVehicle = document.createElement("h3");
    nameVehicle.classList.add("card-title");
    nameVehicle.textContent = nombre;

    const marcaVehicle = document.createElement("h4");
    marcaVehicle.classList.add("card-subtitle");
    marcaVehicle.textContent = "Marca: " + marca;

    const modeloVehicle = document.createElement("h4");
    modeloVehicle.classList.add("card-text");
    modeloVehicle.textContent = "Modelo: " + modelo;

    const kilometrajeVehicle = document.createElement("h4");
    kilometrajeVehicle.classList.add("card-text");
    kilometrajeVehicle.textContent = "Kilometraje: " + kilometraje + " km";

    const precioVehicle = document.createElement("h2");
    precioVehicle.classList.add("text-success");
    precioVehicle.textContent = "$" + precio;

    const containerButtons = document.createElement("div");
    containerButtons.classList.add("d-flex", "justify-content-between", "mt-3");

    const buttonBuyCard = document.createElement("button");
    buttonBuyCard.classList.add("btn", "btn-success", "btn-comprar");
    buttonBuyCard.textContent = "Agregar Al Carrito";

    const buttonDeleteCard = document.createElement("button");
    buttonDeleteCard.classList.add("btn", "btn-danger", "btn-eliminar");
    buttonDeleteCard.textContent = "Eliminar";

    containerCard.appendChild(bodyCard);
    bodyCard.appendChild(img);
    bodyCard.appendChild(infoCard);
    infoCard.appendChild(nameVehicle);
    infoCard.appendChild(marcaVehicle);
    infoCard.appendChild(modeloVehicle);
    infoCard.appendChild(kilometrajeVehicle);
    infoCard.appendChild(precioVehicle);
    infoCard.appendChild(containerButtons);
    containerButtons.appendChild(buttonBuyCard);
    containerButtons.appendChild(buttonDeleteCard);

    eventsToCard(containerCard);
    return containerCard;
}


// FORMULARIO NUEVO VEHÍCULO 
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let foto = inputFoto.value.trim();
    const nombre = inputNombre.value.trim();
    const marca = inputMarca.value.trim();
    const modelo = inputModelo.value.trim();
    const kilometraje = inputKilometraje.value.trim();
    const precio = inputPrecio.value.trim();

    if (!nombre || !marca || !modelo || !kilometraje || !precio) {
        alert("TODOS LOS CAMPOS SON OBLIGATORIOS");
        return;
    } else if (foto === "") {
        foto = "https://casabritanica.com.co/wp-content/uploads/2024/05/Casa-britanica-renault-megane-e-tech-miniatura.webp";
    }

    const vehiculoObj = {
        id: Date.now(),
        foto: foto,
        nombre: nombre,
        marca: marca,
        modelo: modelo,
        kilometraje: kilometraje,
        precio: precio
    };

    vehiculos.push(vehiculoObj);
    localStorage.setItem("vehiculos", JSON.stringify(vehiculos));

    const newVehicle = createNewVehicle(vehiculoObj);
    contCard.appendChild(newVehicle);

    form.reset();
});


// RENDER VEHÍCULOS GUARDADOS 
window.addEventListener("DOMContentLoaded", () => {
    vehiculos.forEach(v => {
        contCard.appendChild(createNewVehicle(v));
    });
    renderCarrito(); // reconstruir carrito lateral
});


// EVENTOS TARJETA PRINCIPAL 


// Agregar al carrito
function eventsToCard(containerCard) {
    const buttonBuy = containerCard.querySelector(".btn-comprar");
    const buttonDelete = containerCard.querySelector(".btn-eliminar");

    // Referencia al total del carrito
    const totalCarrito = document.getElementById("total-carrito");

    // Función para actualizar el total desde localStorage
    function actualizarTotal() {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        let total = 0;

        carrito.forEach(v => {
            // Sacamos solo los números del precio
            const valor = parseFloat(v.precio.replace(/[^0-9]/g, ""));
            total += isNaN(valor) ? 0 : valor;
        });

        totalCarrito.textContent = `$${total.toLocaleString("es-CO")}`;
    }

    // Eliminar vehículo de la lista principal
    buttonDelete.addEventListener("click", () => {
        const id = Number(containerCard.dataset.id);
        vehiculos = vehiculos.filter(v => v.id !== id);
        localStorage.setItem("vehiculos", JSON.stringify(vehiculos));

        containerCard.remove();
        actualizarTotal(); //recalcula el total
    });

    // Agregar al carrito
    buttonBuy.addEventListener("click", () => {
        const nombre = containerCard.querySelector(".card-title").textContent;
        const marca = containerCard.querySelector(".card-subtitle").textContent;
        const modelo = containerCard.querySelectorAll(".card-text")[0].textContent;
        const kilometraje = containerCard.querySelectorAll(".card-text")[1].textContent;
        const precio = containerCard.querySelector(".text-success").textContent;
        const foto = containerCard.querySelector("img").src;

        // Crear objeto carrito con id único
        const vehiculoCarrito = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            foto: foto,
            nombre: nombre,
            marca: marca,
            modelo: modelo,
            kilometraje: kilometraje,
            precio: precio
        };

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.push(vehiculoCarrito);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        alert(`Has agregado el carro ${nombre} al carrito por ${precio}`);
        actualizarTotal(); // recalcula el total

        renderCarrito(); // repinta el panel con todo

    });

    // Para que el total no quede en 0 al recargar
    actualizarTotal();
}



// RENDER CARRITO LATERAL 
// Función que reconstruye el carrito desde localStorage
function renderCarrito() {
    const panelLateral = document.querySelector("#panel-lateral .cont-products");
    const totalCarrito = document.getElementById("total-carrito");

    panelLateral.innerHTML = ""; // limpiar antes de pintar

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let total = 0;

    carrito.forEach(item => {
        // Crear tarjeta para el carrito
        const itemComprado = document.createElement("div");
        itemComprado.classList.add("col-md-12", "item-vehiculo");
        itemComprado.innerHTML = `
            <div class="card card-carrito border-0 shadow-sm d-flex flex-row align-items-center p-2">
                <img src="${item.foto}" class="img-carrito" alt="Foto vehículo">
                <div class="card-body p-2">
                    <h5 class="card-title">${item.nombre}</h5>
                    <h6 class="card-subtitle mb-1">${item.marca}</h6>
                    <p class="card-text mb-1">${item.modelo}</p>
                    <p class="card-text mb-1">${item.kilometraje}</p>
                    <h5 class="text-success mb-2">${item.precio}</h5>
                    <div class="text-end">
                        <button class="btn btn-danger btn-sm btn-eliminar-carrito">Eliminar</button>
                    </div>
                </div>
            </div>
        `;

        // Botón eliminar
        const btnEliminarCarrito = itemComprado.querySelector(".btn-eliminar-carrito");
        btnEliminarCarrito.addEventListener("click", () => {
            carrito = carrito.filter(c => c.id !== item.id);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderCarrito(); // 👈 repintar y actualizar total
        });

        panelLateral.appendChild(itemComprado);

        // Calcular total
        const valor = parseFloat(item.precio.replace(/[^0-9]/g, ""));
        total += isNaN(valor) ? 0 : valor;
    });

    totalCarrito.textContent = `$${total.toLocaleString("es-CO")}`;
}

// Cuando la página carga, pintamos el carrito guardado
window.addEventListener("DOMContentLoaded", () => {
    renderCarrito();
});


// PANEL LATERAL 
const toggleBtn = document.getElementById("toggle-cart");
const panelLateral = document.getElementById("panel-lateral");

toggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    panelLateral.classList.toggle("active");
    toggleBtn.classList.toggle("active");
});
