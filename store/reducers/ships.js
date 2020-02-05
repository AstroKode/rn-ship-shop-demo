import { WARSHIPS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS, SET_SHIPS } from '../actions/ships';

const initialState = {
    ships: WARSHIPS,
    filteredShips: WARSHIPS,
    favoriteShips: [],
    userProducts: WARSHIPS.filter(prod => prod.ownerId === 'u1')
}

const shipsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteShips.findIndex(ship => ship.id === action.shipId)
            if (existingIndex >= 0) { // Remove from favoriteShips
                const updatedShips = [...state.favoriteShips];
                updatedShips.splice(existingIndex, 1);
                return { ...state, favoriteShips: updatedShips };
            } else {    // Add new ship to favs
                const ship = state.ships.find(ship => ship.id === action.shipId);
                return { ...state, favoriteShips: state.favoriteShips.concat(ship) };
            }
        case SET_FILTERS:
            const appliedFilters = action.filters;
            const updatedFilteredShips = state.ships.filter(ship => {
                if (appliedFilters.sunk && !ship.destroyed) {
                    return false;
                }
                if (appliedFilters.ww1Era && !ship.isWW1EraShip) {
                    return false;
                }
                return true;
            })
            return { ...state, filteredShips: updatedFilteredShips }
        case SET_SHIPS:
            return {
                ...state,
                sh
            }
        default:
            return state;
    }
}

export default shipsReducer;