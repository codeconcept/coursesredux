// react
const ReactDOM = require('react-dom');

// redux
const Redux = require('Redux');
const combineReducers = Redux.combineReducers;
const createStore = Redux.createStore;
const initialState = require('../initialstate');

const weekplan = (state = [], action)=> {
    console.log('weekplan state:', state);
    switch(action.type) {
        case 'ADD_WEEKPLAN_DAY':
            return [...state, action.payload];
        case 'EDIT_WEEKPLAN_DAY':
            const index = state.findIndex(wp => wp.date !== action.payload.date);
            return [...state.slice(0, index), action.payload, ...state.slice(index+1)];       
    }
    return state;
};


// reducer that handles cycle state
const cycleInMinutes = (state = 60, action) => {
    switch(action.type) {
        case 'CHANGE_CYCLE_DURATION':
            return action.payload;
    }
    return state;
}

// reducer that handles the cycles state
const cyclePerDay = (state = 5, action) => {
    switch(action.type) {
        case 'CHANGE_CYCLE_NUMBER':
            state = action.payload;
            return state;
    }
    return state;
}

// reducer that handles topics state
const topics = (state = {}, action) => {
    switch(action.type) {
        case 'CHANGE_TOPICS_FAVORITES':
            state = Object.assign({}, state, action.payload);
            return state;      
    }
    return state;
}

// we need to pass the reducer when creating a store that will tell how the state can be modified
// // we create a store without passing an initial state
// // const store = createStore(study);
// const store = createStore(studies, initialState);
const store = createStore(combineReducers({weekplan, cycleInMinutes, cyclePerDay, topics}), initialState);
console.log('init', store.getState());

// // getState() retrieves the current state from the store
// console.log('state:', store.getState());


store.subscribe(() => {
    console.log('into subscribe');
    console.log('new state:', store.getState());
});

// we dispatch an action to change the state of our application
store.dispatch({
    type: 'EDIT_WEEKPLAN_DAY',
    payload: {
        date: "2017-04-25",
        workday: true,
        blogDay: false,
        recordingDay: true,
        studies: ["Firebase 3", "Angular 4"]
    }
});

store.dispatch({
    type: 'CHANGE_CYCLE_DURATION',
    payload: 50
});

store.dispatch({
    type: 'CHANGE_TOPICS_FAVORITES',
    payload: {
        'favorites': ['guitare', 'moto', 'avion']
    }
});

// console.log('new state:', store.getState());