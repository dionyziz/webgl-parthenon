/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

var Parthenon = {
    COLUMNS_FRONT: 8,
    COLUMNS_SIDE: 17,
    INNER_COLUMNS_FRONT: 6,
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
    FRONT_CORRIDOR_SIZE: 3,
    WALL_WIDTH: 1,
    DOOR_WIDTH: 6,
    columnDistance: 0,
    templeWidth: 0,
    templeDepth: 0,
    templeHeight: 0,
    templeInnerWidth: 0,
    templeInnerDepth: 0,
    gl: null,
    world: null,
    createOuterColumns: function() {
        var colBuffer = new bufferSet(
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

        for ( var i = 0; i < this.COLUMNS_FRONT; ++i ) {
            var x = ( i / ( this.COLUMNS_FRONT - 1 ) ) * this.templeWidth - this.templeWidth / 2;
            var col = new Item( this.gl, colBuffer, materials.marble );
            var col2 = new Item( this.gl, colBuffer, materials.marble );

            col.move( x, this.COLUMN_HEIGHT / 2, -this.templeDepth / 2 );
            col2.move( x, this.COLUMN_HEIGHT / 2, this.templeDepth / 2 );
            this.world.push( col );
            this.world.push( col2 );
        }
        for ( var z = -this.templeDepth / 2 + this.columnDistance; z < this.templeDepth / 2; z += this.columnDistance ) {
            var col = new Item( this.gl, colBuffer, materials.marble );
            var col2 = new Item( this.gl, colBuffer, materials.marble );
            col.move( -this.templeWidth / 2, this.COLUMN_HEIGHT / 2, z );
            col2.move( this.templeWidth / 2, this.COLUMN_HEIGHT / 2, z );
            this.world.push( col );
            this.world.push( col2 );
        }
    },
    createInnerColumns: function() {
        var colBuffer = new bufferSet(
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

        for ( var i = 0; i < this.INNER_COLUMNS_FRONT; ++i ) {
            var x = ( i / ( this.INNER_COLUMNS_FRONT - 1 ) ) * this.templeInnerWidth - this.templeInnerWidth / 2;
            var col = new Item( this.gl, colBuffer, materials.marble );
            var col2 = new Item( this.gl, colBuffer, materials.marble );

            col.move( x, this.COLUMN_HEIGHT / 2, -this.templeInnerDepth / 2 );
            col2.move( x, this.COLUMN_HEIGHT / 2, this.templeInnerDepth / 2 );
            this.world.push( col );
            this.world.push( col2 );
        }
    },
    createOuterFloor: function() {
        for ( var step = 0; step < 3; ++step ) {
            var w = this.templeWidth + 2 * this.COLUMN_RADIUS + 2 * ( step + 1 ) * this.STEP_WIDTH,
                h = this.STEP_HEIGHT,
                d = this.templeDepth + 2 * this.COLUMN_RADIUS + 2 * ( step + 1 ) * this.STEP_WIDTH;
            
            var floor = new Item( this.gl, cube( w, h, d ), materials.plastic );
            floor.move( 0, -step * this.STEP_HEIGHT, 0 );
            this.world.push( floor );
        }
    },
    createInnerFloor: function() {
        for ( var step = 0; step < 2; ++step ) {
            var w = this.templeInnerWidth + 2 * this.COLUMN_RADIUS + 2 * ( 2 - step ) * this.STEP_WIDTH,
                h = this.STEP_HEIGHT,
                d = this.templeInnerDepth + 2 * this.COLUMN_RADIUS + 2 * ( 2 - step ) * this.STEP_WIDTH;
            
            var floor = new Item( this.gl, cube( w, h, d ), materials.plastic );
            floor.move( 0, ( step + 1 ) * this.STEP_HEIGHT, 0 );
            this.world.push( floor );
        }
    },
    createRoof: function() {
        var ceil = new Item( this.gl, cube( this.templeWidth + 2 * this.COLUMN_RADIUS, 0.4, this.templeDepth + 2 * this.COLUMN_RADIUS ), materials.plastic );
        var ceil2 = new Item( this.gl, cube( this.templeWidth + 2 * this.COLUMN_RADIUS, 0.4, this.templeDepth + 2 * this.COLUMN_RADIUS ), materials.plastic );
        var ceil3 = new Item( this.gl, roof( this.templeWidth + 2 * this.COLUMN_RADIUS, this.ROOF_HEIGHT, this.templeDepth ), materials.plastic );

        ceil.move( 0, this.COLUMN_HEIGHT, 0 );
        ceil2.move( 0, this.COLUMN_HEIGHT + 0.2, 0 );
        ceil3.move( 0, this.ROOF_HEIGHT / 2 + this.COLUMN_HEIGHT + 0.4, 0 );

        this.world.push( ceil );
        this.world.push( ceil2 );
        this.world.push( ceil3 );
    },
    createRoom: function() {
        var sideWall = new bufferSet(
            this.gl,
            cube(
                this.WALL_WIDTH,
                this.templeHeight,
                this.templeInnerDepth - 2 * this.FRONT_CORRIDOR_SIZE
            )
        );
        var leftWall = new Item( this.gl, sideWall, materials.plastic );
        var rightWall = new Item( this.gl, sideWall, materials.plastic );

        leftWall.move( -this.templeInnerWidth / 2, this.templeHeight / 2, 0 );
        rightWall.move( this.templeInnerWidth / 2, this.templeHeight / 2, 0 );

        this.world.push( leftWall );
        this.world.push( rightWall );

        var middleWall = new Item(
            this.gl,
            cube( this.templeInnerWidth, this.templeHeight, this.WALL_WIDTH ),
            materials.plastic
        );
        middleWall.move(
            0,
            this.templeHeight / 2,
            -( this.templeWidth / 2 - ( this.templeWidth / 2 ) / 1.618 )
        );
        this.world.push( middleWall );
        
        var doorWallSize = ( this.templeInnerWidth - this.DOOR_WIDTH ) / 2;
        var doorWall = new bufferSet(
            this.gl,
            cube(
                doorWallSize,
                10, // this.templeHeight,
                this.WALL_WIDTH
            )
        );
        for ( var x = -1; x <= 1; x += 2 ) {
            for ( var z = -1; z <= 1; z += 2 ) {
                var door = new Item( this.gl, doorWall, materials.plastic );
                door.move(
                    x * ( this.DOOR_WIDTH + doorWallSize ) / 2,
                    this.templeHeight / 2,
                    z * ( this.templeInnerDepth / 2 - this.FRONT_CORRIDOR_SIZE - this.WALL_WIDTH / 2 - 2 * this.COLUMN_RADIUS - this.COLUMN_SPACING )
                );
                this.world.push( door );
            }
        }
    },
    createSky: function() {
        var cubeGeometry = sky( 100, 100, 100 );

        for ( var i = 0; i < cubeGeometry.normals.length; ++i ) {
            cubeGeometry.normals[ i ] = -cubeGeometry.normals[ i ];
        }

        var skybox = new Item( this.gl, cubeGeometry, materials.sky );
        skybox.zBuffer = false;

        this.world.push( skybox );
    },
    createGround: function() {
        var cubeGeometry = cube( 1000, 1, 1000 );
        var ground = new Item( this.gl, cubeGeometry, materials.paper );

        ground.move( 0, -1, 0 );

        this.world.push( ground );
    },
    create: function() {
        this.createOuterColumns();
        this.createInnerColumns();
        this.createOuterFloor();
        this.createInnerFloor();
        this.createRoom();
        this.createRoof();
        // this.createGround();
        // this.createSky();
    },
    init: function( gl, world ) {
        this.columnDistance = this.COLUMN_SPACING + 2 * this.COLUMN_RADIUS;
        this.templeWidth = ( this.COLUMNS_FRONT - 1 ) * this.columnDistance;
        this.templeDepth = ( this.COLUMNS_SIDE - 1 ) * this.columnDistance;
        this.templeInnerWidth = this.templeWidth - 2 * this.COLUMN_RADIUS - 2 * this.OUTER_CORRIDOR_SIZE;
        this.templeInnerDepth = this.templeDepth - 2 * this.COLUMN_RADIUS - 2 * this.OUTER_CORRIDOR_SIZE;
        this.templeHeight = this.COLUMN_HEIGHT;
        this.gl = gl;
        this.world = world;
    }
};
