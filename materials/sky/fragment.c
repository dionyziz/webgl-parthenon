/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

#pragma optimize(off)

precision mediump float;

varying vec3 vTextureCoord;
uniform samplerCube uSampler;

void main( void ) {
    gl_FragColor = vec4( textureCube( uSampler, vTextureCoord ).rgb, 1.0 );
}
