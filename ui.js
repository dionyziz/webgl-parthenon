var W = 600, H = 600;
var canvas = document.getElementById( 'canvas' );

function onresize() {
    W = $( window ).width();
    H = $( window ).height();
    canvas.width = W;
    canvas.height = H;
    if ( Renderer.ready ) {
        Renderer.resize( W, H );
    }
} 
$( window ).resize( onresize );
onresize();

var playerLocation = [ 0, 5.0, 70.0 ];
var playerRotation = 0;
var deltaPlayer = {
    distance: 0,
    angle: 0
};

document.onkeydown = function( e ) {
    switch ( e.keyCode ) {
        case 37: // left
            deltaPlayer.angle = -5;
            break;
        case 39: // right
            deltaPlayer.angle = 5;
            break;
        case 40: // down
            deltaPlayer.distance = -50;
            break;
        case 38: // up
            deltaPlayer.distance = 50;
            break;
    }
};

document.onkeyup = function( e ) {
    switch ( e.keyCode ) {
        case 37: // left
            deltaPlayer.angle = 0;
            break;
        case 39: // right
            deltaPlayer.angle = 0;
            break;
        case 40: // down
            deltaPlayer.distance = 0;
            break;
        case 38: // up
            deltaPlayer.distance = 0;
            break;
    }
}
