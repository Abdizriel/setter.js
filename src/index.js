import 'babel-polyfill'

/**
 * @function setter
 * @description Function which add parameters setter functions to provided object
 * @param {Object} obj - Object where you want do add parameter setters
 * @param {Object} [config] - Configuration Object of setter
 * @param {Boolean} [config.async = true] - Flag to return synchronous or asynchronous function(s)
 * @param {Boolean} [config.multiple = true] - Flag to return one get('key') or multiple getKey functions
 * @returns {Object} obj - Modified Object
 */
const setter = (obj, config) => {

    const isAsync = config &&'undefined' !== typeof config.async ? config.async : true;
    const isMultiple = config &&'undefined' !== typeof config['multiple'] ? config['multiple'] : true;


    // Check type of returned function(s)
    if(!isMultiple) {

        // Check if return asynchronous function
        if(isAsync) {

            // Add set function to object which set value and return Promised Object
            obj[`set`] = (key, value) => {
                obj[key] = newValue;
                return new Promise(resolve => resolve(obj));
            }

        } else {

            // Add set function to object which update value
            obj[`set`] = (key, value) => {
                obj[key] = newValue;
                return obj[key];
            }

        }

    } else {

        // Gets all top-tier object keys
        for(const key in obj) {

            // Get key value
            const value = obj[key];

            // If value is function skip that parameter
            if (typeof value === "function") { continue; }

            // Check if return asynchronous function
            if(isAsync) {

                // Add setKey function to object which update value and returns Promise
                obj[`set${toPascalCase(key)}`] = newValue => {
                    obj[key] = newValue;
                    return new Promise(resolve => resolve(obj));
                }

            } else {

                // Add setKey function to object which update value and returns Object
                obj[`set${toPascalCase(key)}`] = newValue => {
                    obj[key] = newValue;
                    return obj;
                }

            }

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
