/*	n = number of vertical slices
	h = height of the pillar
	br = base radius
	cr = center radius
	s = number of horizontal slices
*/

function pillar( n, h, br, cr, s ) {
    var vertices = [], indices = [], normals = [];
    var step = 2 * Math.PI / n;
    var index = 0;
    var rStep = ( cr - br ) / ( s / 2 );
    var rUp = br, rDown = br;
    var heightUp = h / 2;
    var heightDown = heightUp;

    function f( i ) {
        return br + ( cr - br ) * Math.sin( Math.PI * i / s );
    }
    function findNormal( p, i, theta ) {
        var x = 1;
        var z = 0;
        var y = 0;
        // derivative of f
        var slope = Math.PI * ( i / s ) * ( cr - br ) * Math.cos( Math.PI * i / s );
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
            vertices.push.apply( vertices, a );
            vertices.push.apply( vertices, b );
            vertices.push.apply( vertices, c );
            vertices.push.apply( vertices, d );
            var n1 = findNormal( a, i, theta ),
                n2 = findNormal( b, i + 1, theta ),
                n3 = findNormal( c, i + 1, theta + step ),
                n4 = findNormal( d, i, theta + step );
            normals.push.apply( normals, n1 );
            normals.push.apply( normals, n2 );
            normals.push.apply( normals, n3 );
            normals.push.apply( normals, n4 );
            indices.push( index, index + 3, index + 1, index + 2, index + 1, index + 3 );
            index += 4;
        }
    }

    return {
        vertices: vertices,
        indices: indices,
        normals: normals
    };
}
