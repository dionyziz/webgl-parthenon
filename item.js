function bufferSet( gl, geometry ) {
    this.vertices = geometry.vertices;
    this.indices = geometry.indices;
    this.normals = geometry.normals;

    this.positionBuffer = gl.createBuffer();
    this.indexBuffer = gl.createBuffer();
    this.normalBuffer = gl.createBuffer();

    gl.bindBuffer( gl.ARRAY_BUFFER, this.positionBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( this.vertices ), gl.STATIC_DRAW );
    this.positionBuffer.itemSize = 3;
    this.positionBuffer.numItems = this.vertices.length / 3;
    gl.bindBuffer( gl.ARRAY_BUFFER, this.normalBuffer );
    this.normalBuffer.itemSize = 3;
    this.normalBuffer.numItems = this.positionBuffer.numItems;
    this.indexBuffer.itemSize = 1;
    this.indexBuffer.numItems = this.indices.length;
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( this.normals ), gl.STATIC_DRAW );
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( this.indices ), gl.STATIC_DRAW );
}

function Item( gl, geometry ) {
    this.mMatrix = mat4.create();
    if ( !( geometry instanceof bufferSet ) ) {
        this.bufferSet = new bufferSet( gl, geometry );
    }
    else {
        this.bufferSet = geometry;
    }

    mat4.identity( this.mMatrix );
}

Item.prototype = {
    constructor: 'Item',
    move: function( x, y, z ) {
        mat4.translate( this.mMatrix, vec3.create( [ x, y, z ] ) );
    },
    rotate: function( angle, axis ) {
        mat4.rotate( this.mMatrix, angle, vec3.create( axis ) );
    }
};
