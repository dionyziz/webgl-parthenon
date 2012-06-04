/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

function PaperMaterial( gl, onload ) {
    Material.call( this, 'paper', gl, onload );
}

PaperMaterial.prototype = {
    constructor: 'PaperMaterial'
};

PaperMaterial.extend( Material );
