'use strict';

export function makeCorsRequest(url) {
    // This is a sample server that supports CORS.

    let xhr = createCORSRequest('GET', url);
    if (!xhr) {
        console.log('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function() {
        let text = xhr.responseText;
        console.log('Response from CORS request to ' + url + ': ' + text);
    };

    xhr.onerror = function() {
        console.log('Woops, there was an error making the request.');
    };
    console.log("CORS request");
    xhr.send();

    return xhr;
}


function createCORSRequest(method, url) {
    let xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {

        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open(method, url, true);

    } else if (typeof XDomainRequest != "undefined") {

        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        xhr.open(method, url);

    } else {

        // Otherwise, CORS is not supported by the browser.
        xhr = null;

    }
}

