/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

var gl = init( document.getElementById( 'canvas' ) );
var world = [];
var materials = {};

Parthenon.init( gl, world );
Renderer.init( gl, world );
Renderer.begin();

materials.grass = new GrassMaterial( gl, function() {
    Parthenon.createGround();
} );
materials.pediment = new PedimentMaterial( gl, function() {
    materials.column = new ColumnMaterial( gl, function() {
        materials.marble = new MarbleMaterial( gl, function() {
            materials.plastic = new PlasticMaterial( gl, function() {
                Parthenon.create();
            } );
        } );
    } );
} );
materials.sky = new SkyMaterial( gl, function() {
    Parthenon.createSky();
} );
