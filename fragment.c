#pragma optimize(off)

precision mediump float;

varying vec3 vNormalVector;

void main( void ) {
    gl_FragColor = vec4( vec3( 1.0 + vNormalVector.x, 1.0 + vNormalVector.y, 1.0 + vNormalVector.z ) / 2.0, 1.0 );
}
