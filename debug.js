/*
 * Developer: Dionysis "dionyziz" Zindros <dionyziz@gmail.com>
 */

function assert( condition, description ) {
    if ( !condition ) {
        if ( description ) {
            throw description;
        }
        throw 'Assertion failed';
    }
}
