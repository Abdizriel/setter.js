import 'babel-polyfill'

/**
 * @function setter
 * @description Function which add parameters setter functions to provided object
 * @param {Object} obj - Object where you want do add parameter setters
 * @returns {Object} obj - Modified Object
 */
const getter = obj => {

    // Gets all top-tier object keys
    for(const key in obj) {

        // Get key value
        const value = obj[key];

        // If value is function skip that parameter
        if (typeof value === "function") { continue; }

        // Add setKey function to object which returns Promise
        obj[`set${toPascalCase(key)}`] = newValue => {
            obj[key] = newValue;
            return new Promise(resolve => resolve(obj));
        }

    }

    // Return modified object
    return obj;
};


/**
 * @function toPascalCase
 * @description Function which return Pascal Case key
 * @param {String} key - Object key
 * @returns {String}
 */
function toPascalCase(key) {
    return key.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1);});
}

module.exports = setter;
