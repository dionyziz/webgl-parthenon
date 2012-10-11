/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

function PlasticMaterial( gl, onload ) {
    Material.call( this, 'plastic', gl, onload );
}

PlasticMaterial.prototype = {
    constructor: 'PlasticMaterial',
    populateUniforms: function( bufferSet ) {
        var lightLocation = [ 15.0, 10.0, 54.0 ];
        this.gl.uniform3fv( this.shader.lightSourceUniform, lightLocation );
    },
    populateUniformLocations: function() {
        this.shader.lightSourceUniform = this.gl.getUniformLocation( this.shader, 'uLightSource' );
        // console.log( this.shader.lightSourceUniform );
    }
};

PlasticMaterial.extends( Material );
