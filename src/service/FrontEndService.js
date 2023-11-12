export const FrontEndService = {
    /**
     * Retrieves the connection storage data from the session storage and removes it.
     *
     * @param {string} name - The name of the connection storage.
     * @return {object} The parsed connection storage data.
     */
    getConnectionStorage(name) {
        let data = sessionStorage.getItem(name);
        sessionStorage.removeItem(name);
        if(data) return JSON.parse(data);
    },
    /**
     * Sets the value of the specified key in the session storage.
     *
     * @param {string} name - The name of the key.
     * @param {any} data - The data to be stored.
     */
    setConnectionStorage(name, data) {
        sessionStorage.setItem(name, JSON.stringify(data));
    },
    /**
     * Sets up a connection storage with the given name and callback function.
     *
     * @param {string} name - The name of the connection storage.
     * @param {function} callback - The callback function to be called when data is retrieved from the connection storage.
     * @return {number} - The ID of the interval set for retrieving data from the connection storage.
     */
    setupConnectionStorage(name, callback) {
        return setInterval(() => {
            let data = FrontEndService.getConnectionStorage(name);
            if (data) callback(data);
        }, 10);
    },
    /**
     * Clears the connection storage.
     *
     * @param {type} id - The ID of the interval to clear.
     * @return {undefined} This function does not return a value.
     */
    clearConnectionStorage(id) {
        clearInterval(id);
    },
    /**
     * Converts a time in minutes to the format "Xч Yмин".
     *
     * @param {number} timeInMinutes - The time to convert in minutes.
     * @return {string} The time in the format "Xч Yмин".
     */
    convertTime(timeInMinutes) {
        let hours = Math.floor(timeInMinutes / 60);
        let minutes = Math.floor(timeInMinutes % 60);
        if(hours < 1) return minutes+"мин";
        if(minutes < 1) return hours+"ч";
        return hours+"ч "+minutes+"мин";
    },
    /**
     * Retrieves data from the response object and passes it to the callback function.
     *
     * @param {Object} response - The response object.
     * @param {Function} callback - The callback function to pass the data to.
     * @return {undefined} - This function does not return a value.
     */
    getDataFromResponse(response, callback) {
        if(response.data)
            callback(response.data);
        else callback(response);
    },
    /**
     * Converts coordinates from an object to an array.
     *
     * @param {object} coords - The coordinates object.
     * @return {array} The converted coordinates array.
     */
    convertCoords(coords) {
        return [coords.lat, coords.long];
    },
    /**
     * A default error handler for the router.
     *
     * @param {Object} router - The router object.
     * @param {Object} info - The error information.
     */
    defaultErrorHandler(router, info) {
        console.log(info);
        debugger;
        router.push({name: "error"});
    }
}