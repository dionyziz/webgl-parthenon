/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

function MarbleMaterial( gl, onload ) {
    Material.call( this, 'marble', gl, onload );
}

MarbleMaterial.prototype = {
    constructor: 'MarbleMaterial',
    textureObject: null,
    downloadData: function( callback ) {
        var self = this;
        var img = new Image();

        this.textureObject = gl.createTexture();
        img.onload = function() {
            self.gl.bindTexture( self.gl.TEXTURE_2D, self.textureObject );
            self.gl.pixelStorei( self.gl.UNPACK_FLIP_Y_WEBGL, false );
            self.gl.texImage2D(
                self.gl.TEXTURE_2D,
                0,
                self.gl.RGBA,
                self.gl.RGBA,
                self.gl.UNSIGNED_BYTE,
                img
            );
            self.gl.texParameteri( self.gl.TEXTURE_2D, self.gl.TEXTURE_MAG_FILTER, self.gl.LINEAR );
            self.gl.texParameteri( self.gl.TEXTURE_2D, self.gl.TEXTURE_MIN_FILTER, self.gl.LINEAR );
            callback();
        };
        img.src = 'materials/marble/marble.jpg';
    },
    populateUniforms: function( bufferSet ) {
        var lightLocation = [ 15.0, 10.0, 54.0 ];
        this.gl.uniform3fv( this.shader.lightSourceUniform, lightLocation );

        this.gl.bindBuffer( gl.ARRAY_BUFFER, bufferSet.uvBuffer );
        assert( bufferSet.uvBuffer instanceof WebGLBuffer );
        this.gl.vertexAttribPointer( this.shader.textureCoordAttribute, bufferSet.uvBuffer.itemSize, gl.FLOAT, false, 0, 0 );

        this.gl.activeTexture( this.gl.TEXTURE0 );
        this.gl.bindTexture( this.gl.TEXTURE_2D, this.textureObject );
        
        this.gl.uniform1i( this.shader.samplerUniform, 0 );
    },
    populateUniformLocations: function() {
        this.shader.samplerUniform = this.gl.getUniformLocation( this.shader, 'uSampler' );
        this.shader.lightSourceUniform = this.gl.getUniformLocation( this.shader, 'uLightSource' );

        console.log( 'Enabling UV shader attribute for material ' + this.constructor );
        this.shader.textureCoordAttribute = this.gl.getAttribLocation( this.shader, 'aTextureCoord' );
        console.log( this.shader.textureCoordAttribute );
    },
    enableAttributes: function() {
        this.gl.enableVertexAttribArray( this.shader.textureCoordAttribute );
    },
    disableAttributes: function() {
        this.gl.disableVertexAttribArray( this.shader.textureCoordAttribute );
    }
};

MarbleMaterial.extend( Material );
