/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

// Represents a set of buffers uploaded to GPU memory containing geometrical data
function bufferSet( gl, geometry ) {
    assert( gl instanceof WebGLRenderingContext );
    assert( typeof geometry.vertices != 'undefined' );
    assert( typeof geometry.indices != 'undefined' );
    assert( typeof geometry.normals != 'undefined' );

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

// represents a transformable item with a geometry and a material
function Item( gl, geometry, material ) {
    assert( gl instanceof WebGLRenderingContext );
    assert( material instanceof Material );

    // model transformation matrix
    // the vertices of the object are transformed
    // on the GPU at the vertex shader level
    this.mMatrix = mat4.create();
    mat4.identity( this.mMatrix );

    if ( !( geometry instanceof bufferSet ) ) {
        this.bufferSet = new bufferSet( gl, geometry );
    }
    else {
        // allow using a pre-instantiated bufferSet for optimization reasons
        // as many items can share the same geometry (but be transformed to,
        // for example, different locations in the world)
        this.bufferSet = geometry;
    }

    this.material = material;
}

Item.prototype = {
    constructor: 'Item',
    material: null,
    // whether zBuffering should be done when drawing this item
    // if set to false, it will be drawn before everything else with
    // zBuffering disabled, which is useful for skyboxes
    zBuffer: true, 
    move: function( x, y, z ) {
        mat4.translate( this.mMatrix, vec3.create( [ x, y, z ] ) );
    },
    rotate: function( angle, axis ) {
        mat4.rotate( this.mMatrix, angle, vec3.create( axis ) );
    },
    scale: function( x, y, z ) {
        mat4.scale( this.mMatrix, vec3.create( [ x, y, z ] ) );
    }
};
