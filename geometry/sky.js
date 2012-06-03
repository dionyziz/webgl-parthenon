/*
 * Developer: Aleksis Brezas <abresas@gmail.com>
 */

function sky( w, h, d ) {
    var vertices = [
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         -1.0, 1.0, -1.0,
        1.0, 1.0, -1.0,

        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0
    ];
    var indices = [
        1, 5, 7, 7, 3, 1,
        2, 6, 4, 4, 0, 2,
        0, 4, 5, 5, 1, 0,
        3, 7, 6, 6, 2, 3,
        4, 6, 7, 7, 5, 4,
        0, 1, 3, 3, 2, 0
    ];
    var normals = [
        1.0,  1.0,  -1.0,
        -1.0,  1.0,  -1.0,
        -1.0,  -1.0,  -1.0,
        1.0,  -1.0,  -1.0,
        1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  -1.0,  1.0,
        1.0,  -1.0,  1.0
    ];
    var uvwcoords = [
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         -1.0, 1.0, -1.0,
        1.0, 1.0, -1.0,

        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0
    ];

    for ( var i = 0; i < vertices.length / 3; ++i ) {
        vertices[ 3 * i ] *= w;
        vertices[ 3 * i + 1 ] *= h;
        vertices[ 3 * i + 2 ] *= d;
    }

    return {
        vertices: vertices,
        indices: indices,
        normals: normals,
        uvwcoords: uvwcoords
    };
}
