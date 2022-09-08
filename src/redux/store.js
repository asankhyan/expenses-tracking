import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import expensesReducer from './expenses.reducer';
import userReducer from './user.reducer';
import notificationReducer from './notification.reducer'

export default configureStore({
    reducer:{
        expenses: expensesReducer,
        user: userReducer,
        notification: notificationReducer
    },
    middleware: (mdl)=>mdl().concat(thunk)
});