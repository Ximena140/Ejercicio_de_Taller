// ==========================================
// MENÚ HAMBURGUESA
// ==========================================
const btn = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu-horizontal");

btn.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// ==========================================
// VALIDACIÓN DE FORMULARIO DE CONTACTO
// ==========================================
const formContacto = document.querySelector('form[name="frm"]');

formContacto.addEventListener("submit", (event) => {
  const fname = formContacto.elements["nombres"].value;
  const flastname = formContacto.elements["apellidos"].value;
  const femail = formContacto.elements["email"].value;
  const fphone = formContacto.elements["telefono"].value;
  const fdireccion = formContacto.elements["Dirección"].value;
  const fasunto = formContacto.elements["asunto"].value;

  if (!fname || !flastname || !femail || !fphone || !fdireccion || !fasunto) {
    event.preventDefault();
    alert("Por favor, complete todos los campos del formulario.");
  } else if (!validateEmail(femail)) {
    event.preventDefault();
    alert("Por favor, ingrese un correo válido.");
  } else {
    const confirmation = confirm(
      "Está a punto de enviar el formulario. ¿Desea continuar?"
    );
    if (!confirmation) {
      event.preventDefault();
    } else {
      const mensaje = document.getElementById("mensajeEnviado");
      mensaje.style.display = "block";
      setTimeout(() => {
        mensaje.style.display = "none";
      }, 5000);
      formContacto.reset();
    }
  }
});

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

const formCompra = document.getElementById("notaForm");
const lista = document.getElementById("listaEstudiantes");
const totalGeneral = document.getElementById("montoTotal");
const mensajeCompra = document.getElementById("mensajeCompra");

let totalAcumulado = 0;

formCompra?.addEventListener("submit", (event) => {
  event.preventDefault();

  const codigoStr = document.getElementById("code").value.trim();
  const nombre = document.getElementById("name").value.trim();
  const producto = document.getElementById("product").value.trim();
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const precio = parseFloat(document.getElementById("precio").value);

  // Validaciones
  if (!codigoStr || !nombre || !producto || isNaN(cantidad) || isNaN(precio)) {
    mostrarNotificacionCompra("Por favor, complete todos los campos.", true);
    return;
  }

  if (!/^[0-9]+$/.test(codigoStr)) {
    mostrarNotificacionCompra(
      "El código debe contener solo números enteros.",
      true
    );
    return;
  }

  const confirmar = confirm("¿Desea registrar esta compra?");
  if (!confirmar) return;

  const total = cantidad * precio;

  const item = document.createElement("li");
  item.classList.add("item-compra");
  item.innerHTML = `
    <div>
      <strong>Código:</strong> ${codigoStr}<br>
      <strong>Cliente:</strong> ${nombre}<br>
      <strong>Producto:</strong> ${producto}<br>
      <strong>Cantidad:</strong> ${cantidad}<br>
      <strong>Precio Unitario:</strong> S/ ${precio.toFixed(2)}<br>
      <strong>Total:</strong> S/ ${total.toFixed(2)}
    </div>
    <button class="eliminar">🗑️ Eliminar</button>
    <hr>
  `;

  // Botón para eliminar producto
  item.querySelector(".eliminar").addEventListener("click", () => {
    lista.removeChild(item);
    totalAcumulado -= total;
    totalGeneral.textContent = totalAcumulado.toFixed(2);
    mostrarNotificacionCompra("Producto eliminado del carrito.", false);
  });

  lista.appendChild(item);
  totalAcumulado += total;
  totalGeneral.textContent = totalAcumulado.toFixed(2);
  mostrarNotificacionCompra("Compra registrada con éxito 🎉", false);

  formCompra.reset();
});

// ✅ Notificación emergente tipo contacto
function mostrarNotificacionCompra(mensaje, esError) {
  if (!mensajeCompra) return;

  mensajeCompra.textContent = mensaje;
  mensajeCompra.style.backgroundColor = esError ? "#f8d7da" : "#d4edda";
  mensajeCompra.style.color = esError ? "#721c24" : "#155724";
  mensajeCompra.style.display = "block";

  setTimeout(() => {
    mensajeCompra.style.display = "none";
  }, 4000);
}
