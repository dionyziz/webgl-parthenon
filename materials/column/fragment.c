/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

#pragma optimize(off)

precision mediump float;

varying vec3 vNormalVector;
varying vec3 vPosition;
varying vec4 vWorldPosition;
varying vec3 vLightSource;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform mat4 uMVMatrix;

void main( void ) {
    vec3 S = vec3( 0.0 ); // light source location
    vec3 P = vWorldPosition.xyz; // location of point to be shaded
    vec3 V = normalize( vec3( 0.0 ) - P ); // vector from the point to the viewer
    vec3 L = normalize( S - P ); // vector from the point to the light source
    // vec3 diffuseMaterial = vec3( 0.66, 0.68, 0.63 );
    vec3 specularMaterial = vec3( 0.2 );
    // vec3 ambientMaterial = vec3( 0.66, 0.68, 0.63 );
    vec3 N = vNormalVector.xyz;
    N = normalize( N );
    vec3 R = -L + 2.0 * dot( L, N ) * N; // vector of reflected light
    
    // if ( vTextureCoord.t > 0.1 && vTextureCoord.t < 0.9 ) {
        // bump mapping using a function
        float theta = 0.9 * ( ( 10.0 * vTextureCoord.s - floor( 10.0 * vTextureCoord.s ) ) - 0.5 );
        mat3 perturbe = mat3( vec3( cos( theta ), 0, sin( theta ) ), vec3( 0, 1, 0 ) , vec3( -sin( theta ), 0, cos( theta ) ) );
        N = perturbe * N;
    // }

    N = ( uMVMatrix * vec4( N, 0.0 ) ).xyz;

    float diffuseIntensity = max( dot( N, L ), 0.0 );
    float specularIntensity = pow( max( dot( R, V ), 0.0 ), 6.0 );
    float ambientIntensity = 0.1;

    vec3 diffuseMaterial = texture2D( uSampler, vec2( vTextureCoord.s, vTextureCoord.t ) ).rgb;
    vec3 ambientMaterial = diffuseMaterial;

    gl_FragColor = vec4(
          ambientIntensity * ambientMaterial
        + diffuseIntensity * diffuseMaterial
        + specularIntensity * specularMaterial,
        1.0
    );
}
