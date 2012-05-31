/*	n = number of vertical slices
	h = height of the pillar
	br = base radius
	cr = center radius
	s = number of horizontal slices
	
	works only with even number of horizontal slices ( s ).
*/

function pillar( n, h, br, cr, s ) {
    var theta, vertices = [], indices = [], normals = [];
    var step = 2 * Math.PI / n;
    var index = 0;
	var r, i, r_step = ( cr - br ) / ( s / 2 );

    r_up = br;
	r_down = br;
	for ( i = 0; i < s/2; i += 1 ) {
		r_up = r_down;
		r_down += r_step;
		
		for ( theta = 0; theta < 2 * Math.PI; theta += 2 * Math.PI / n ) {
			var a = [ r_up * Math.cos( theta ), h / 2, r_up * Math.sin( theta ) ];
			var b = [ r_down * Math.cos( theta ), 0, r_down * Math.sin( theta ) ];
			var c = [ r_down * Math.cos( theta + step ), 0, r_down * Math.sin( theta + step ) ];
			var d = [ r_up * Math.cos( theta + step ), h / 2, r_up * Math.sin( theta + step ) ];
			vertices.push.apply( vertices, a );
			vertices.push.apply( vertices, b );
			vertices.push.apply( vertices, c );
			vertices.push.apply( vertices, d );
			var n1 = [ a[ 0 ] / r_up, 0, a[ 2 ] / r_up ];
			var n2 = [ c[ 0 ] / r_down, 0, c[ 2 ] / r_down ];
			var n3 = [ c[ 0 ] / r_down, 0, c[ 2 ] / r_down ];
			var n3 = [ c[ 0 ] / r_up, 0, c[ 2 ] / r_up ];
			normals.push.apply( normals, n1 );
			normals.push.apply( normals, n1 );
			normals.push.apply( normals, n2 );
			normals.push.apply( normals, n2 );
			indices.push( index, index + 3, index + 1, index + 2, index + 1, index + 3 );
			index += 4;
		}
	}
console.log(vertices);
	r_up = cr;
	r_down = cr;
	for ( i = s/2; i <= s; i += 1 ) {
		r_up = r_down;
		r_down -= r_step;
		
		for ( theta = 0; theta < 2 * Math.PI; theta += 2 * Math.PI / n ) {
			var a = [ r_up * Math.cos( theta ), 0, r_up * Math.sin( theta ) ];
			var b = [ r_down * Math.cos( theta ), -h / 2, r_down * Math.sin( theta ) ];
			var c = [ r_down * Math.cos( theta + step ), -h / 2, r_down * Math.sin( theta + step ) ];
			var d = [ r_up * Math.cos( theta + step ), 0, r_up * Math.sin( theta + step ) ];
			vertices.push.apply( vertices, a );
			vertices.push.apply( vertices, b );
			vertices.push.apply( vertices, c );
			vertices.push.apply( vertices, d );
			var n1 = [ a[ 0 ] / r_up, 0, a[ 2 ] / r_up ];
			var n2 = [ c[ 0 ] / r_down, 0, c[ 2 ] / r_down ];
			var n3 = [ c[ 0 ] / r_down, 0, c[ 2 ] / r_down ];
			var n3 = [ c[ 0 ] / r_up, 0, c[ 2 ] / r_up ];
			normals.push.apply( normals, n1 );
			normals.push.apply( normals, n1 );
			normals.push.apply( normals, n2 );
			normals.push.apply( normals, n2 );
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
