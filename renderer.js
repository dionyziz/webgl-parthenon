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
    resize: function( w, h ) {
        this.pMatrix = mat4.create();
        mat4.perspective( 45, W / H, 0.1, 200.0, this.pMatrix );
        this.gl.viewport( 0, 0, W, H );
    },
    init: function( gl, world ) {
        var self = this;

        this.gl = gl;

        this.resize( gl, W, H );
        this.vMatrix = mat4.create();

        setInterval( function() {
            document.title = self.fps + ' fps';
            self.fps = 0;
        }, 1000 );

        this.world = world;
        this.ready = true;
    },
    integrate: function( dt ) {
        playerRotation += deltaPlayer.angle * dt;
        playerLocation[ 0 ] += dt * deltaPlayer.distance * Math.sin( playerRotation );
        playerLocation[ 2 ] -= dt * deltaPlayer.distance * Math.cos( playerRotation );
        mat4.identity( this.vMatrix );
        mat4.rotateY( this.vMatrix, playerRotation );
        mat4.translate( this.vMatrix, [ -playerLocation[ 0 ], -playerLocation[ 1 ], -playerLocation[ 2 ] ] );
    },
    render: function() {
        var self = this;
        var gl = this.gl;

        this.integrate( 0.01 );

        ++this.fps;
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

        for ( var i = 0; i < this.world.length; ++i ) {
            var item = this.world[ i ];
            var bufferSet = item.bufferSet;
            var mvMatrix = mat4.create();

            item.material.use();

            gl.uniformMatrix4fv( item.material.shader.pMatrixUniform, false, this.pMatrix );

            gl.bindBuffer( gl.ARRAY_BUFFER, bufferSet.positionBuffer );
            gl.vertexAttribPointer( item.material.shader.vertexPositionAttribute, bufferSet.positionBuffer.itemSize, gl.FLOAT, false, 0, 0 );

            gl.bindBuffer( gl.ARRAY_BUFFER, bufferSet.normalBuffer );
            gl.vertexAttribPointer( item.material.shader.vertexNormalAttribute, bufferSet.normalBuffer.itemSize, gl.FLOAT, false, 0, 0 );

            gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, bufferSet.indexBuffer );

            mat4.multiply( this.vMatrix, item.mMatrix, mvMatrix );

            gl.uniformMatrix4fv( item.material.shader.mvMatrixUniform, false, mvMatrix );
            gl.drawElements( gl.TRIANGLES, bufferSet.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0 );
        }

        window.webkitRequestAnimationFrame( this.render.bind( this ) );
    },
    begin: function() {
        window.webkitRequestAnimationFrame( this.render.bind( this ) );
    }
};
