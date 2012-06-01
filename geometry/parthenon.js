/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

var Parthenon = {
    COLUMNS_FRONT: 8,
    COLUMNS_SIDE: 15,
    COLUMN_RADIUS: 1,
    COLUMN_SPACING: 3,
    COLUMN_HEIGHT: 10.45,
    COLUMN_SUBDIVISION: 10,
    STEP_WIDTH: 1,
    STEP_HEIGHT: 0.4,
    ROOF_HEIGHT: 3,
    create: function( gl, world ) {
        var columnDistance = this.COLUMN_SPACING + 2 * this.COLUMN_RADIUS;
        var templeWidth = ( this.COLUMNS_FRONT - 1 ) * columnDistance;
        var templeDepth = ( this.COLUMNS_SIDE - 1 ) * columnDistance;
        var colBuffer = new bufferSet( gl, cylinder( this.COLUMN_SUBDIVISION, this.COLUMN_HEIGHT, this.COLUMN_RADIUS ) );

        for ( var x = -templeWidth / 2; x <= templeWidth / 2; x += columnDistance ) {
            var col = new Item( gl, colBuffer );
            var col2 = new Item( gl, colBuffer );

            col.move( x, this.COLUMN_HEIGHT / 2, -templeDepth / 2 );
            col2.move( x, this.COLUMN_HEIGHT / 2, templeDepth / 2 );
            world.push( col );
            world.push( col2 );
        }
        for ( var z = -templeDepth / 2 + columnDistance; z < templeDepth / 2; z += columnDistance ) {
            var col = new Item( gl, colBuffer );
            var col2 = new Item( gl, colBuffer );
            col.move( -templeWidth / 2, this.COLUMN_HEIGHT / 2, z );
            col2.move( templeWidth / 2, this.COLUMN_HEIGHT / 2, z );
            world.push( col );
            world.push( col2 );
        }

        var ceil = new Item( gl, cube( templeWidth + 2 * this.COLUMN_RADIUS, 0.4, templeDepth + 2 * this.COLUMN_RADIUS ) );
        var ceil2 = new Item( gl, cube( templeWidth + 2 * this.COLUMN_RADIUS, 0.4, templeDepth + 2 * this.COLUMN_RADIUS ) );
        var floor = new Item( gl, cube( templeWidth + 2 * this.COLUMN_RADIUS + 2 * this.STEP_WIDTH, this.STEP_HEIGHT, templeDepth + 2 * this.COLUMN_RADIUS + 2 * this.STEP_WIDTH ) );
        var floor2 = new Item( gl, cube( templeWidth + 2 * this.COLUMN_RADIUS + 4 * this.STEP_WIDTH, this.STEP_HEIGHT, templeDepth + 2 * this.COLUMN_RADIUS + 4 * this.STEP_WIDTH ) );
        var floor3 = new Item( gl, cube( templeWidth + 2 * this.COLUMN_RADIUS + 6 * this.STEP_WIDTH, this.STEP_HEIGHT, templeDepth + 2 * this.COLUMN_RADIUS + 6 * this.STEP_WIDTH ) );
        ceil.move( 0, this.COLUMN_HEIGHT, 0 );
        ceil2.move( 0, this.COLUMN_HEIGHT + 0.5, 0 );
        floor.move( 0, 0, 0 );
        floor2.move( 0, -0.4, 0 );
        floor3.move( 0, -0.8, 0 );
        world.push( ceil );
        world.push( ceil2 );
        world.push( floor );
        world.push( floor2 );
        world.push( floor3 );

        var ceil3 = new Item( gl, roof( templeWidth + 2 * this.COLUMN_RADIUS, this.ROOF_HEIGHT, templeDepth ) );
        ceil3.move( 0, this.ROOF_HEIGHT / 2 + this.COLUMN_HEIGHT + 1, 0 );
        world.push( ceil3 );
    }
};
