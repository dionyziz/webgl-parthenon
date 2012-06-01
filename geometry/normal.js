/*
 * Developers: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 *             Panayiotis Danassis <panos_dan@hotmail.com>
 */

function computeNormals( vertices, indices ) {
    var normals = [];
    for ( var i = 0; i < vertices.length; ++i ) {
        normals[ i ] = 0;
    }
    for ( var i = 0; i < indices.length / 3; ++i ) {
        var a = indices[ 3 * i ];
        var b = indices[ 3 * i + 1 ];
        var c = indices[ 3 * i + 2 ];

        function getCoordinates( index ) {
            var x = vertices[ 3 * index + 0 ];
            var y = vertices[ 3 * index + 1 ];
            var z = vertices[ 3 * index + 2 ];
            var v = vec3.create( [ x, y, z ] );
            return v;
        }

        var pa = getCoordinates( a );
        var pb = getCoordinates( b );
        var pc = getCoordinates( c );
        var cross = vec3.create();

        vec3.subtract( pb, pa );
        vec3.subtract( pc, pa );
        vec3.cross( pb, pc, cross );
        vec3.normalize( cross );

        var points = [ a, b, c ];
        for ( var j = 0; j < 3; ++j ) {
            normals[ 3 * points[ j ] + 0 ] = cross[ 0 ];
            normals[ 3 * points[ j ] + 1 ] = cross[ 1 ];
            normals[ 3 * points[ j ] + 2 ] = cross[ 2 ];
        }
    }
    return normals;
}
