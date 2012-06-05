/*
 * Copyright (c) Novedia Group 2012.
 *
 *     This file is part of Hubiquitus.
 *
 *     Hubiquitus is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     Hubiquitus is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with Hubiquitus.  If not, see <http://www.gnu.org/licenses/>.
 */
var logger = require('winston');
var hClient  = require("hubiquitusjs");
var nbOpenedSessions = 0;
var openedSessions = new Array();

/**
 * Callback executed by each session
 */
var hCallback = function(sessionNb, msg){
    if (msg.type == 'hStatus' && msg.data.status == hClient.status.CONNECTED)
        logger.info('Session #' + sessionNb + ' connected');
};

/*
 Each session is launched asynchronously
 */
function launch(opts, hOptions){

    var session = new hClient.HubiquitusClient();
    session.connect(opts.username, opts.password, hCallback.bind(session, nbOpenedSessions), hOptions);

    logger.info('Opening session #'+ nbOpenedSessions);
    openedSessions[nbOpenedSessions++] = session;

    if (opts.sessions>nbOpenedSessions)
        setTimeout(function() { launch(opts, hOptions) } , opts.interval);
}

function main() {

    //logger.handleExceptions();

    var opts = require('tav').set({
        username: {
            note: 'The username to login as'
        }
        ,password: {
            note: 'The password to use'
        }
        ,endpoint: {
            note: 'The hNode Socket.IO endpoint (default: http://localhost:8080/)',
            value: 'http://localhost:8080/'
        }
        ,sessions: {
            note: 'The number of sessions to launch (default: 2)',
            value: 2
        }
        ,interval: {
            note: 'Time to wait before launching each session in ms (default:30)',
            value: 30
        }
        ,logfile: {
            note: 'File to save the log to (default: log.txt)',
            value: 'log.txt'
        }
    });

    var hOptions = {
        transport: 'socketio',
        endpoints: [opts.endpoint]
    };

    logger.add(logger.transports.File, { filename: opts.logfile });

    logger.info('Launching stress with ' + JSON.stringify(opts));

    launch(opts, hOptions);
}

// GO!!
main();
