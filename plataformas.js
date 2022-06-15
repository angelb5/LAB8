var plataformas = [];
var editando = false;
var idEditar = 1;

$("#form").submit(function (event){

    event.preventDefault();
    let nombre = $("#nombre").val();
    let descripcion = $("#descripcion").val();
    let web = $("#web").val();

    let errorNombre = nombre.length<3 || nombre.length>20;
    let errorDescripcion = descripcion.length<3 || descripcion.length>512;
    let validoUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(web);
    let errorWeb = (web.length<3 || web.length>256) || !validoUrl;

    if (errorNombre) {
        $("#errorNombre").show(500).delay(3000).hide(500);
        $("#nombre").addClass("is-invalid");
        setTimeout(function () {
            $("#nombre").removeClass('is-invalid');
        }, 4000);
    }

    if (errorDescripcion) {
        $("#errorDes").show(500).delay(3000).hide(500);
        $("#descripcion").addClass("is-invalid");
        setTimeout(function () {
            $("#descripcion").removeClass('is-invalid');
        }, 4000);
    }

    if (errorWeb) {
        $("#errorWeb").show(500).delay(3000).hide(500);
        $("#web").addClass("is-invalid");
        setTimeout(function () {
            $("#web").removeClass('is-invalid');
        }, 4000);
    }


    if(!errorNombre && !errorDescripcion && !errorWeb){

        let plataforma ={
            nombre: nombre,
            descripcion: descripcion,
            web: web,
        }

        if(editando){
            plataformas[idEditar] = plataforma;
            editando=false;
            $("#btnform").html("Añadir");
            //Juego creado exitosamente
            $("#alerta").html("Plataforma editada exitosamente");
            $("#alerta").show(500).delay(3000).hide(500);
        }else{
            plataformas.push(plataforma);
            //Juego creado exitosamente
            $("#alerta").html("Plataforma creada exitosamente");
            $("#alerta").show(500).delay(3000).hide(500);
        }
        mostrarTabla();
        $('form').trigger("reset");
        $("input").attr("class", "form-control")
        $(".valid-feedback").hide();

    }

})

function eliminar(ide){
    plataformas.splice(ide-1,1);
    mostrarTabla();
}

function actualizar(ida){
    editando=true;
    idEditar=ida-1;
    $("#btnform1").html("Guardar");
    let platEditar = plataformas[ida-1];
    $("#nombre").val(platEditar.nombre);
    $("#descripcion").val(platEditar.descripcion);
    $("#web").val(platEditar.web);
}

function appendtable(i,plataforma){
    $('#lista').append('<tr id="'+i+'">'+
        '<td>'+i+'</td>'+
        '<td>'+plataforma.nombre+'</td>'+
        '<td>'+plataforma.descripcion+'</td>'+
        '<td>'+plataforma.web+'</td>'+
        '<td><a class="btn btn-primary" title="Editar" onclick="actualizar('+i+')"><span class="bi bi-pencil-square"></span></a></td>'+
        '<td><a class="btn btn-danger" title="Borrar" onclick="eliminar('+i+')"><span class="bi bi-trash"></span></a></td>');

}

function mostrarTabla(){
    $("#distbody").empty();
    for(i=0; i<plataformas.length;i++){
        appendtable(i+1,plataformas[i]);
    }
}