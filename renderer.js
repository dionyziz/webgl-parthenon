var Renderer = {
    fps: 0,
    pMatrix: null,
    vMatrix: null,
    world: [],
    createWorld: function( gl ) {
        var COLUMNS_FRONT = 8;

        for ( var i = 0; i < COLUMNS_FRONT; ++i ) {
            var col = new Item( gl, cylinder( 10, 10.43, 1 ) );
            col.move( 4 * i, 0, 0 );
            this.world.push( col );
        }
    },
    init: function( gl ) {
        this.pMatrix = mat4.create();
        this.vMatrix = mat4.create();

        mat4.perspective( 45, W / H, 0.1, 100.0, this.pMatrix );
        mat4.identity( this.vMatrix );
        mat4.translate( this.vMatrix, [ 0.0, 0.0, -14.0 ] );

        setInterval( function() {
            document.title = this.fps + ' fps';
            this.fps = 0;
        }, 1000 );

        this.createWorld( gl );
        this.render( gl );
    },
    render: function( gl ) {
        var self = this;

        this.fps = this.fps + 1;
        gl.viewport( 0, 0, W, H );
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

        gl.uniformMatrix4fv( gl.shaderProgram.pMatrixUniform, false, this.pMatrix );

        mat4.translate( this.vMatrix, vec3.create( xyz ) );

        for ( var i = 0; i < this.world.length; ++i ) {
            var entity = this.world[ i ];
            var mvMatrix = mat4.create();

            gl.bindBuffer( gl.ARRAY_BUFFER, entity.positionBuffer );
            gl.vertexAttribPointer( gl.shaderProgram.vertexPositionAttribute, entity.positionBuffer.itemSize, gl.FLOAT, false, 0, 0 );

            gl.bindBuffer( gl.ARRAY_BUFFER, entity.normalBuffer );
            gl.vertexAttribPointer( gl.shaderProgram.vertexNormalAttribute, entity.normalBuffer.itemSize, gl.FLOAT, false, 0, 0 );

            gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, entity.indexBuffer );

            mat4.multiply( this.vMatrix, entity.mMatrix, mvMatrix );

            gl.uniformMatrix4fv( gl.shaderProgram.mvMatrixUniform, false, mvMatrix );
            gl.drawElements( gl.TRIANGLES, entity.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0 );
        }

        window.webkitRequestAnimationFrame( function() {
            self.render( gl );
        } );
    }
};
