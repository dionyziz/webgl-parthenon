/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

/*
 * w width, h height, d depth
 *
 * Create a parallelepiped geometry centered around the origin
 */

function cube( w, h, d ) {
    var x = w / 2, y = h / 2, z = d / 2;
    var vertices = [
        // Front face
        -x, -y, z,
        x,  -y, z,
        x,   y, z,
        -x,  y, z,

        // Back face
        -x, -y, -z,
        -x,  y, -z,
        x,   y, -z,
        x,  -y, -z,

        // Top face
        -x, y, -z,
        -x, y,  z,
        x,  y,  z,
        x,  y, -z,

        // Bottom face
        -x, -y, -z,
        x,  -y, -z,
        x,  -y,  z,
        -x, -y,  z,

        // Right face
        x, -y, -z,
        x,  y, -z,
        x,  y,  z,
        x, -y,  z,

        // Left face
        -x, -y, -z,
        -x, -y,  z,
        -x,  y,  z,
        -x,  y, -z
    ];
    var indices = [
        0, 1, 2,      0, 2, 3,    // Front face
        4, 5, 6,      4, 6, 7,    // Back face
        8, 9, 10,     8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15, // Bottom face
        16, 17, 18,   16, 18, 19, // Right face
        20, 21, 22,   20, 22, 23  // Left face
    ];
    return {
        vertices: vertices,
        indices: indices,
        normals: computeNormals( vertices, indices )
    };
}
