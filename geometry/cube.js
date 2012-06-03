/*
 * Developers: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 *             Petros Aggelatos <petrosagg@gmail.com>
 *             Aleksis Brezas <abresas@gmail.com>
 */

function cube( w, h, d ) {
    var vertices = [
        // right
        w, 0, 0,
        w, h, d,
        w, 0, d,
        w, h, 0,
        // left
        0, h, 0,
        0, 0, d,
        0, h, d,
        0, 0, 0,
        // top
        0, h, 0,
        w, h, d,
        w, h, 0,
        0, h, d,
        // bottom
        0, 0, d,
        w, 0, 0,
        w, 0, d,
        0, 0, 0,
        // front
        0, 0, d,
        w, h, d,
        0, h, d,
        w, 0, d,
        // back
        w, 0, 0,
        0, h, 0,
        w, h, 0,
        0, 0, 0
    ];
    var uvcoords = [
        0, 0,
        1, 1,
        0, 1,
        1, 0
    ];
    var normals = [
        1, 0, 0,
       -1, 0, 0,
        0, 1, 0,
        0,-1, 0,
        0, 0, 1,
        0, 0,-1
    ];
    var tangents = [
        0, 1, 0,
        0,-1, 0,
        0, 0, 1,
        0, 0,-1,
        1, 0, 0,
       -1, 0, 0
    ];

    // center unit cube around the origin
    for ( var i = 0; i < vertices.length / 3; ++i ) {
        vertices[ 3 * i ] -= w / 2;
        vertices[ 3 * i + 1 ] -= h / 2;
        vertices[ 3 * i + 2 ] -= d / 2;
    }

    var ret = {
        vertices: [],
        indices: [],
        normals: [],
        tangents: [],
        uvcoords: []
    };

    for ( var face = 0; face < 6; ++face ) {
        for ( var vertex = 0; vertex < 6; ++vertex ) { // 6 vertices per face
            ret.normals.push(
                normals[ face * 3 ],
                normals[ face * 3 + 1 ],
                normals[ face * 3 + 2 ]
            );
            ret.tangents.push(
                tangents[ face * 3 ],
                tangents[ face * 3 + 1 ],
                tangents[ face * 3 + 2 ]
            );
            ret.indices.push( face * 6 + vertex );
        }
    }

    function addPoint( face, point ) {
        ret.vertices.push(
            vertices[ face * 3 * 4 + point * 3 ],
            vertices[ face * 3 * 4 + point * 3 + 1 ],
            vertices[ face * 3 * 4 + point * 3 + 2 ]
        );
        ret.uvcoords.push(
            uvcoords[ point * 2 ],
            uvcoords[ point * 2 + 1 ]
        );
    }

    for ( face = 0; face < 6; ++face ) {
        // top triangle
        addPoint( face, 0 );
        addPoint( face, 1 );
        addPoint( face, 2 );
        // bottom triangle
        addPoint( face, 0 );
        addPoint( face, 3 );
        addPoint( face, 1 );
    }

    return ret;
}
