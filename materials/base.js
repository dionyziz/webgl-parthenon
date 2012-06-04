/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

function Material( url, gl, onload ) {
    console.log( 'Constructing material ' + this.constructor );

    assert( gl instanceof WebGLRenderingContext );

    var self = this;

    this.gl = gl;

    this.fragmentShader = gl.createShader( gl.FRAGMENT_SHADER );
    this.vertexShader = gl.createShader( gl.VERTEX_SHADER );

    this.onload = onload;

    this.download( url );
}

Material.prototype = {
    constructor: 'Material',
    onload: null,
    shader: null,
    vertexShader: null,
    fragmentShader: null,
    gl: null,
    downloadData: function( callback ) {
        // overwrite me
        callback();
    },
    download: function( url ) {
        assert( url != '' );

        var self = this;

        this.downloadData( function() {
            wget( 'materials/' + url + '/fragment.c', function ( src ) {
                var fragmentShaderSrc = src;
                wget( 'materials/' + url + '/vertex.c', function ( src ) {
                    var vertexShaderSrc = src;
                    console.log( 'Shader source downloaded and ready to compile' );
                    self.initShaders( vertexShaderSrc, fragmentShaderSrc );
                    self.onload();
                } );
            } );
        } );
    },
    use: function() {
        this.gl.useProgram( this.shader );
    },
    populateUniformLocations: function() {
        // overwrite me
    },
    initShaders: function( vertexShaderSrc, fragmentShaderSrc ) {
        console.log( 'Compiling shaders for material ' + this.constructor );

        assert( vertexShaderSrc != '' );
        assert( fragmentShaderSrc != '' );

        var gl = this.gl;

        gl.shaderSource( this.fragmentShader, fragmentShaderSrc );
        gl.shaderSource( this.vertexShader, vertexShaderSrc );
        gl.compileShader( this.fragmentShader );
        if ( !gl.getShaderParameter( this.fragmentShader, gl.COMPILE_STATUS ) ) {
            alert( 'Failed to compile fragment shader of material ' + this.constructor + ': \n' + gl.getShaderInfoLog( this.fragmentShader ) );
        }
        gl.compileShader( this.vertexShader );
        if ( !gl.getShaderParameter( this.vertexShader, gl.COMPILE_STATUS ) ) {
            alert( 'Failed to compile vertex shader of material ' + this.constructor + ': \n' + gl.getShaderInfoLog( this.vertexShader ) );
        }

        this.shader = gl.createProgram();

        assert( this.shader instanceof WebGLProgram );

        gl.attachShader( this.shader, this.vertexShader );
        gl.attachShader( this.shader, this.fragmentShader );
        gl.linkProgram( this.shader );

        gl.useProgram( this.shader );

        if ( !gl.getProgramParameter( this.shader, gl.LINK_STATUS ) ) {
            alert( 'Linking shaders of material ' + this.constructor + ' failed' );
        }

        this.shader.vertexPositionAttribute = gl.getAttribLocation( this.shader, 'aVertexPosition' );
        this.shader.vertexNormalAttribute = gl.getAttribLocation( this.shader, 'aVertexNormal' );

        this.shader.pMatrixUniform = gl.getUniformLocation( this.shader, 'uPMatrix' );
        this.shader.mvMatrixUniform = gl.getUniformLocation( this.shader, 'uMVMatrix' );
        this.shader.vMatrixUniform = gl.getUniformLocation( this.shader, 'uVMatrix' );

        this.populateUniformLocations();
    },
    populateUniforms: function( bufferset ) {
        // overwrite me
    },
    enableAttributes: function( bufferset ) {
        // overwrite me
    },
    drawBegin: function( pMatrix, vMatrix, mvMatrix, bufferSet ) {
        assert( this.shader instanceof WebGLProgram, 'Material ' + this.constructor + ' tried to draw without a valid shader.' );
        var gl = this.gl;

        this.use();

        if ( this.shader.mvMatrixUniform instanceof WebGLUniformLocation ) {
            gl.uniformMatrix4fv( this.shader.mvMatrixUniform, false, mvMatrix );
        }
        if ( this.shader.vMatrixUniform instanceof WebGLUniformLocation ) {
            gl.uniformMatrix4fv( this.shader.vMatrixUniform, false, vMatrix );
        }
        if ( this.shader.pMatrixUniform instanceof WebGLUniformLocation ) {
            gl.uniformMatrix4fv( this.shader.pMatrixUniform, false, pMatrix );
        }

        this.populateUniforms( bufferSet );
        this.enableAttributes( bufferSet );

        if ( this.shader.vertexPositionAttribute >= 0 ) {
            gl.enableVertexAttribArray( this.shader.vertexPositionAttribute );
        }
        if ( this.shader.vertexNormalAttribute >= 0 ) {
            gl.enableVertexAttribArray( this.shader.vertexNormalAttribute );
        }

        if ( this.shader.vertexPositionAttribute >= 0 ) {
            gl.bindBuffer( gl.ARRAY_BUFFER, bufferSet.positionBuffer );
            gl.vertexAttribPointer( this.shader.vertexPositionAttribute, bufferSet.positionBuffer.itemSize, gl.FLOAT, false, 0, 0 );
        }

        if ( this.shader.vertexNormalAttribute >= 0 ) {
            gl.bindBuffer( gl.ARRAY_BUFFER, bufferSet.normalBuffer );
            gl.vertexAttribPointer( this.shader.vertexNormalAttribute, bufferSet.normalBuffer.itemSize, gl.FLOAT, false, 0, 0 );
        }
    },
    disableAttributes: function( bufferset ) {
        // overwrite me
    },
    drawEnd: function( bufferSet ) {
        if ( this.shader.vertexPositionAttribute >= 0 ) {
            gl.disableVertexAttribArray( this.shader.vertexPositionAttribute );
        }
        if ( this.shader.vertexNormalAttribute >= 0 ) {
            gl.disableVertexAttribArray( this.shader.vertexNormalAttribute );
        }

        this.disableAttributes( bufferSet );
    }
};
