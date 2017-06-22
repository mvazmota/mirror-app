'use strict';
import Echo from 'laravel-echo';
import {socketListener} from './actions/Socket';

class Socket {
    constructor(){
        this.echo = window.Echo = new Echo({
            broadcaster: 'socket.io',
            host: 'http://213.32.68.21:6001'
        });
    }

    connect(channel, listener) {
        this.echo.channel(channel).listen(listener, function (data) {
            socketListener(data, listener);
        });
    }
}

export default (new Socket);
