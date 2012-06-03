/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

function Material( url, gl, onload ) {
    var self = this;

    this.gl = gl;
    this.url = url;

    this.fragmentShader = gl.createShader( gl.FRAGMENT_SHADER );
    this.vertexShader = gl.createShader( gl.VERTEX_SHADER );

    this.onload = onload;

    wget( 'shaders/' + url + '/fragment.c', function ( src ) {
        var fragmentShaderSrc = src;
        wget( 'shaders/' + url + '/vertex.c', function ( src ) {
            var vertexShaderSrc = src;
            self.initShaders( vertexShaderSrc, fragmentShaderSrc );
            self.onload();
        } );
    } );
}

Material.prototype = {
    constructor: 'Material',
    onload: null,
    shader: null,
    vertexShader: null,
    fragmentShader: null,
    gl: null,
    use: function() {
        this.gl.useProgram( this.shader );
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

        gl.useProgram( this.shader );

        this.shader.vertexPositionAttribute = gl.getAttribLocation( this.shader, 'aVertexPosition' );
        gl.enableVertexAttribArray( this.shader.vertexPositionAttribute );

        this.shader.vertexNormalAttribute = gl.getAttribLocation( this.shader, 'aVertexNormal' );
        gl.enableVertexAttribArray( this.shader.vertexNormalAttribute );

        this.shader.pMatrixUniform = gl.getUniformLocation( this.shader, 'uPMatrix' );
        this.shader.mvMatrixUniform = gl.getUniformLocation( this.shader, 'uMVMatrix' );
    }
};
