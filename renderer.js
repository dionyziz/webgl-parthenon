/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

var Renderer = {
    gl: null,
    fps: 0,
    t: 0,
    pMatrix: null,
    vMatrix: null,
    mvMatrix: null,
    world: [],
    ready: false,
    resize: function( w, h ) {
        this.pMatrix = mat4.create();
        mat4.perspective( 45, W / H, 0.1, 200.0, this.pMatrix );
        this.gl.viewport( 0, 0, W, H );
    },
    measureFps: function() {
        var dt = ( ( new Date() ) | 0 ) - this.t;
        document.title = Math.floor( this.fps / ( dt / 1000 ) ) + ' fps';
        this.t = ( new Date() ) | 0;
        this.fps = 0;
    },
    init: function( gl, world ) {
        var self = this;
        this.t = ( new Date() ) | 0;

        this.gl = gl;

        this.resize( gl, W, H );
        this.vMatrix = mat4.create();
        this.mvMatrix = mat4.create();

        setInterval( Renderer.measureFps.bind( this ), 1000 );

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
    renderItem: function( item ) {
        mat4.multiply( this.vMatrix, item.mMatrix, this.mvMatrix );

        // console.log( 'Drawing with material ' + item.material.constructor ); 
        assert( item.material instanceof Material );

        item.material.drawBegin(
            this.pMatrix, this.vMatrix, this.mvMatrix, item.bufferSet
        );

        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, item.bufferSet.indexBuffer );
        gl.drawElements( gl.TRIANGLES, item.bufferSet.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0 );

        item.material.drawEnd( item.bufferSet );
    },
    render: function() {
        var self = this;
        var gl = this.gl;

        this.integrate( 0.01 );

        ++this.fps;
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

        gl.disable( gl.DEPTH_TEST );
        for ( var i = 0; i < this.world.length; ++i ) {
            if ( !this.world[ i ].zBuffer ) {
                this.renderItem( this.world[ i ] );
            }
        }
        gl.enable( gl.DEPTH_TEST );
        for ( var i = 0; i < this.world.length; ++i ) {
            if ( this.world[ i ].zBuffer ) {
                this.renderItem( this.world[ i ] );
            }
        }

        requestAnimationFrame( this.render.bind( this ) );
    },
    begin: function() {
        requestAnimationFrame( this.render.bind( this ) );
    }
};
