import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import expensesReducer from './expenses.reducer';
import userReducer from './user.reducer';

export default configureStore({
    reducer:{
        expenses: expensesReducer,
        user: userReducer
    },
    middleware: (mdl)=>mdl().concat(thunk)
});