'use strict';

import * as Weather from './general/Weather';
import * as Users from './general/Users';
import * as Lists from './general/Lists';
import * as Tasks from './general/Tasks';

import _ from 'lodash';

let reducers = _.extend({},
    Weather,
    Users,
    Lists,
    Tasks,
);

module.exports= reducers;

