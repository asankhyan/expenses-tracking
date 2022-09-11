import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import expensesReducer from './expenses.reducer';
import userReducer from './user.reducer';
import notificationReducer from './notification.reducer'
import progressReducer from './progress.reducer';

export default configureStore({
    reducer:{
        progress: progressReducer,
        expenses: expensesReducer,
        user: userReducer,
        notification: notificationReducer
    },
    middleware: (mdl)=>mdl().concat(thunk)
});