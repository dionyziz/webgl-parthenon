var W = 600, H = 600;
var canvas;

function onresize() {
    W = $( window ).width();
    H = $( window ).height();
    canvas.width = W;
    canvas.height = H;
} 
$( window ).resize( onresize );
onresize();

var xyz = [ 0, 0, 0 ];

document.onkeydown = function( e ) {
    switch ( e.keyCode ) {
        case 37: // left
            xyz[ 0 ] = -1;
            break;
        case 39: // right
            xyz[ 0 ] = 1;
            break;
        case 40: // down
            xyz[ 2 ] = 1;
            break;
        case 38: // up
            xyz[ 2 ] = -1;
            break;
    }
};

document.onkeyup = function( e ) {
    switch ( e.keyCode ) {
        case 37: // left
            xyz[ 0 ] = 0;
            break;
        case 39: // right
            xyz[ 0 ] = 0;
            break;
        case 40: // down
            xyz[ 2 ] = 0;
            break;
        case 38: // up
            xyz[ 2 ] = 0;
            break;
    }
}
