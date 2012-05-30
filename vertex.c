#pragma optimize(off)

precision mediump float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec3 vNormalVector;

void main( void ) {
    gl_Position = uPMatrix * uMVMatrix * vec4( aVertexPosition, 1.0 );
    vNormalVector = aVertexNormal;
}
