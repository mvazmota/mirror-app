'use strict';

import * as Error from './general/Errors';
import * as Socket from './general/Socket';
import * as Profile from './general/Profile';
import * as Logs from './general/Logs';
import * as Weather from './general/Weather';

import _ from 'lodash';

let reducers = _.extend({},
    Error,
    Profile,
    Weather,
    Logs,
    Socket
);

module.exports= reducers;

