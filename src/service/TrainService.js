import { configuration } from "../misc/configuration";
import { designResponses } from "../misc/designResponses";
import { NetworkService } from "./NetworkService";
import { FrontEndService } from "./FrontEndService";

export const TrainService = {
    /**
     * Retrieves all trains.
     *
     * @param {function} success - The success callback function.
     * @param {function} fail - The failure callback function.
     * @return {void}
     */
    getAllTrains(success, fail) {
        if(configuration.designMode) return success(designResponses.getAllTrains);
        return NetworkService.GET(`/train/all/${new Date().getTime()+configuration.timeOffset}`, data => FrontEndService.getDataFromResponse(data, success), fail);
    },
    /**
     * Retrieves a short train based on its ID.
     *
     * @param {string} id - The ID of the train.
     * @param {function} success - The success callback function.
     * @param {function} fail - The fail callback function.
     * @return {void}
     */
    getShortTrain(id, success, fail) {
        if(configuration.designMode) return success(designResponses.getShortTrain(id));
        return NetworkService.GET(`/train/short/${id}/${new Date().getTime()+configuration.timeOffset}`, data => FrontEndService.getDataFromResponse(data, success), fail);
    },
    /**
     * Retrieves the full train data for a given ID.
     *
     * @param {number} id - The ID of the train.
     * @param {function} success - The success callback function.
     * @param {function} fail - The fail callback function.
     * @return {void}
     */
    getFullTrain(id, success, fail) {
        if(configuration.designMode) return success(designResponses.getFullTrain(id));
        return NetworkService.GET(`/train/full/${id}/${new Date().getTime()+configuration.timeOffset}`, data => FrontEndService.getDataFromResponse(data, success), fail);
    },
    /**
     * Retrieves the full train path for a given ID.
     *
     * @param {type} id - The ID of the train path.
     * @param {type} success - The success callback.
     * @param {type} fail - The fail callback.
     * @return {type} The train path data.
     */
    getTrainPathFull(id, success, fail) {
        if(configuration.designMode) return success(designResponses.getTrainPathFull(id));
        return NetworkService.GET(`/train/path/full/${id}/${new Date().getTime()+configuration.timeOffset}`, data => FrontEndService.getDataFromResponse(data, success), fail);
    },
    /**
     * Retrieves the train path update for a given ID.
     *
     * @param {type} id - the ID of the train path update
     * @param {type} success - a callback function to handle the successful response
     * @param {type} fail - a callback function to handle the failed response
     * @return {type} - returns the train path update
     */
    getTrainPathUpdate(id, success, fail) {
        if(configuration.designMode) return success(designResponses.getTrainPathShort(id));
        return NetworkService.GET(`/train/path/short/${id}/${new Date().getTime()+configuration.timeOffset}`, data => FrontEndService.getDataFromResponse(data, success), fail);
    }
}