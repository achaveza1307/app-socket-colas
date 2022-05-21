// Establecer la conexion
var socket = io();

// Escuchar 
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Conexión perdida');
});

// Para obtener los parametros que vienen por URL
var searchParams = new URLSearchParams(window.location.search);
var label = $('small');

if (!searchParams.has('escritorio')) {

    window.location = 'index.html';
    throw new Error('Se requiere el escritorio');

}

var escritorio = searchParams.get('escritorio');
console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay tickets que atender') {

            label.text(resp);
            alert(resp);
            return;

        }

        label.text('Ticket ' + resp.numero);

    });

});