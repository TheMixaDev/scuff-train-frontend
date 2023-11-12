import axios from "axios";
import { configuration } from "../misc/configuration";

export const NetworkService = {
    /**
     * A function that performs a GET request to the specified URL using axios.
     *
     * @param {string} url - The URL to send the GET request to.
     * @param {function} success - The callback function to be called if the request is successful.
     * @param {function} fail - The callback function to be called if the request fails.
     * @return {void} This function does not return a value.
     */
    GET(url, success, fail) {
        (async () => {
            let response = await axios.get(`${configuration.serverUrl}${url}`).catch(fail);
            if(response)
                success(response);
        })();
    },
    /**
     * Executes a POST request to the specified URL with the given data.
     *
     * @param {string} url - The URL to send the POST request to.
     * @param {object} data - The data to be sent with the POST request.
     * @param {function} success - The function to be executed if the POST request is successful.
     * @param {function} fail - The function to be executed if the POST request fails.
     */
    POST(url, data, success, fail) {
        (async () => {
            let response = await axios.post(`${configuration.serverUrl}${url}`, data).catch(fail);
            if(response)
                success(response);
        })();
    },
    /**
     * Executes a GET request to the specified URL with authentication.
     *
     * @param {string} url - The URL to send the GET request to.
     * @param {object} cookies - The cookies object containing the authentication token.
     * @param {function} success - The success callback function to be executed on a successful response.
     * @param {function} fail - The fail callback function to be executed on an error response.
     */
    GETAuth(url, cookies, success, fail) {
        (async () => {
            let response = await axios.get(`${configuration.serverUrl}${url}`, {
                headers: {'Authorization': `Bearer ${cookies.get("auth")}`}
            }).catch(fail);
            if(response)
                success(response);
        })();
    },
    /**
     * Makes a POST request with authentication.
     *
     * @param {string} url - The URL to send the request to.
     * @param {Object} data - The data to send in the request body.
     * @param {Object} cookies - The cookies object containing authentication token.
     * @param {function} success - The callback function to handle the successful response.
     * @param {function} fail - The callback function to handle the failed response.
     * @return {void}
     */
    POSTAuth(url, data, cookies, success, fail) {
        let config = {
            headers: {'Authorization': `Bearer ${cookies.get("auth")}`}
        };
        (async () => {
            let response = await axios.post(`${configuration.serverUrl}${url}`, data, config).catch(fail);
            if(response)
                success(response);
        })();
    },
    /**
     * PATCHAuth function sends a PATCH request to the specified URL with the provided data
     * and cookies. It also takes two callback functions, success and fail, which are called
     * depending on the outcome of the request.
     *
     * @param {string} url - The URL to send the PATCH request to.
     * @param {object} data - The data to send in the request body.
     * @param {object} cookies - The cookies to include in the request headers.
     * @param {function} success - The callback function to be called if the request is successful.
     * @param {function} fail - The callback function to be called if the request fails.
     * @return {void} This function does not return any value.
     */
    PATCHAuth(url, data, cookies, success, fail) {
        (async () => {
            let response = await axios.patch(`${configuration.serverUrl}${url}`, data,
                {
                    headers: {'Authorization': `Bearer ${cookies.get("auth")}`}
                }).catch(fail);
            if(response)
                success(response);
        })();
    }
}