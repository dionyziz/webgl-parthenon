/*
 * Developers: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 *             Panayiotis Danassis <panos_dan@hotmail.com>
 */

function cylinder( n, h, r ) {
    var theta, vertices = [], indices = [], normals = [], uvcoords = [];
    var step = 2 * Math.PI / n;
    var index = 0;

    for ( theta = 0; theta < 2 * Math.PI; theta += 2 * Math.PI / n ) {
        var a = [ r * Math.cos( theta ), h / 2, r * Math.sin( theta ) ];
        var b = [ r * Math.cos( theta ), -h / 2, r * Math.sin( theta ) ];
        var c = [ r * Math.cos( theta + step ), -h / 2, r * Math.sin( theta + step ) ];
        var d = [ r * Math.cos( theta + step ), h / 2, r * Math.sin( theta + step ) ];
        var auv = [ theta / ( 2 * Math.PI ), 0 ];
        var buv = [ theta / ( 2 * Math.PI ), 1 ];
        var cuv = [ ( theta + step ) / ( 2 * Math.PI ), 1 ];
        var duv = [ ( theta + step ) / ( 2 * Math.PI ), 0 ];

        vertices.push.apply( vertices, a );
        vertices.push.apply( vertices, b );
        vertices.push.apply( vertices, c );
        vertices.push.apply( vertices, d );

        var n1 = [ a[ 0 ] / r, 0, a[ 2 ] / r ];
        var n2 = [ c[ 0 ] / r, 0, c[ 2 ] / r ];
        normals.push.apply( normals, n1 );
        normals.push.apply( normals, n1 );
        normals.push.apply( normals, n2 );
        normals.push.apply( normals, n2 );

        uvcoords.push.apply( uvcoords, auv );
        uvcoords.push.apply( uvcoords, buv );
        uvcoords.push.apply( uvcoords, cuv );
        uvcoords.push.apply( uvcoords, duv );

        indices.push( index, index + 3, index + 1, index + 2, index + 1, index + 3 );
        index += 4;
    }

    return {
        vertices: vertices,
        indices: indices,
        normals: normals,
        uvcoords: uvcoords
    };
}
