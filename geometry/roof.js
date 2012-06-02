/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

/*
 * w width, h height, d depth
 *
 * Create a roof-style geometry centered around the origin.
 * The shape is a triangle extended in the z direction.
 */

function roof( w, h, d ) {
    var x = w / 2, y = h / 2, z = d / 2;
    var vertices = [
        // Front face
        -x, -y, z,
         0,  y, z,
         x, -y, z,

        // Back face
        -x, -y, -z,
         0,  y, -z,
         x, -y, -z,

        // Right face
         x, -y, z,
         0,  y, z,
         x, -y, -z,
         0,  y, -z,

        // Left face
        -x, -y, z,
         0,  y, z,
        -x, -y, -z,
         0,  y, -z
    ];
    var indices = [
        0, 2, 1,                  // Front face
        3, 4, 5,                  // Back face
        6, 8, 7,      7, 8, 9,    // Right face
        10, 11, 12,   11, 13, 12  // Left face
    ];
    return {
        vertices: vertices,
        indices: indices,
        normals: computeNormals( vertices, indices )
    };
}
