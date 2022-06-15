var distribuidoras = [];
var editando = false;
var idEditar = 1;

$("#form").submit(function (event){

    event.preventDefault();
    let nombre = $("#nombre").val();
    let descripcion = $("#descripcion").val();
    let web = $("#web").val();
    let fundacion =  $("#fundacion").val();
    let pais = $("#pais").val();

    let errorNombre = nombre.length<3 || nombre.length>50;
    let errorDescripcion = descripcion.length<3 || descripcion.length>512;
    let validoUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(web);
    let errorWeb = (web.length<3 || web.length>198) || !validoUrl;
    let errorFundacion = fundacion<1800 ||  fundacion>2100 || isNaN(fundacion);
    let errorPais = pais === "";

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

    if (errorFundacion) {
        $("#errorFund").show(500).delay(3000).hide(500);
        $("#fundacion").addClass("is-invalid");
        setTimeout(function () {
            $("#fundacion").removeClass('is-invalid');
        }, 4000);
    }

    if (errorPais) {
        $("#errorPais").show(500).delay(3000).hide(500);
        $("#pais").addClass("is-invalid");
        setTimeout(function () {
            $("#pais").removeClass('is-invalid');
        }, 4000);
    }

    if(!errorNombre && !errorDescripcion && !errorFundacion && !errorWeb && !errorPais){

        let distribuidora ={
            nombre: nombre,
            descripcion: descripcion,
            web: web,
            fundacion: fundacion,
            pais: pais
        }

        if(editando){
            distribuidoras[idEditar] = distribuidora;
            editando=false;
            $("#btnform").html("Añadir");
            //Juego creado exitosamente
            $("#alerta").html("Distribuidora editada exitosamente");
            $("#alerta").show(500).delay(3000).hide(500);
        }else{
            distribuidoras.push(distribuidora);
            //Juego creado exitosamente
            $("#alerta").html("Distribuidora creada exitosamente");
            $("#alerta").show(500).delay(3000).hide(500);
        }
        mostrarTabla();
        $('form').trigger("reset");
        $("input").attr("class", "form-control")
        $(".valid-feedback").hide();

    }

})

function eliminar(ide){
    distribuidoras.splice(ide-1,1);
    mostrarTabla();
}

function actualizar(ida){
    editando=true;
    idEditar=ida-1;
    $("#btnform").html("Guardar");
    let distribuidoraEditar = distribuidoras[ida-1];
    $("#nombre").val(distribuidoraEditar.nombre);
    $("#descripcion").val(distribuidoraEditar.descripcion);
    $("#web").val(distribuidoraEditar.web);
    $("#fundacion").val(distribuidoraEditar.fundacion);
    $("#pais").val(distribuidoraEditar.pais);
}

function appendtable(i,distribuidora){
    $('#lista').append('<tr id="'+i+'">'+
        '<td>'+i+'</td>'+
        '<td>'+distribuidora.nombre+'</td>'+
        '<td>'+distribuidora.descripcion+'</td>'+
        '<td>'+distribuidora.web+'</td>'+
        '<td>'+distribuidora.fundacion+'</td>'+
        '<td>'+distribuidora.pais+ '</td>'+
        '<td><a class="btn btn-primary" title="Editar" onclick="actualizar('+i+')"><span class="bi bi-pencil-square"></span></a></td>'+
        '<td><a class="btn btn-danger" title="Borrar" onclick="eliminar('+i+')"><span class="bi bi-trash"></span></a></td>');

}

function mostrarTabla(){
    $("#distbody").empty();
    for(i=0; i<distribuidoras.length;i++){
        appendtable(i+1,distribuidoras[i]);
    }
   }