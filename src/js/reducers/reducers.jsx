'use strict';

import * as Weather from './general/Weather';
import * as Users from './general/Users';

import _ from 'lodash';

let reducers = _.extend({},
    Weather,
    Users,
);

module.exports= reducers;

