const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

/**
 * Function decode and parse message
 * @param data
 * @returns {any}
 */

function parser(data) {
    let decodeData = decoder.end(data);
    return JSON.parse(decodeData);
}

module.exports = parser;