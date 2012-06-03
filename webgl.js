/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

function init( canvas ) {
    var gl = canvas.getContext( 'experimental-webgl' );

    if ( !gl ) {
        alert( 'Could not initialize WebGL' );
    }

    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    gl.enable( gl.DEPTH_TEST );

    return gl;
}
