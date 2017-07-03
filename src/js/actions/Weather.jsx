'use strict';

import weatherApi from 'openweather-apis';
import query_string from 'query-string';
import Auth from '../auth';

//ACTION CREATORS
export function weatherSuccess(response) {
    return {
        type: 'WEATHER_SUCCESS',
        response
    };
}

export function weatherHasErrored(bool) {
    return {
        type: 'WEATHER_HAS_ERRORED',
        hasErrored: bool
    };
}

export function weatherIsLoading(bool) {
    return {
        type: 'WEATHER_IS_LOADING',
        isLoading: bool
    };
}

//ACTION CALLS
export function weather() {
    weatherApi.setLang('en');
    weatherApi.setCoordinate(40.6393791, -8.6621376);
    weatherApi.setUnits('metric');
    weatherApi.setAPPID('8b52c919461520227195355ddb686533');

    return (dispatch) => {
        dispatch(weatherIsLoading(true));
        weatherApi.getAllWeather(function(err, temp){
            if(err){
                dispatch(weatherHasErrored(true));
            }else{
                dispatch(weatherSuccess(temp));
            }
        });
    };
}

