async function cargarProductos(){

    const respuesta = await fetch("/productos");

    const productos = await respuesta.json();

    const tabla = document.getElementById("tablaProductos");

    tabla.innerHTML = "";

    productos.forEach(producto => {

        tabla.innerHTML += `
        <tr>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.stock}</td>
        </tr>
        `;

    });

}