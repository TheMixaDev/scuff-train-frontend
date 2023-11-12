import { designResponses } from "./designResponses";
import { FrontEndService } from "../service/FrontEndService";

export const designGenerator = {
    trainId: 0,
    wagonId: 0,
    /**
     * Generates a train object with random properties.
     *
     * @return {Object} - The generated train object.
     */
    generateTrain() {
        return {
            "id": this.trainId++,
            "start_id": Math.floor(Math.random()*20), // Станция
            "destination_id": Math.floor(Math.random()*20), // Станция
            "coords": this.generateCoordinates(),
            "wagons": this.generateWagons(Math.floor(Math.random()*20)), // Вагоны
            "is_move": Math.random() > 0.5, // Находится в движении
            "move_time": Math.floor(Math.random()*120) // Минут
        }
    },
    /**
     * Generates random latitude and longitude coordinates.
     *
     * @return {Object} An object with randomly generated latitude and longitude coordinates.
     */
    generateCoordinates() {
        return {
            lat: (Math.random() > 0.5 ? 1 : -1) * Math.random()*60,
            long: (Math.random() > 0.5 ? 1 : -1) * Math.random()*120
        }
    },
    /**
     * Generates a wagon object with a unique ID, random start and destination IDs, and an undefined operation date.
     *
     * @return {object} The generated wagon object.
     */
    generateWagon() {
        return {
            "id": this.wagonId++,
            "start_id": Math.floor(Math.random()*1000),
            "destination_id": Math.floor(Math.random()*1000),
            "operation_date": undefined
        }
    },
    /**
     * Generate wagons based on the given count.
     *
     * @param {number} count - The number of wagons to generate.
     * @return {Array} An array of generated wagons.
     */
    generateWagons(count) {
        let result = [];
        for(let i = 0; i < count; i++)
            result.push(this.generateWagon());
        return result;
    },
    /**
     * Generates an array of trains.
     *
     * @return {Array} An array of trains.
     */
    generateTrains() {
        let result = [];
        for(let i = 0; i < 200; i++)
            result.push(this.generateTrain());
        return result;
    },
    /**
     * Retrieve unique station IDs from an array of train objects.
     *
     * @param {Array} trains - The array of train objects.
     * @return {Array} An array of unique station IDs.
     */
    fetchStations(trains) {
        let result = [];
        for(let train of trains) {
            if(!result.includes(train.start_id))
                result.push(train.start_id);
            if(!result.includes(train.destination_id))
                result.push(train.destination_id);
        }
        return result;
    },
    /**
     * Generates stations for trains.
     *
     * @param {Array} trains - The array of trains.
     * @return {Array} The array of stations generated for the trains.
     */
    generateStationsForTrains(trains) {
        let stations_id = this.fetchStations(trains);
        let result = [];
        for(let id of stations_id) {
            result.push({
                "id": id,
                "coords": this.generateCoordinates(),
                "departures": trains.filter(t => t.start_id == id),
                "current_trains": this.getRandomTrains(trains, 3),
                "arrivals": trains.filter(t => t.destination_id == id)
            })
        }
        return result;
    },
    /**
     * Returns an array of randomly selected trains from the given array.
     *
     * @param {Array} trains - The array of trains to select from.
     * @param {number} amount - The number of trains to select.
     * @return {Array} - An array of randomly selected trains.
     */
    getRandomTrains(trains, amount) {
        let result = [];
        for(let i = 0; i < amount; i++)
            result.push(trains[Math.floor(Math.random()*trains.length)]);
        return result;
    },
    /**
     * Generate a short train object.
     *
     * @param {object} train - The train object to generate a short version of.
     * @return {object} The short train object with the following properties:
     * - id: The id of the train.
     * - start_id: The id of the train's starting point.
     * - destination_id: The id of the train's destination.
     * - coords: The coordinates of the train.
     * - is_move: A boolean indicating if the train is currently moving.
     * - move_time: The time it takes for the train to move.
     */
    shortTrain(train) {
        if(!train) return;
        return {
            "id": train.id,
            "start_id": train.start_id,
            "destination_id": train.destination_id,
            "coords": train.coords,
            "is_move": train.is_move,
            "move_time": train.move_time
        }
    },
    /**
     * Generates a short representation of a station object.
     *
     * @param {Object} station - The station object to generate a short representation of.
     * @return {Object} The short representation of the station object.
     */
    shortStation(station) {
        if(!station) return;
        return {
            "id": station.id,
            "coords": station.coords,
            "departures": station.departures.length > 0 ? station.departures[0] : {},
            "current_trains": station.current_trains.length,
        }
    },
    /**
     * Generate the full path for a train.
     *
     * @param {Object} train - The train object.
     * @param {Array} allTrains - An array of all trains.
     * @return {Object} The full path data and other trains on the path.
     */
    getFullPath(train, allTrains) {
        if(!train) return;
        return {
            "path_data": [
                FrontEndService.convertCoords(designResponses.getStation(train.start_id).coords),
                FrontEndService.convertCoords(train.coords),
                FrontEndService.convertCoords(designResponses.getStation(train.destination_id).coords),
            ],
            "trains_on_path": this.getRandomTrains(allTrains, 3)
        }
    }
}