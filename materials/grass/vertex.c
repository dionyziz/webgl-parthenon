/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

#pragma optimize(off)

precision mediump float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uVMatrix;
uniform mat4 uPMatrix;
uniform vec3 uLightSource;

varying vec3 vNormalVector;
varying vec3 vPosition;
varying vec4 vWorldPosition;
varying vec3 vLightSource;

varying vec2 vTextureCoord;

void main( void ) {
    vLightSource = ( uVMatrix * vec4( uLightSource, 1.0 ) ).xyz;
    vWorldPosition = uMVMatrix * vec4( aVertexPosition, 1.0 );
    gl_Position = uPMatrix * vWorldPosition;
    vPosition = vec3( uMVMatrix * vec4( aVertexPosition, 1.0 ) );
    vNormalVector = ( uMVMatrix * vec4( aVertexNormal, 0.0 ) ).xyz;
    vTextureCoord = aTextureCoord;
}
