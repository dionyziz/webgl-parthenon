/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

function Material( url, gl, onload ) {
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
        var self = this;

        this.downloadData( function() {
            wget( 'materials/' + url + '/fragment.c', function ( src ) {
                var fragmentShaderSrc = src;
                wget( 'materials/' + url + '/vertex.c', function ( src ) {
                    var vertexShaderSrc = src;
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
        var gl = this.gl;

        gl.shaderSource( this.fragmentShader, fragmentShaderSrc );
        gl.shaderSource( this.vertexShader, vertexShaderSrc );
        gl.compileShader( this.fragmentShader );
        if ( !gl.getShaderParameter( this.fragmentShader, gl.COMPILE_STATUS ) ) {
            alert( 'Failed to compile fragment shader: ' + gl.getShaderInfoLog( this.fragmentShader ) );
        }
        gl.compileShader( this.vertexShader );
        if ( !gl.getShaderParameter( this.vertexShader, gl.COMPILE_STATUS ) ) {
            alert( 'Failed to compile vertex shader: ' + gl.getShaderInfoLog( this.vertexShader ) );
        }

        this.shader = gl.createProgram();

        gl.attachShader( this.shader, this.vertexShader );
        gl.attachShader( this.shader, this.fragmentShader );
        gl.linkProgram( this.shader );

        if ( !gl.getProgramParameter( this.shader, gl.LINK_STATUS ) ) {
            alert( 'Linking shaders failed' );
        }

        this.shader.vertexPositionAttribute = gl.getAttribLocation( this.shader, 'aVertexPosition' );
        // console.log( this.shader.vertexPositionAttribute );;
        gl.enableVertexAttribArray( this.shader.vertexPositionAttribute );

        this.shader.vertexNormalAttribute = gl.getAttribLocation( this.shader, 'aVertexNormal' );
        gl.enableVertexAttribArray( this.shader.vertexNormalAttribute );

        this.shader.pMatrixUniform = gl.getUniformLocation( this.shader, 'uPMatrix' );
        this.shader.mvMatrixUniform = gl.getUniformLocation( this.shader, 'uMVMatrix' );
        this.shader.vMatrixUniform = gl.getUniformLocation( this.shader, 'uVMatrix' );

        this.populateUniformLocations();
    },
    populateUniforms: function() {
        // overwrite me
    },
    drawBegin: function( pMatrix, vMatrix, mvMatrix, bufferSet ) {
        var gl = this.gl;

        this.use();

        gl.uniformMatrix4fv( this.shader.mvMatrixUniform, false, mvMatrix );
        gl.uniformMatrix4fv( this.shader.vMatrixUniform, false, vMatrix );
        gl.uniformMatrix4fv( this.shader.pMatrixUniform, false, pMatrix );

        this.populateUniforms( bufferSet );

        gl.bindBuffer( gl.ARRAY_BUFFER, bufferSet.positionBuffer );
        gl.vertexAttribPointer( this.shader.vertexPositionAttribute, bufferSet.positionBuffer.itemSize, gl.FLOAT, false, 0, 0 );

        gl.bindBuffer( gl.ARRAY_BUFFER, bufferSet.normalBuffer );
        gl.vertexAttribPointer( this.shader.vertexNormalAttribute, bufferSet.normalBuffer.itemSize, gl.FLOAT, false, 0, 0 );
    },
    drawEnd: function() {
        // overwrite me
    }
};
