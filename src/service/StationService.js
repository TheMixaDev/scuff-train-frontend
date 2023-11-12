import { configuration } from "../misc/configuration";
import { designResponses } from "../misc/designResponses";
import { NetworkService } from "./NetworkService";
import { FrontEndService } from "./FrontEndService";

export const StationService = {
    /**
     * Retrieves all stations.
     *
     * @param {function} success - The success callback function
     * @param {function} fail - The failure callback function
     */
    getAllStations(success, fail) {
        if(configuration.designMode) return success(designResponses.getAllStations());
        NetworkService.GET(`/station/all`, data => FrontEndService.getDataFromResponse(data, success), fail);
    },
    /**
     * Retrieves a station based on its ID.
     *
     * @param {number} id - The ID of the station.
     * @param {function} success - The callback function to be called on success.
     * @param {function} fail - The callback function to be called on failure.
     * @return {void} This function does not return a value.
     */
    getStation(id, success, fail) {
        if(configuration.designMode) return success(designResponses.getStation(id));
        NetworkService.GET(`/station/id/${id}`, data => FrontEndService.getDataFromResponse(data, success), fail);
    }
}