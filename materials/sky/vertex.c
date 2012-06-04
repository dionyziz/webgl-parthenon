/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

#pragma optimize(off)

precision mediump float;

attribute vec3 aVertexPosition;
attribute vec3 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec3 vTextureCoord;

void main( void ) {
    mat4 rotationMVMatrix = uMVMatrix;

    rotationMVMatrix[ 3 ][ 0 ] = 0.0;
    rotationMVMatrix[ 3 ][ 1 ] = 0.0;
    rotationMVMatrix[ 3 ][ 2 ] = 0.0;

    gl_Position = uPMatrix * rotationMVMatrix * vec4( aVertexPosition, 1.0 );

    vTextureCoord = aTextureCoord;
}
