wget( 'shaders/fragment.c', function ( src ) {
    var fragmentShaderSrc = src;
    wget( 'shaders/vertex.c', function ( src ) {
        var vertexShaderSrc = src;
        var gl = init( document.getElementById( 'canvas' ), fragmentShaderSrc, vertexShaderSrc );
        Renderer.init( gl );
    } );
} );
