 const pCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const pTabla = document.getElementById("tablaCarrito");

    pCarrito.forEach(v => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td><img src="${v.foto}" alt="vehículo"></td>
        <td>${v.nombre}</td>
        <td>${v.marca}</td>
        <td>${v.modelo}</td>
        <td>${v.kilometraje}</td>
        <td>${v.precio}</td>
      `;
      pTabla.appendChild(fila);
    });

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const tabla = document.getElementById("tablaCarrito");
    const btnVaciar = document.getElementById("vaciarCarrito");

    // Función para renderizar la tabla
    function renderTabla() {
      tabla.innerHTML = ""; // limpiar tabla
      carrito.forEach((v, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td><img src="${v.foto}" width="100"></td>
          <td>${v.nombre}</td>
          <td>${v.marca}</td>
          <td>${v.modelo}</td>
          <td>${v.kilometraje} km</td>
          <td>${v.precio}</td>
          <td><button class="btn btn-danger" data-index="${index}">Eliminar</button></td>
        `;
        tabla.appendChild(fila);
      });

      // Agregar evento a cada botón de eliminar
      document.querySelectorAll(".btn-danger").forEach(btn => {
        btn.addEventListener("click", () => {
          const index = btn.getAttribute("data-index");
          carrito.splice(index, 1); // eliminar del array
          localStorage.setItem("carrito", JSON.stringify(carrito)); // actualizar localStorage
          renderTabla(); // refrescar la tabla
        });
      });
    }

    // Evento para vaciar carrito
    btnVaciar.addEventListener("click", () => {
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderTabla();
      
    });

    // Render inicial
    renderTabla();
