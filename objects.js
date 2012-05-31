//Teapot

function loadTeapotData() {
    var request = new XMLHttpRequest();
    request.open("GET", "Teapot.json", false);
    request.send();
    return JSON.parse(request.responseText);
}

function handleLoadedTeapot(teapotData) {
    var vertices = [], indices = [], normals = [], textures = [];
    
    normals = new Float32Array(teapotData.vertexNormals);
    textures = new Float32Array(teapotData.vertexTextureCoords);
    vertices = new Float32Array(teapotData.vertexPositions);
    indices = new Uint16Array(teapotData.indices);
    
    return {
        vertices: vertices,
        indices: indices,
        normals: normals
    };
}

//Other Objects