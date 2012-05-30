#pragma optimize(off)

precision mediump float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec3 vNormalVector;
varying vec3 vPosition;

void main( void ) {
    gl_Position = uPMatrix * uMVMatrix * vec4( aVertexPosition, 1.0 );
    vPosition = vec3( uMVMatrix * vec4( aVertexPosition, 1.0 ) );
    vNormalVector = ( uMVMatrix * vec4( aVertexNormal, 0.0 ) ).xyz;
}
