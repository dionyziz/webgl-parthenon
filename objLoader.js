var objLoader = {

    loadObj: function( url ) {
        var request = new XMLHttpRequest();
        request.open( "GET", url, false );
        /*request.onreadystatechange = function() {
            if ( request.readyState != 4 ) {
                return;
            }
            return objLoader.handleLoadedObject( request.responseText );
        }*/
        request.send();
        return objLoader.handleLoadedObject( request.responseText );
    },

    handleLoadedObject: function( data ) {
        var vertices = [], indices = [], normals = [], textures = [], faces = [];
        var i, result;

        var data = data.split( '\n' );
        var temp;
        for ( i = 0; i < data.length; i++ ) {
            temp = data[ i ].split( " " );
            switch( temp[ 0 ] ) {
                case "v":
                    vertices = pushData( vertices, temp, false );
                    break;
                case "vt":
                    textures = pushData( textures, temp, false );
                    break;
                case "vn":
                    normals = pushData( normals, temp, false );
                    break;
                case "f":
                    for ( var j = 1; j< temp.length; j++) {
                        temp[ j ] = temp[ j ].split("/");
                        temp[ j ] = temp[ j ].join(" ");
                    }
                    temp = temp.join(" ");
                    temp = temp.split(" ");
                    faces = pushData( faces, temp, true );
                    break;
                default:
                    break;
            }
        }

        result = objLoader.computeArraysFromFaces( vertices, textures, normals, faces );

        console.log('Object loaded successfully');
        return {
            vertices: result.vertices,
            indices: result.indices,
            normals: result.normals,
            textures: result.textures
        };
    },

    pushData: function( array, data ) {
        var array = array;
        if ( !faces ) {
            for ( var i = 1; i< data.length; i++ ) {
                array.push( parseFloat( data[ i ] ) );
            }
        }
        else {
            var num_of_triangles = ( ( data.length - 1 ) / 3 ) - 2;
            for ( var i = 1; i<= num_of_triangles; i++ ) {
                var j = i + 1, k = i + 2;
                {
                    //vertex #1
                    array.push( parseFloat( data[ 1 ] ) );
                    array.push( parseFloat( data[ 2 ] ) );
                    array.push( parseFloat( data[ 3 ] ) );
                }
                {
                    //vertex #( j = i + 1 )
                    array.push( parseFloat( data[ ( 3 * j - 2 ) ] ) );
                    array.push( parseFloat( data[ ( 3 * j - 2 ) + 1 ] ) );
                    array.push( parseFloat( data[ ( 3 * j - 2 ) + 2 ] ) );
                }
                {
                    //vertex #( k = i + 2 )
                    array.push( parseFloat( data[ ( 3 * k - 2 ) ] ) );
                    array.push( parseFloat( data[ ( 3 * k - 2 ) + 1 ] ) );
                    array.push( parseFloat( data[ ( 3 * k - 2 ) + 2 ] ) );
                }
            }
        }
        return array;
    },

    computeArraysFromFaces: function( vertices, textures, normals, faces ) {
        var real_vertices = [], real_indices = [], real_normals = [], real_textures = [];
        var vertex, texture, normal;

        for ( var i = 0; i < faces.length; i += 3 ) {
            vertex = 3 * ( faces [ i ] - 1 );
            real_vertices.push( vertices[ vertex ] );
            real_vertices.push( vertices[ vertex + 1 ] );
            real_vertices.push( vertices[ vertex + 2 ] );
            
            real_indices.push( i / 3 );
            
            texture = 2 * ( faces [ i + 1 ] - 1 );
            real_textures.push( textures[ texture ] );
            real_textures.push( textures[ texture + 1 ] );
            
            normal = 3 * ( faces [ i + 2 ] - 1 );
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
};