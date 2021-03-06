/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

function SkyMaterial( gl, onload ) {
    Material.call( this, 'sky', gl, onload );
}

SkyMaterial.prototype = {
    constructor: 'SkyMaterial',
    textureObject: null,
    downloadData: function( callback ) {
        var sources = [ 'right', 'left', 'top', 'bottom', 'front', 'back' ];
        var loaded = 0;
        var skyImages = [];
        var self = this;

        this.textureObject = this.gl.createTexture();

        for ( var i = 0; i < sources.length; ++i ) {
            skyImages[ i ] = new Image();
            skyImages[ i ].onload = function() {
                ++loaded;

                if ( loaded == 6 ) {
                    self.gl.bindTexture( self.gl.TEXTURE_CUBE_MAP, self.textureObject );
                    self.gl.pixelStorei( self.gl.UNPACK_FLIP_Y_WEBGL, false );
                    for ( var j = 0; j < skyImages.length; ++j ) {
                        self.gl.texImage2D(
                            self.gl.TEXTURE_CUBE_MAP_POSITIVE_X + j,
                            0,
                            self.gl.RGBA,
                            self.gl.RGBA,
                            self.gl.UNSIGNED_BYTE,
                            skyImages[ j ]
                        );
                    }
                    self.gl.texParameteri( self.gl.TEXTURE_CUBE_MAP, self.gl.TEXTURE_MAG_FILTER, self.gl.LINEAR );
                    self.gl.texParameteri( self.gl.TEXTURE_CUBE_MAP, self.gl.TEXTURE_MIN_FILTER, self.gl.LINEAR );
                    self.gl.texParameteri( self.gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
                    self.gl.texParameteri( self.gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
                    self.gl.bindTexture( self.gl.TEXTURE_CUBE_MAP, null );

                    callback();
                }
            };

            skyImages[ i ].src = 'materials/sky/cubemap-sunset/' + sources[ i ] + '.jpg';
        }
    },
    populateUniforms: function( bufferSet ) {
        this.gl.bindBuffer( gl.ARRAY_BUFFER, bufferSet.uvwBuffer );
        this.gl.vertexAttribPointer( this.shader.textureCoordAttribute, bufferSet.uvwBuffer.itemSize, gl.FLOAT, false, 0, 0 );

        this.gl.activeTexture( this.gl.TEXTURE0 );
        this.gl.bindTexture( this.gl.TEXTURE_CUBE_MAP, this.textureObject );
        
        this.gl.uniform1i( this.shader.samplerUniform, 0 );
    },
    populateUniformLocations: function() {
        this.shader.samplerUniform = this.gl.getUniformLocation( this.shader, 'uSampler' );
        this.shader.textureCoordAttribute = this.gl.getAttribLocation( this.shader, 'aTextureCoord' );
    },
    enableAttributes: function() {
        this.gl.enableVertexAttribArray( this.shader.textureCoordAttribute );
    },
    disableAttributes: function() {
        this.gl.disableVertexAttribArray( this.shader.textureCoordAttribute );
    },
    drawEnd: function() {
        // this.gl.activeTexture( null );
    }
};

SkyMaterial.extends( Material );
