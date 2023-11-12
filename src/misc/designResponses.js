import { designGenerator } from "./designGenerator";

const generateTrains = designGenerator.generateTrains();
const generateStations = designGenerator.generateStationsForTrains(generateTrains);

export const designResponses = {
    /**
     * Get all stations.
     *
     * @return {Array} An array of generated stations.
     */
    getAllStations: () => {
        return generateStations.map(s => designGenerator.shortStation(s));
    },
    /**
     * Retrieves a station with the specified ID from the list of generated stations.
     *
     * @param {number} id - The ID of the station to retrieve.
     * @return {Object} - The station object with the specified ID, or undefined if not found.
     */
    getStation(id) {
      return generateStations.find((s) => s.id == id);
    },
    getAllTrains: generateTrains,
    /**
     * Retrieves a short train based on the provided ID.
     *
     * @param {type} id - The ID of the train to retrieve.
     * @return {type} The short train corresponding to the provided ID.
     */
    getShortTrain(id) {
      return designGenerator.shortTrain(generateTrains.find((t) => t.id == id));
    },
    /**
     * Retrieves the full train object based on the provided ID.
     *
     * @param {number} id - The ID of the train to retrieve.
     * @return {object} - The train object matching the provided ID.
     */
    getFullTrain(id) {
      return generateTrains.find((t) => t.id == id);
    },
    /**
     * Generates the function comment for the given function body.
     *
     * @param {type} id - The ID of the train path.
     * @return {type} The full train path.
     */
    getTrainPathFull(id) {
      return designGenerator.getFullPath(this.getFullTrain(id), generateTrains);
    },
    /**
     * Retrieves the train path for the given ID.
     *
     * @param {number} id - The ID of the train path.
     * @return {Object} - An object containing the list of trains on the path.
     */
    getTrainPathShort(id) {
      return { trains_on_path: designGenerator.getRandomTrains(generateTrains, 3) };
    },
  };;