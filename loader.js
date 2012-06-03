/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

var gl = init( document.getElementById( 'canvas' ) );
var world = [];
var paper, plastic, skyMaterial;

plastic = new PlasticMaterial( gl, function() {
    Parthenon.create( gl, world );
    Renderer.init( gl, world );
    Renderer.begin();

    /*
    paper = new PaperMaterial( gl, function() {
        sky = new SkyMaterial( gl, function() {
            Parthenon.create( gl, world );
            Renderer.init( gl, world );
            Renderer.begin();
        } );
    } );
    */
} );
