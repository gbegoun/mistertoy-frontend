import { toyService } from "../../services/toy.service.js";

export const SET_TOYS = 'SET_TOYS';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_FILTER_BY = 'SET_FILTER_BY';
export const ADD_TOY = 'ADD_TOY';
export const REMOVE_TOY = 'REMOVE_TOY';
export const UNDO_TOYS = 'UNDO_TOYS';
export const UPDATE_TOY = 'UPDATE_TOY';

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
        case ADD_TOY : {
            return { ...state, toys:[...state.toys, action.toy] };
        }
        case REMOVE_TOY: {
            const lastToys = [...state.toys];
            const toys = state.toys.filter(toy => toy._id !== action.toyId);
            return { ...state, toys, lastToys };
        }
        case UNDO_TOYS: { return { ...state, toys: state.lastToys }; }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading };
        case SET_FILTER_BY:
            return { ...state, filterBy: action.filterBy };
        case UPDATE_TOY:
            return { ...state, toys: state.toys.map(toy => (toy._id === action.toy._id ? action.toy : toy)) };
        default:
            return state;
    }
}