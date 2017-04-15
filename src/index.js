const Redux = require('Redux');
const createStore = Redux.createStore;
const initialState = require('../initialstate');

// reducer that handles a study
const studies = (state = [], action) => {
    switch(action.type) {
        case 'ADD_STUDY':
            console.log('old state', state.weekplan[0].studies);
            state = [...state.weekplan[0].studies, action.payload];
            return state;
        default:
            return state;    
    }
} ;


// we need to pass the reducer when creating a store that will tell how the state can be modified
// // we create a store without passing an initial state
// const store = createStore(study);
const store = createStore(studies, initialState);

// // getState() retrieves the current state from the store
// console.log('state:', store.getState());

// we dispatch an action to change the state of our application
store.dispatch({
    type: 'ADD_STUDY',
    payload: 'Meteor'
});

store.subscribe()

store.subscribe(() => {
    console.log('into subscribe');
    console.log(store.getState());
});

console.log('new state:', store.getState());