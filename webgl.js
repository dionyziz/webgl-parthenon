function init( canvas, fragmentShaderSrc, vertexShaderSrc ) {
    var gl = canvas.getContext( 'experimental-webgl' );

    if ( !gl ) {
        alert( 'Could not initialize WebGL' );
    }
    gl.shaderProgram = initShaders( gl, fragmentShaderSrc, vertexShaderSrc );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    gl.enable( gl.DEPTH_TEST );
    return gl;
}

function initShaders( gl, fragmentShaderSrc, vertexShaderSrc ) {
    fragmentShader = gl.createShader( gl.FRAGMENT_SHADER );
    vertexShader = gl.createShader( gl.VERTEX_SHADER );
    gl.shaderSource( fragmentShader, fragmentShaderSrc );
    gl.shaderSource( vertexShader, vertexShaderSrc );
    gl.compileShader( fragmentShader );
    if ( !gl.getShaderParameter( fragmentShader, gl.COMPILE_STATUS ) ) {
        alert( 'Failed to compile fragment shader: ' + gl.getShaderInfoLog( fragmentShader ) );
    }
    gl.compileShader( vertexShader );
    if ( !gl.getShaderParameter( vertexShader, gl.COMPILE_STATUS ) ) {
        alert( 'Failed to compile vertex shader: ' + gl.getShaderInfoLog( vertexShader ) );
    }

    var shaderProgram = gl.createProgram();

    gl.attachShader( shaderProgram, vertexShader );
    gl.attachShader( shaderProgram, fragmentShader );
    gl.linkProgram( shaderProgram );

    if ( !gl.getProgramParameter( shaderProgram, gl.LINK_STATUS ) ) {
        alert( 'Linking shaders failed' );
    }

    gl.useProgram( shaderProgram );

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation( shaderProgram, 'aVertexPosition' );
    gl.enableVertexAttribArray( shaderProgram.vertexPositionAttribute );

    shaderProgram.vertexNormalAttribute = gl.getAttribLocation( shaderProgram, 'aVertexNormal' );
    gl.enableVertexAttribArray( shaderProgram.vertexNormalAttribute );

    shaderProgram.pMatrixUniform = gl.getUniformLocation( shaderProgram, 'uPMatrix' );
    shaderProgram.mvMatrixUniform = gl.getUniformLocation( shaderProgram, 'uMVMatrix' );

    return shaderProgram;
}
