const form = document.getElementById("vehiculo-form");

const inputFoto = document.getElementById("foto");
const inputNombre = document.getElementById("nombre");
const inputMarca = document.getElementById("marca");
const inputModelo = document.getElementById("modelo");
const inputKilometraje = document.getElementById("kilometraje");
const inputPrecio = document.getElementById("precio");

const contCard = document.getElementById("containerCars");

function createNewVehicle(foto, nombre, marca, modelo, kilometraje, precio) {
    // CONTENEDOR PRINCIPAL
    const containerCard = document.createElement("div");
    containerCard.classList.add("col-md-6", "item-vehiculo");

    // CARD
    const bodyCard = document.createElement("div");
    bodyCard.classList.add("card", "h-100");

    // IMAGEN
    const img = document.createElement("img");
    img.src = foto;
    img.classList.add("card-img-top");

    // INFO
    const infoCard = document.createElement("div");
    infoCard.classList.add("card-body");

    const nameVehicle = document.createElement("h3");
    nameVehicle.classList.add("card-title");
    nameVehicle.textContent = nombre;

    const marcaVehicle = document.createElement("h4");
    marcaVehicle.classList.add("card-subtitle", "text-muted");
    marcaVehicle.textContent = marca;

    const modeloVehicle = document.createElement("h4");
    modeloVehicle.classList.add("card-text");
    modeloVehicle.textContent = "Modelo: " + modelo;

    const kilometrajeVehicle = document.createElement("h4");
    kilometrajeVehicle.classList.add("card-text");
    kilometrajeVehicle.textContent ="Kilometraje: " + kilometraje +" km" ;

    const precioVehicle = document.createElement("h2");
    precioVehicle.classList.add("text-success");
    precioVehicle.textContent =  "$" + precio ;

    // BOTONES
    const containerButtons = document.createElement("div");
    containerButtons.classList.add("d-flex", "justify-content-between", "mt-3");

    const buttonBuyCard = document.createElement("button");
    buttonBuyCard.classList.add("btn", "btn-success", "btn-comprar");
    buttonBuyCard.textContent = "Comprar";

    const buttonDeleteCard = document.createElement("button");
    buttonDeleteCard.classList.add("btn", "btn-danger", "btn-eliminar");
    buttonDeleteCard.textContent = "Eliminar";

    // ARMAR CARD
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

    // AÑADIR EVENTOS
    eventsToCard(containerCard);

    return containerCard;
}

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
    }
    else if (foto === "") {
        foto = "https://casabritanica.com.co/wp-content/uploads/2024/05/Casa-britanica-renault-megane-e-tech-miniatura.webp";
    }

    const newVehicle = createNewVehicle(foto, nombre, marca, modelo, kilometraje, precio);
    contCard.appendChild(newVehicle);

    form.reset();
});

function eventsToCard(containerCard) {
    const buttonBuy = containerCard.querySelector(".btn-comprar");
    const buttonDelete = containerCard.querySelector(".btn-eliminar");

    buttonDelete.addEventListener("click", () => {
        containerCard.remove();
    });

    buttonBuy.addEventListener("click", () => {
        alert("¡Has comprado el carro!");
        containerCard.remove();
    });
    
}
