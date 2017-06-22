'use strict';

export function socket(state = [], action) {
    switch(action.type){
        case 'SOCKET':
            switch(Object.keys(action.response)[0]){
                case 'box':
                    return {
                        [action.response[Object.keys(action.response)[1]]]
                            :
                        action.response[Object.keys(action.response)[0]]
                    };
            }
            break;
        default:
            return state;
    }
}
