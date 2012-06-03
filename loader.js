/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

var gl = init( document.getElementById( 'canvas' ) );
var world = [];
var paper = new Material( 'paper', gl, function() {
    Parthenon.create( gl, world );
    Renderer.init( gl, world );
    Renderer.begin();
} );
