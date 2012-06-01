/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

var Renderer = {
    gl: null,
    fps: 0,
    pMatrix: null,
    vMatrix: null,
    world: [],
    ready: false,
    createWorld: function() {
        Parthenon.create( this.gl, this.world );
    },
    resize: function( w, h ) {
        this.pMatrix = mat4.create();
        mat4.perspective( 45, W / H, 0.1, 200.0, this.pMatrix );
        this.gl.viewport( 0, 0, W, H );
    },
    init: function( gl ) {
        var self = this;

        this.gl = gl;

        this.resize( gl, W, H );
        this.vMatrix = mat4.create();

        mat4.identity( this.vMatrix );
        mat4.translate( this.vMatrix, [ 0.0, -5.0, -64.0 ] );

        setInterval( function() {
            document.title = self.fps + ' fps';
            self.fps = 0;
        }, 1000 );

        this.createWorld( gl );
        this.ready = true;
        this.render( gl );
    },
    render: function() {
        var self = this;
        var gl = this.gl;

        ++this.fps;
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

        gl.uniformMatrix4fv( gl.shaderProgram.pMatrixUniform, false, this.pMatrix );

        mat4.translate( this.vMatrix, vec3.create( xyz ) );

        for ( var i = 0; i < this.world.length; ++i ) {
            var item = this.world[ i ];
            var bufferSet = item.bufferSet;
            var mvMatrix = mat4.create();

            gl.bindBuffer( gl.ARRAY_BUFFER, bufferSet.positionBuffer );
            gl.vertexAttribPointer( gl.shaderProgram.vertexPositionAttribute, bufferSet.positionBuffer.itemSize, gl.FLOAT, false, 0, 0 );

            gl.bindBuffer( gl.ARRAY_BUFFER, bufferSet.normalBuffer );
            gl.vertexAttribPointer( gl.shaderProgram.vertexNormalAttribute, bufferSet.normalBuffer.itemSize, gl.FLOAT, false, 0, 0 );

            gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, bufferSet.indexBuffer );

            mat4.multiply( this.vMatrix, item.mMatrix, mvMatrix );

            gl.uniformMatrix4fv( gl.shaderProgram.mvMatrixUniform, false, mvMatrix );
            gl.drawElements( gl.TRIANGLES, bufferSet.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0 );
        }

        window.webkitRequestAnimationFrame( this.render.bind( this ) );
    }
};
