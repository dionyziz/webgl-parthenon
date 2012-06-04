/*	n = number of vertical slices
    h = height of the pillar
    tr = top radius
    br = base radius
    cr = center radius
    s = number of horizontal slices
*/

function pillar( n, h, tr, br, cr, s ) {
    var vertices = [], indices = [], normals = [], uvcoords = [];
    var step = 2 * Math.PI / n;
    var index = 0;
    var rUp = tr, rDown = tr;
    var heightUp = h / 2;
    var heightDown = heightUp;

    function f( i ) {
        if ( i / s > 0.5 ) {
            return br + ( cr - br ) * Math.sin( Math.PI * i / s );
        }
        return tr + ( cr - tr ) * Math.sin( Math.PI * i / s );
    }
    function findNormal( i, theta ) {
        var x = 1;
        var z = 0;
        var y = 0;
        // derivative of f
        var slope;

        if ( i / s > 0.5 ) {
            slope = Math.PI * ( i / s ) * ( cr - br ) * Math.cos( Math.PI * i / s );
        }
        else {
            slope = Math.PI * ( i / s ) * ( cr - tr ) * Math.cos( Math.PI * i / s );
        }
        var normal;

        x = 1;
        y = -x * slope;

        var d = Math.sqrt( x * x + y * y + z * z );
        x /= d;
        y /= d;
        z /= d;

        var xp = x * Math.cos( theta ) - z * Math.sin( theta );
        var zp = x * Math.sin( theta ) + z * Math.cos( theta );

        return [ xp, y, zp ];
    }

    for ( var i = 0; i < s; ++i ) {
        rUp = f( i );
        rDown = f( i + 1 );
        heightUp = heightDown;
        heightDown = heightUp - ( h / 2 ) / ( s / 2 );
            
        for ( var theta = 0; theta < 2 * Math.PI; theta += 2 * Math.PI / n ) {
            var a = [ rUp * Math.cos( theta ), heightUp, rUp * Math.sin( theta ) ],
                b = [ rDown * Math.cos( theta ), heightDown, rDown * Math.sin( theta ) ],
                c = [ rDown * Math.cos( theta + step ), heightDown, rDown * Math.sin( theta + step ) ],
                d = [ rUp * Math.cos( theta + step ), heightUp, rUp * Math.sin( theta + step ) ];
            var auv = [ theta / ( 2 * Math.PI ), i / s ],
                buv = [ theta / ( 2 * Math.PI ), ( i + 1 ) / s ],
                cuv = [ ( theta + step ) / ( 2 * Math.PI ), ( i + 1 ) / s ],
                duv = [ ( theta + step ) / ( 2 * Math.PI ), i / s ];

            vertices.push.apply( vertices, a );
            vertices.push.apply( vertices, b );
            vertices.push.apply( vertices, c );
            vertices.push.apply( vertices, d );
            var n1 = findNormal( i, theta ),
                n2 = findNormal( i + 1, theta ),
                n3 = findNormal( i + 1, theta + step ),
                n4 = findNormal( i, theta + step );
            normals.push.apply( normals, n1 );
            normals.push.apply( normals, n2 );
            normals.push.apply( normals, n3 );
            normals.push.apply( normals, n4 );

            uvcoords.push.apply( uvcoords, auv );
            uvcoords.push.apply( uvcoords, buv );
            uvcoords.push.apply( uvcoords, cuv );
            uvcoords.push.apply( uvcoords, duv );

            indices.push( index, index + 3, index + 1, index + 2, index + 1, index + 3 );
            index += 4;
        }
    }

    return {
        vertices: vertices,
        indices: indices,
        normals: normals,
        uvcoords: uvcoords
    };
}
