/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

var Renderer = {
    fps: 0,
    pMatrix: null,
    vMatrix: null,
    world: [],
    createWorld: function( gl ) {
        var COLUMNS_FRONT = 8, COLUMNS_SIDE = 15,
            COLUMN_RADIUS = 1, COLUMN_SPACING = 3,
            COLUMN_HEIGHT = 10.45, COLUMN_SUBDIVISION = 10;
        var columnDistance = COLUMN_SPACING + 2 * COLUMN_RADIUS;
        var templeWidth = ( COLUMNS_FRONT - 1 ) * columnDistance;
        var templeDepth = ( COLUMNS_SIDE - 1 ) * columnDistance;
        var geometry = cylinder( COLUMN_SUBDIVISION, COLUMN_HEIGHT, COLUMN_RADIUS );

        for ( var x = -templeWidth / 2; x <= templeWidth / 2; x += columnDistance ) {
            var col = new Item( gl, geometry );
            var col2 = new Item( gl, geometry );
            col.move( x, COLUMN_HEIGHT / 2, -templeDepth / 2 );
            col2.move( x, COLUMN_HEIGHT / 2, templeDepth / 2 );
            this.world.push( col );
            this.world.push( col2 );
        }
        for ( var z = -templeDepth / 2 + columnDistance; z < templeDepth / 2; z += columnDistance ) {
            var col = new Item( gl, geometry );
            var col2 = new Item( gl, geometry );
            col.move( -templeWidth / 2, COLUMN_HEIGHT / 2, z );
            col2.move( templeWidth / 2, COLUMN_HEIGHT / 2, z );
            this.world.push( col );
            this.world.push( col2 );
        }

        var ceil = new Item( gl, cube( templeWidth + 2 * COLUMN_RADIUS, 0.4, templeDepth + 2 * COLUMN_RADIUS ) );
        var ceil2 = new Item( gl, cube( templeWidth + 2 * COLUMN_RADIUS, 0.4, templeDepth + 2 * COLUMN_RADIUS ) );
        var floor = new Item( gl, cube( templeWidth + 2 * COLUMN_RADIUS + 1, 0.4, templeDepth + 2 * COLUMN_RADIUS + 1 ) );
        var floor2 = new Item( gl, cube( templeWidth + 2 * COLUMN_RADIUS + 2, 0.4, templeDepth + 2 * COLUMN_RADIUS + 2 ) );
        var floor3 = new Item( gl, cube( templeWidth + 2 * COLUMN_RADIUS + 3, 0.4, templeDepth + 2 * COLUMN_RADIUS + 2 ) );
        ceil.move( 0, COLUMN_HEIGHT, 0 );
        ceil2.move( 0, COLUMN_HEIGHT + 0.5, 0 );
        floor.move( 0, 0, 0 );
        floor2.move( 0, -0.5, 0 );
        floor3.move( 0, -1, 0 );
        this.world.push( ceil );
        this.world.push( ceil2 );
        this.world.push( floor );
        this.world.push( floor2 );
        this.world.push( floor3 );

        var ceil3 = new Item( gl, roof( templeWidth, 5, templeDepth ) );
        ceil3.move( 0, 2.5 + COLUMN_HEIGHT + 1, 0 );
        this.world.push( ceil3 );
    },
    init: function( gl ) {
        var self = this;

        this.pMatrix = mat4.create();
        this.vMatrix = mat4.create();

        mat4.perspective( 45, W / H, 0.1, 200.0, this.pMatrix );
        mat4.identity( this.vMatrix );
        mat4.translate( this.vMatrix, [ 0.0, -5.0, -64.0 ] );

        setInterval( function() {
            document.title = self.fps + ' fps';
            self.fps = 0;
        }, 1000 );

        this.createWorld( gl );
        this.render( gl );
    },
    render: function( gl ) {
        var self = this;

        ++this.fps;
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
