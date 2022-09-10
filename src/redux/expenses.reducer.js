import { createSlice } from "@reduxjs/toolkit";
import { parseISO, setHours, setMinutes, setSeconds } from "date-fns";
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { formatDate_ddMMyyyy } from "../utils/date.utils";
import { fireStore } from "../utils/firebase.utils";
import { showNotificationAsync } from "./notification.reducer";
import { getUserEmail } from "./user.reducer";

const expenseDefaults = {id: null, date: new Date(), amount:"", remarks:"", tags:[]};

export const expenseSlice = createSlice({
    name: "Expenses",
    initialState:()=>{
        let minDate = new Date();
        minDate.setDate(1);
        minDate = setHours(setMinutes(setSeconds(minDate, 0), 0), 0);
        const maxDate = setHours(setMinutes(setSeconds(new Date(), 59), 59), 23);
        return {selectedExpense: expenseDefaults, range: {minDate: minDate, maxDate:maxDate}, list: []};
    },
    reducers:{
        addExpense: (state, action)=>{
            const {payload} = action;
            
            state.list.splice(0, 0, payload);
            return state;
        },
        setExpenseDetails:(state, action)=>{
            return {...state, selectedExpense: {...state.selectedExpense, ...action.payload}};
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

function getExpensesCollectionPath(state){
    const email = getUserEmail(state);
    return `users/${email}/expenses`;
}

function getExpensesCollection(state){
    return collection(fireStore, getExpensesCollectionPath(state));
}

function getExpenseDocRef(state, docId){
    return doc(fireStore, getExpensesCollectionPath(state), docId);
}

export const setExpenseDefaultsAsync = (dispatch)=>{
    dispatch(setExpenseDetails(expenseDefaults));
}

export const saveExpenseAsync = (expense)=>{
    return (dispatch, getState)=>{
        let msg = ""
        let newDate = parseISO(expense.date);
        if(expense.id != null && expense.id != undefined){
            let usrExpenseDocRef = getExpenseDocRef(getState(), expense.id);
            delete expense.id;
            let _docPromise = updateDoc(usrExpenseDocRef, {...expense, date: newDate, lastUpdatedOn: new Date()});
            _docPromise.then(res=>{
                msg="Expense updated successfully.";
                dispatch(getExpensesListAsync);
            }).catch(err=>{
                console.error(err);
                msg="unable to update expense details.";
            }).finally(()=>{
                dispatch(showNotificationAsync(msg));
            });
        }else{
            let usrExpensesRef = getExpensesCollection(getState());
            let _docPromise = addDoc(usrExpensesRef, {...expense, date: newDate});
            _docPromise.then(res=>{
                const _expense = {...expense, id: res.id, date: formatDate_ddMMyyyy(newDate)};
                dispatch(addExpense(_expense));
                msg="Expense added successfully.";
            }).catch(err=>{
                msg="unable to add expense.";
            }).finally(()=>{
                dispatch(showNotificationAsync(msg));
            });
        }
        dispatch(setExpenseDefaultsAsync);
    }
}

export const editExpenseAsync  = (docId) => (dispatch, getState) => {
    let docRef = getExpenseDocRef(getState(), docId);
    let _docPromise = getDoc(docRef);
    _docPromise.then(res=>{
        if(res.exists()){
            let docData = res.data();
            dispatch(setExpenseDetails({...docData, id:res.id, date: docData.date.toDate()}))
        }else{
            console.error("doc not found");
        }
    }).catch(err=>{
        dispatch(showNotificationAsync(err));
    }).finally(()=>{
        scrollTo(0, 0);
    });
};

export const getExpensesListAsync= (dispatch, getState)=>{
    // const expensesCollectionPath = 
    let userExpenses = getExpensesCollection(getState());
    let allDocsQuery = query(userExpenses, orderBy("date", "desc"));
    
    const range = expensesRange(getState());

    
    const minDate = setHours(setMinutes(setSeconds(range.minDate, 0), 0), 0);
    const maxDate = setHours(setMinutes(setSeconds(range.maxDate, 59), 59), 23);

    let forCurrentMonth = query(allDocsQuery, where("date", ">", minDate), where("date", "<", maxDate));
    getDocs(forCurrentMonth).then(result=>{
        let docArray = [];
        result.docs.map(doc=>{
            let docData = doc.data();
            const _expense = {...docData, id:doc.id, date: formatDate_ddMMyyyy(docData.date.toDate())};
            if(_expense.lastUpdatedOn){
                _expense.lastUpdatedOn = formatDate_ddMMyyyy(docData.lastUpdatedOn.toDate());
            }
            return docArray.push(_expense);
        });
        dispatch(setExpenses(docArray));
    }).catch(error=>console.log(error));
}

export const {addExpense, setExpenseDetails, setExpenses, setExpensesRange} = expenseSlice.actions;
export default expenseSlice.reducer;
export const selectExpenses = (state)=>state.expenses.list;
export const getSelectedExpense = (state)=>state.expenses.selectedExpense;

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

export const isEditMode = (state)=>{
    return state.expenses.selectedExpense.id?true:false
}