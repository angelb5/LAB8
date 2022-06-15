'use strict'

// Variables Importantes
let form = document.querySelector("form")
let listaInputs = form.querySelectorAll("input, textarea")
let btnCancelar = document.getElementById("cancelar-btn")
let cuerpoTabla = document.getElementsByTagName("tbody")[0]
    
// Validación del formulario
form.addEventListener('submit', event => {
    event.preventDefault()

    if(form.checkValidity()){
        agregarFila()
    }

    form.classList.add('was-validated')
}, false)

// Cancelar (Limpia los inputs)
function limpiar(){
    form.classList.remove('was-validated')

    listaInputs.forEach(input => {
        input.value = ""
    })
    listaInputs[0].value = 0
}
btnCancelar.addEventListener("click", limpiar())

// Agrega una fila a la tabla
function agregarFila(){
    
    let fila, id, foto, image, nombre, descripcion, editar, borrar, boton;

    if(listaInputs[0].value == 0){
        fila = cuerpoTabla.insertRow()

        id = fila.insertCell()
        id.innerText = cuerpoTabla.rows.length

        foto = fila.insertCell()
        image = document.createElement("img")
        image.src = listaInputs[3].value
        foto.append(image)

        nombre = fila.insertCell()
        nombre.innerText = listaInputs[1].value

        descripcion = fila.insertCell()
        descripcion.innerText = listaInputs[2].value

        editar = fila.insertCell()
        editar.innerHTML = "<a id=" + cuerpoTabla.rows.length + " class='btn btn-primary' title='Borrar' href='#'><span class='bi bi-pencil-square'></span></a>"

        borrar = fila.insertCell()
        borrar.innerHTML = "<a id=" + cuerpoTabla.rows.length + " class='btn btn-danger' title='Borrar' href='#'><span class='bi bi-trash'></span></a>"

    } else{
        fila = cuerpoTabla.rows(listaInputs[0].value)

        fila.cells[1] = listaInputs[3].value
        fila.cells[2] = listaInputs[1].value
        fila.cells[3] = listaInputs[2].value
    }
    limpiar()
}