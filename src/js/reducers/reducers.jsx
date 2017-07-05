'use strict';

import * as Weather from './general/Weather';
import * as Users from './general/Users';
import * as Lists from './general/Lists';
import * as Tasks from './general/Tasks';
import * as Calendars from './general/Calendars';

import _ from 'lodash';

let reducers = _.extend({},
    Weather,
    Users,
    Lists,
    Tasks,
    Calendars,
);

module.exports= reducers;

