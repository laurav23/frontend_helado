$(document).ready(function(){
    traerDatos();
})

function traerDatos(){
    $.ajax({
        url:'http://localhost/backend_helado/index.php',
        method: 'GET',
        dataType: 'json',
        success: function(result) {
            var detalle = "";
            $.each(result, function(i) {
                detalle += "<tr>";
                detalle += "<th scope='row'>" + result[i].id + " </th>";
                detalle += "<td>" + result[i].nombre + "</td>";
                detalle += "<td>" + result[i].cantidad + "</td>";
                detalle += "<td>" + result[i].sabores + "</td>";
                detalle += "<td><button type='button' class='btn btn-outline-success' data-bs-toggle='modal' data-bs-target='#exampleModal' onClick='traerInfo(" + result[i].id + ")'>Actualizar</button>" +
                    "<button type='button' class='btn btn-outline-danger' onClick='eliminar(" + result[i].id + ")'>Eliminar</button></td>";
                detalle += "</tr>";
            });
            $("#tabla_barbie").html(detalle);
        },
        error: function(result) {
            console.error("Este callback maneja los errores", result);
        },
    });
}

function guardarDatos() {
    event.preventDefault();
    var formData = new FormData();
    formData.append('id', $('#id').val()); // Agregar el ID al FormData
    formData.append('nombre', $('#inputNombre').val());
    formData.append('cantidad', $('#inputCantidad').val());
    formData.append('sabores', $('#inputSabores').val());

    if ($('#id').val() === '') {
        $.ajax({
            url: 'http://localhost/backend_helado/index.php',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(result) {
                console.log('Registro guardado correctamente');
                $('#exampleModal').modal('hide');
                limpiarTabla();
                traerDatos();
            },
            error: function(result) {
                console.error("Este callback maneja los errores", result);
            },
        });
    } else {
        var data = {
            id: $('#id').val(),
            nombre: $('#inputNombre').val(),
            cantidad: $('#inputCantidad').val(),
            sabores: $('#inputSabores').val(),
        };

        $.ajax({
            url: 'http://localhost/backend_helado/index.php',
            method: 'PUT',
            data: JSON.stringify(data), // Enviar el objeto como JSON
            contentType: 'application/json',
            success: function(result) {
                console.log('Registro actualizado correctamente');
                $('#exampleModal').modal('hide');
                limpiarTabla();
                traerDatos();
            },
            error: function(result) {
                console.error("Este callback maneja los errores", result);
            },
        });

    }
}



function traerInfo(id) {
    $.ajax({
        url: 'http://localhost/backend_helado/index.php',
        method: 'GET',
        data: { id: id },
        dataType: 'json',
        success: function(result) {
            
            $('#id').val(result[0].id);
            $('#inputNombre').val(result[0].nombre);
            $('#inputCantidad').val(result[0].cantidad);
            $('#inputSabores').val(result[0].sabores);
        },
        error: function(result) {
            console.error("Este callback maneja los errores", result);
        },
    });
}


function eliminar(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
        $.ajax({
            url: 'http://localhost/backend_helado/index.php',
            method: 'DELETE',
            data: JSON.stringify({ id: id }),
            contentType: 'application/json',
            success: function(result) {
                console.log('Contacto eliminado correctamente');
                limpiarTabla();
                traerDatos();
            },
            error: function(result) {
                console.error('Error al eliminar contacto:', result.statusText);
            },
        });
    }
}



function limpiarTabla() {
    $('#tabla_barbie tr').each(function(i, row) {
        if (i > 0) {
            $(row).remove();
        }
    });
}
