import { createSlice } from "@reduxjs/toolkit";
import { parseISO, setHours, setMinutes, setSeconds } from "date-fns";
import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { formatDate_ddMMyyyy } from "../utils/date.utils";
import { fireStore } from "../utils/firebase.utils";
import { getUserEmail } from "./user.reducer";

export const expenseSlice = createSlice({
    name: "Expenses",
    initialState:()=>{
        let minDate = new Date();
        minDate.setDate(1);
        minDate = setHours(setMinutes(setSeconds(minDate, 0), 0), 0);
        const maxDate = setHours(setMinutes(setSeconds(new Date(), 59), 59), 23);
        return {range: {minDate: minDate, maxDate:maxDate}, list: []};
    },
    reducers:{
        addExpense: (state, action)=>{
            const {payload} = action;
            
            state.list.splice(0, 0, payload);
            return state;
        },
        setExpenses:(state, action)=>{
            return {...state, list: action.payload};
        },
        setExpensesRange: (state, action)=>{
            let minDate = action.payload.minDate;
            let maxDate = action.payload.maxDate;
            if(!minDate){
                minDate = state.range.minDate;
            }
            if(!maxDate){
                maxDate = state.range.maxDate;
            }
            return {...state, range: {minDate: minDate, maxDate: maxDate}};
        }
    }
});

function getExpensesCollection(state){
    const email = getUserEmail(state);
    return `users/${email}/expenses`;
}

export const addExpenseAsync = (expense)=>{
    return (dispatch, getState)=>{
        let newDate = parseISO(expense.date);
        const expensesCollectionPath = getExpensesCollection(getState());
        let usrExpensesRef = collection(fireStore, expensesCollectionPath);
        addDoc(usrExpensesRef, {...expense, date: newDate});

        dispatch(addExpense({...expense, date: formatDate_ddMMyyyy(newDate)}));
    }
}

export const getExpensesListAsync= (dispatch, getState)=>{
    const expensesCollectionPath = getExpensesCollection(getState());
    let userExpenses = collection(fireStore, expensesCollectionPath);
    let allDocsQuery = query(userExpenses, orderBy("date", "desc"));
    
    const range = expensesRange(getState());

    let forCurrentMonth = query(allDocsQuery, where("date", ">", range.minDate), where("date", "<", range.maxDate));
    getDocs(forCurrentMonth).then(result=>{
        let docArray = [];
        result.docs.map(doc=>{
            let docData = doc.data();
            return docArray.push({...docData, date: formatDate_ddMMyyyy(docData.date.toDate())});
        });
        dispatch(setExpenses(docArray));
    }).catch(error=>console.log(error));
}

export const {addExpense, setExpenses, setExpensesRange} = expenseSlice.actions;
export default expenseSlice.reducer;
export const selectExpenses = (state)=>state.expenses.list;


export const oneRecordPerDateSelectorForReport = (state)=>{
    let expenses = state.expenses.list;
    expenses = expenses.reduce((prevValue, _item)=>{
        let item = {..._item};
        let currentItem = prevValue[item.date];
        if(!currentItem){
            prevValue[item.date] = currentItem = item;
            let _t = currentItem["sub_expenses"];
            if(!currentItem["sub_expenses"]){
                currentItem["sub_expenses"] = _t = {};
            }
            const tagsStr = item.tags.join(", ");
            if(!_t[tagsStr]){
                _t[tagsStr] = item.amount;
            }else{
                _t[tagsStr] += item.amount;
            }
        }else{
            const tagsStr = item.tags.join(", ");
            let _t = currentItem["sub_expenses"];
            if(!_t[tagsStr]){
                _t[tagsStr] = item.amount;
            }else{
                _t[tagsStr] += item.amount;
            }
            currentItem.amount+=item.amount;
        }
        return prevValue;
    }, {});
    const expensesList = [];
    for(var key in expenses){
        expensesList.push(expenses[key]);
    }
    return expensesList;
}

export const expensesSelectorForReport = (state)=>{
    return state.expenses.list;
}
export const expensesRange = (state)=>state.expenses.range;

export const totalExpense = (state)=>{
    const total = state.expenses.list.reduce((prevValue, item)=>{
        return prevValue + parseFloat(item.amount);
    }, 0)
    return total;
};
