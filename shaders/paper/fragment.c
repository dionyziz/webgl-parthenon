/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

#pragma optimize(off)

precision mediump float;

varying vec3 vNormalVector;
varying vec3 vPosition;

void main( void ) {
    vec3 S = vec3( 0.5, 1.0, 0.0 );
    vec3 V = vPosition;
    vec3 L = normalize( S - V );
    vec3 M = vec3( 1.0 );
    vec3 N = normalize( vNormalVector );
    float I = max( dot( N, L ), 0.0 );

    gl_FragColor = vec4( I * M, 1.0 );
}
