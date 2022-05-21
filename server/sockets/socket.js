const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let nextT = ticketControl.siguiente();

        console.log(nextT);
        callback(nextT);

    });

    client.emit('estadoActual', {
        actual: ticketControl.ultimoTicket(),
        ultimos: ticketControl.ultimos4Tickets()
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                message: 'Se requiere un escritorio'
            });
        }

        let atenderT = ticketControl.atenderTicket(data.escritorio);

        // Retornar la informacion para el usuario del front-end
        callback(atenderT);

        // Actualizar/notificar cambios en ultimos4
        client.broadcast.emit('ultimos4', {
            ultimos: ticketControl.ultimos4Tickets()
        });

    });

});