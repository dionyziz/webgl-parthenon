/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

function wget( url, callback ) {
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open( "GET", url, true );
    xmlHTTP.onreadystatechange = function() {
        if ( xmlHTTP.readyState != 4 ) {
            return;
        }
        callback( xmlHTTP.responseText );
    }
    xmlHTTP.send();
}
