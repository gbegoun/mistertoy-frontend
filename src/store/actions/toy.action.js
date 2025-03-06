import { toyService } from "../../services/toy.service.js";
import { SET_TOYS, SET_IS_LOADING, SET_FILTER_BY, REMOVE_TOY, UNDO_TOYS } from "../reducers/toy.reducer.js";
import { store } from "../store.js";

export function loadToys(filterBy = {}) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true });
    return toyService.query(filterBy)
        .then(toys => store.dispatch({ type: SET_TOYS, toys }))
        .catch(err => {
            console.log('Error:', err);
            throw err;
        })
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }));
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy });
}

export function removeToy(toyId) { //Optimistic
    store.dispatch({ type: REMOVE_TOY, toyId });
    return toyService.remove(toyId)
        .catch(err => {
            store.dispatch({ type: UNDO_TOYS })
            console.log('Error:', err);
            throw err;
        });
}