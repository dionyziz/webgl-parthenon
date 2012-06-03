/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

var Parthenon = {
    COLUMNS_FRONT: 8,
    COLUMNS_SIDE: 15,
    COLUMN_RADIUS: 1,
    COLUMN_TOP_RADIUS: 0.8,
    COLUMN_BASE_RADIUS: 1,
    COLUMN_SPACING: 3,
    COLUMN_HEIGHT: 10.45,
    COLUMN_SUBDIVISION: 10,
    STEP_WIDTH: 1,
    STEP_HEIGHT: 0.4,
    ROOF_HEIGHT: 3,
    OUTER_CORRIDOR_SIZE: 4,
    columnDistance: 0,
    templeWidth: 0,
    templeDepth: 0,
    templeInnerWidth: 0,
    templeInnerDepth: 0,
    gl: null,
    world: null,
    createOuterColumns: function() {
        colBuffer = new bufferSet(
            this.gl,
            pillar(
                this.COLUMN_SUBDIVISION,
                this.COLUMN_HEIGHT,
                this.COLUMN_TOP_RADIUS,
                this.COLUMN_BASE_RADIUS,
                this.COLUMN_RADIUS,
                this.COLUMN_SUBDIVISION
            )
        );

        for ( var x = -this.templeWidth / 2; x <= this.templeWidth / 2; x += this.columnDistance ) {
            var col = new Item( this.gl, colBuffer, paper );
            var col2 = new Item( this.gl, colBuffer, paper );

            col.move( x, this.COLUMN_HEIGHT / 2, -this.templeDepth / 2 );
            col2.move( x, this.COLUMN_HEIGHT / 2, this.templeDepth / 2 );
            this.world.push( col );
            this.world.push( col2 );
        }
        for ( var z = -this.templeDepth / 2 + this.columnDistance; z < this.templeDepth / 2; z += this.columnDistance ) {
            var col = new Item( this.gl, colBuffer, paper );
            var col2 = new Item( this.gl, colBuffer, paper );
            col.move( -this.templeWidth / 2, this.COLUMN_HEIGHT / 2, z );
            col2.move( this.templeWidth / 2, this.COLUMN_HEIGHT / 2, z );
            this.world.push( col );
            this.world.push( col2 );
        }
    },
    createOuterFloor: function() {
        for ( var step = 0; step < 3; ++step ) {
            var w = this.templeWidth + 2 * this.COLUMN_RADIUS + 2 * ( step + 1 ) * this.STEP_WIDTH,
                h = this.STEP_HEIGHT,
                d = this.templeDepth + 2 * this.COLUMN_RADIUS + 2 * ( step + 1 ) * this.STEP_WIDTH;
            
            var floor = new Item( this.gl, cube( w, h, d ), paper );
            floor.move( 0, -step * this.STEP_HEIGHT, 0 );
            this.world.push( floor );
        }
    },
    createInnerFloor: function() {
        for ( var step = 0; step < 2; ++step ) {
            var w = this.templeInnerWidth + 2 * this.COLUMN_RADIUS - 2 * ( step + 1 ) * this.STEP_WIDTH,
                h = this.STEP_HEIGHT,
                d = this.templeInnerDepth + 2 * this.COLUMN_RADIUS - 2 * ( step + 1 ) * this.STEP_WIDTH;
            
            var floor = new Item( this.gl, cube( w, h, d ), paper );
            floor.move( 0, ( step + 1 ) * this.STEP_HEIGHT, 0 );
            this.world.push( floor );
        }
    },
    createRoof: function() {
        var ceil = new Item( this.gl, cube( this.templeWidth + 2 * this.COLUMN_RADIUS, 0.4, this.templeDepth + 2 * this.COLUMN_RADIUS ), paper );
        var ceil2 = new Item( this.gl, cube( this.templeWidth + 2 * this.COLUMN_RADIUS, 0.4, this.templeDepth + 2 * this.COLUMN_RADIUS ), paper );
        var ceil3 = new Item( this.gl, roof( this.templeWidth + 2 * this.COLUMN_RADIUS, this.ROOF_HEIGHT, this.templeDepth ), paper );

        ceil.move( 0, this.COLUMN_HEIGHT, 0 );
        ceil2.move( 0, this.COLUMN_HEIGHT + 0.5, 0 );
        ceil3.move( 0, this.ROOF_HEIGHT / 2 + this.COLUMN_HEIGHT + 1, 0 );

        this.world.push( ceil );
        this.world.push( ceil2 );
        this.world.push( ceil3 );
    },
    create: function( gl, world ) {
        this.gl = gl;
        this.world = world;
        this.columnDistance = this.COLUMN_SPACING + 2 * this.COLUMN_RADIUS;
        this.templeWidth = ( this.COLUMNS_FRONT - 1 ) * this.columnDistance;
        this.templeDepth = ( this.COLUMNS_SIDE - 1 ) * this.columnDistance;
        this.templeInnerWidth = this.templeWidth - 2 * this.COLUMN_RADIUS - 2 * this.OUTER_CORRIDOR_SIZE;
        this.templeInnerDepth = this.templeDepth - 2 * this.COLUMN_RADIUS - 2 * this.OUTER_CORRIDOR_SIZE;
        this.createOuterColumns();
        this.createOuterFloor();
        this.createInnerFloor();
        this.createRoof();
    }
};
