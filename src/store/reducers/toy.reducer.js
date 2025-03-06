import { toyService } from "../../services/toy.service.js";

export const SET_TOYS = 'SET_TOYS';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_FILTER_BY = 'SET_FILTER_BY';
export const REMOVE_TOY = 'REMOVE_TOY';
export const UNDO_TOYS = 'UNDO_TOYS';

const initialState = {
    toys: null,
    lastToys: null,
    filterBy: toyService.getDefaultFilter(),
    isLoading: false,
};

export function toyReducer(state = initialState, action = {}) {

    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys };
        case REMOVE_TOY: {
            const lastToys = [...state.toys];
            const toys = state.toys.filter(toy => toy._id !== action.toyId);
            return { ...state, toys, lastToys};
        }
        case UNDO_TOYS: { return { ...state, toys: state.lastToys }; }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading };
        case SET_FILTER_BY:
            return { ...state, filterBy: action.filterBy };
        default:
            return state;
    }
}