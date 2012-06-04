/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

function bufferSet( gl, geometry ) {
    this.vertices = geometry.vertices;
    this.indices = geometry.indices;
    this.normals = geometry.normals;
    if ( geometry.uvcoords ) {
        this.uvcoords = geometry.uvcoords;
    }
    if ( geometry.uvwcoords ) {
        this.uvwcoords = geometry.uvwcoords;
    }

    this.positionBuffer = gl.createBuffer();
    this.indexBuffer = gl.createBuffer();
    this.normalBuffer = gl.createBuffer();
    if ( geometry.uvcoords ) {
        this.uvBuffer = gl.createBuffer();
    }
    if ( geometry.uvwcoords ) {
        this.uvwBuffer = gl.createBuffer();
    }

    gl.bindBuffer( gl.ARRAY_BUFFER, this.positionBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( this.vertices ), gl.STATIC_DRAW );
    this.positionBuffer.itemSize = 3;
    this.positionBuffer.numItems = this.vertices.length / 3;

    gl.bindBuffer( gl.ARRAY_BUFFER, this.normalBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( this.normals ), gl.STATIC_DRAW );
    this.normalBuffer.itemSize = 3;
    this.normalBuffer.numItems = this.positionBuffer.numItems;

    if ( geometry.uvcoords ) {
        gl.bindBuffer( gl.ARRAY_BUFFER, this.uvBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( this.uvcoords ), gl.STATIC_DRAW );
        this.uvBuffer.itemSize = 2;
        this.uvBuffer.numItems = this.positionBuffer.numItems;
    }

    if ( geometry.uvwcoords ) {
        gl.bindBuffer( gl.ARRAY_BUFFER, this.uvwBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( this.uvwcoords ), gl.STATIC_DRAW );
        this.uvwBuffer.itemSize = 3;
        this.uvwBuffer.numItems = this.positionBuffer.numItems;
    }

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( this.indices ), gl.STATIC_DRAW );
    this.indexBuffer.itemSize = 1;
    this.indexBuffer.numItems = this.indices.length;
}

function Item( gl, geometry, material ) {
    this.mMatrix = mat4.create();
    if ( !( geometry instanceof bufferSet ) ) {
        this.bufferSet = new bufferSet( gl, geometry );
    }
    else {
        this.bufferSet = geometry;
    }

    mat4.identity( this.mMatrix );

    this.material = material;
}

Item.prototype = {
    constructor: 'Item',
    material: null,
    zBuffer: true,
    move: function( x, y, z ) {
        mat4.translate( this.mMatrix, vec3.create( [ x, y, z ] ) );
    },
    rotate: function( angle, axis ) {
        mat4.rotate( this.mMatrix, angle, vec3.create( axis ) );
    }
};
