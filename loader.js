/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

var gl = init( document.getElementById( 'canvas' ) );
var world = [];
var materials = {};

Parthenon.init( gl, world );
Renderer.init( gl, world );
Renderer.begin();

materials.paper = new PaperMaterial( gl, function() {
    Parthenon.createGround();
} );
// materials.marble = new MarbleMaterial( gl, function() {
    materials.plastic = new PlasticMaterial( gl, function() {
        Parthenon.create();
    } );
// } );
materials.sky = new SkyMaterial( gl, function() {
    Parthenon.createSky();
} );
