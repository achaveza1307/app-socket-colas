// Establecer la conexion
var socket = io();


var spanT1 = $('#lblTicket1');
var spanT2 = $('#lblTicket2');
var spanT3 = $('#lblTicket3');
var spanT4 = $('#lblTicket4');

var spanE1 = $('#lblEscritorio1');
var spanE2 = $('#lblEscritorio2');
var spanE3 = $('#lblEscritorio3');
var spanE4 = $('#lblEscritorio4');

var spanTickets = [spanT1, spanT2, spanT3, spanT4];
var spanEscritorios = [spanE1, spanE2, spanE3, spanE4];

// Escuchar 
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Conexión perdida');
});

socket.on('estadoActual', function(data) {
    //console.log(data);
    actualizaHTML(data.ultimos);
});

socket.on('ultimos4', function(data) {

    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    actualizaHTML(data.ultimos);
});


function actualizaHTML(ultimos) {

    for (var pos = 0; pos < ultimos.length; pos++) {

        spanTickets[pos].text('Ticket ' + ultimos[pos].numero);
        spanEscritorios[pos].text('Escritorio ' + ultimos[pos].escritorio);

    }

}