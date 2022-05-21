// Establecer la conexion
var socket = io();

var label = $('#lblNuevoTicket');

// Escuchar 
socket.on('connect', function() {
    console.log('Conectado al servidor');
});


socket.on('disconnect', function() {
    console.log('Conexión perdida');
});

socket.on('estadoActual', function(resp) {

    console.log(resp);
    label.text(resp.actual);

});

$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(siguienteTicket) {

        label.text(siguienteTicket);

    });

});