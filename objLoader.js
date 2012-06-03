function loadData( object ) {
    var request = new XMLHttpRequest();
    request.open("GET", object, false);
    request.send();
    return request.responseText;
}

function handleLoadedObject( data ) {
    var vertices = [], indices = [], normals = [], textures = [], faces = [];
    var i;
    
    var data = data.split('\n');
	var temp;
	for ( i = 0; i < data.length; i++ ) {
		temp = data[i].split(" ");
		switch( temp[ 0 ] ) {
			case "v":
				vertices = pushData( vertices, temp );
				break;
			case "vt":
				textures = pushData( textures, temp );
				break;
			case "vn":
				normals = pushData( normals, temp );
				break;
			case "f":
				for ( var j = 1; j< temp.length; j++) {
					temp[ j ] = temp[ j ].split("/");
					temp[ j ] = temp[ j ].join(" ");
				}
				temp = temp.join(" ");
				temp = temp.split(" ");
				faces = pushData( faces, temp );
				break;
			default:
				break;
		}
	}
	
	result = computeArraysFromFaces( vertices, textures, normals, faces );
	
    return {
        vertices: result.vertices,
        indices: result.indices,
        normals: result.normals,
        textures: result.textures
    };
}

function pushData( array, data ) {
    var array = array;
	for ( var i = 1; i< data.length; i++ ) {
		array.push( parseFloat( data[ i ] ) );
	}
	return array;
}

function computeArraysFromFaces( vertices, textures, normals, faces ) {
	var real_vertices = [], real_indices = [], real_normals = [], real_textures = [];
	var vertex, texture, normal;

	for ( var i = 0; i < faces.length; i += 3 ) {
		vertex = 3 * faces [ i ];
		real_vertices.push( vertices[ vertex ] );
		real_vertices.push( vertices[ vertex + 1 ] );
		real_vertices.push( vertices[ vertex + 2 ] );
		
		real_indices.push( i / 3 );
		
		texture = 2 * faces [ i + 1 ];
		real_textures.push( textures[ texture ] );
		real_textures.push( textures[ texture + 1 ] );
		
		normal = 3 * faces [ i + 2 ];
		real_normals.push( normals[ normal ] );
		real_normals.push( normals[ normal + 1 ] );
		real_normals.push( normals[ normal + 2 ] );
	}
    
	return {
        vertices: real_vertices,
        indices: real_indices,
        normals: real_normals,
		textures: real_textures
    };
}