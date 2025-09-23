//  VARIABLES GLOBALES
const form = document.getElementById("vehiculo-form");

const inputFoto = document.getElementById("foto");
const inputNombre = document.getElementById("nombre");
const inputMarca = document.getElementById("marca");
const inputModelo = document.getElementById("modelo");
const inputKilometraje = document.getElementById("kilometraje");
const inputPrecio = document.getElementById("precio");

// Contenedor donde se insertarán las tarjetas de vehículos
const contCard = document.getElementById("containerCars");


//FUNCIÓN PARA CREAR UNA NUEVA TARJETA DE VEHÍCULO 
function createNewVehicle(foto, nombre, marca, modelo, kilometraje, precio) {
    // Crear contenedor principal de la tarjeta
    const containerCard = document.createElement("div");
    containerCard.classList.add("col-md-6", "item-vehiculo");

    // Crear el cuerpo de la tarjeta
    const bodyCard = document.createElement("div");
    bodyCard.classList.add("card", "h-100");

    // Imagen del vehículo
    const img = document.createElement("img");
    img.src = foto;
    img.classList.add("card-img-top");

    // Contenedor de la información de la tarjeta
    const infoCard = document.createElement("div");
    infoCard.classList.add("card-body");

    // Nombre del vehículo
    const nameVehicle = document.createElement("h3");
    nameVehicle.classList.add("card-title");
    nameVehicle.textContent = nombre;

    // Marca del vehículo
    const marcaVehicle = document.createElement("h4");
    marcaVehicle.classList.add("card-subtitle", "text-muted");
    marcaVehicle.textContent = marca;

    // Modelo del vehículo
    const modeloVehicle = document.createElement("h4");
    modeloVehicle.classList.add("card-text");
    modeloVehicle.textContent = "Modelo: " + modelo;

    // Kilometraje del vehículo
    const kilometrajeVehicle = document.createElement("h4");
    kilometrajeVehicle.classList.add("card-text");
    kilometrajeVehicle.textContent = "Kilometraje: " + kilometraje + " km";

    // Precio del vehículo
    const precioVehicle = document.createElement("h2");
    precioVehicle.classList.add("text-success");
    precioVehicle.textContent = "$" + precio;

    // Contenedor para los botones (comprar y eliminar)
    const containerButtons = document.createElement("div");
    containerButtons.classList.add("d-flex", "justify-content-between", "mt-3");

    // Botón para agregar al carrito
    const buttonBuyCard = document.createElement("button");
    buttonBuyCard.classList.add("btn", "btn-success", "btn-comprar");
    buttonBuyCard.textContent = "Agregar Al Carrito";

    // Botón para eliminar el vehículo
    const buttonDeleteCard = document.createElement("button");
    buttonDeleteCard.classList.add("btn", "btn-danger", "btn-eliminar");
    buttonDeleteCard.textContent = "Eliminar";

    // Ensamblar la tarjeta
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

    // Asignar eventos (comprar / eliminar) a la tarjeta
    eventsToCard(containerCard);

    return containerCard;
}


// EVENTO PARA CREAR NUEVA TARJETA AL ENVIAR EL FORMULARIO 
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Obtener valores de los campos
    let foto = inputFoto.value.trim();
    const nombre = inputNombre.value.trim();
    const marca = inputMarca.value.trim();
    const modelo = inputModelo.value.trim();
    const kilometraje = inputKilometraje.value.trim();
    const precio = inputPrecio.value.trim();

    // Validación: todos los campos obligatorios
    if (!nombre || !marca || !modelo || !kilometraje || !precio) {
        alert("TODOS LOS CAMPOS SON OBLIGATORIOS");
        return;
    }
    // Si no se ingresa foto, usar una por defecto
    else if (foto === "") {
        foto = "https://casabritanica.com.co/wp-content/uploads/2024/05/Casa-britanica-renault-megane-e-tech-miniatura.webp";
    }

    // Crear nueva tarjeta y agregarla al contenedor principal
    const newVehicle = createNewVehicle(foto, nombre, marca, modelo, kilometraje, precio);
    contCard.appendChild(newVehicle);

    // Resetear formulario después de crear la tarjeta
    form.reset();
});


// FUNCIÓN PARA ASIGNAR EVENTOS A CADA TARJETA 
function eventsToCard(containerCard) {
    const buttonBuy = containerCard.querySelector(".btn-comprar");
    const buttonDelete = containerCard.querySelector(".btn-eliminar");
    const panelLateral = document.querySelector("#panel-lateral .cont-products");
    const totalCarrito = document.getElementById("total-carrito");

    // Función para actualizar el total del carrito
    function actualizarTotal() {
        let total = 0;
        const precios = panelLateral.querySelectorAll(".text-success");
        precios.forEach(p => {
            // Extrae solo los números del texto del precio
            const valor = parseFloat(p.textContent.replace(/[^0-9]/g, ""));
            total += isNaN(valor) ? 0 : valor;
        });
        // Actualiza el total en el panel lateral
        totalCarrito.textContent = `$${total.toLocaleString("es-CO")}`;
    }

    // Evento para eliminar la tarjeta desde la lista principal
    buttonDelete.addEventListener("click", () => {
        containerCard.remove();
        actualizarTotal();
    });

    // Evento para agregar el vehículo al carrito lateral
    buttonBuy.addEventListener("click", () => {
        // Obtener la información de la tarjeta original
        const nombre = containerCard.querySelector(".card-title").textContent;
        const marca = containerCard.querySelector(".card-subtitle").textContent;
        const modelo = containerCard.querySelectorAll(".card-text")[0].textContent;
        const kilometraje = containerCard.querySelectorAll(".card-text")[1].textContent;
        const precio = containerCard.querySelector(".text-success").textContent;
        const foto = containerCard.querySelector("img").src;

        // Crear tarjeta para el carrito lateral
        const itemComprado = document.createElement("div");
        itemComprado.classList.add("col-md-12", "item-vehiculo");
        itemComprado.innerHTML = `
            <div class="card card-carrito border-0 shadow-sm d-flex flex-row align-items-center p-2">
                <img src="${foto}" class="img-carrito" alt="Foto vehículo">
                <div class="card-body p-2">
                    <h5 class="card-title">${nombre}</h5>
                    <h6 class="card-subtitle mb-1 text-muted">${marca}</h6>
                    <p class="card-text mb-1">${modelo}</p>
                    <p class="card-text mb-1">${kilometraje}</p>
                    <h5 class="text-success mb-2">${precio}</h5>
                    <div class="text-end">
                        <button class="btn btn-danger btn-sm btn-eliminar-carrito">Eliminar</button>
                    </div>
                </div>
            </div>
        `;

        // Agregar tarjeta al carrito lateral
        panelLateral.appendChild(itemComprado);

        // Evento para eliminar desde el carrito
        const btnEliminarCarrito = itemComprado.querySelector(".btn-eliminar-carrito");
        btnEliminarCarrito.addEventListener("click", () => {
            itemComprado.remove();
            actualizarTotal();
        });

        // Actualizar el total del carrito
        actualizarTotal();

        // Mensaje de confirmación
        alert(`Has agregado el carro ${marca} ${nombre} al carrito por ${precio}`);
    });
}


// PANEL LATERAL (CARRITO) 
const toggleBtn = document.getElementById("toggle-cart");
const panelLateral = document.getElementById("panel-lateral");

// Mostrar - ocultar el panel lateral al dar clic en el botón
toggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    panelLateral.classList.toggle("active");
    toggleBtn.classList.toggle("active"); // mueve el botón junto con el panel
});
