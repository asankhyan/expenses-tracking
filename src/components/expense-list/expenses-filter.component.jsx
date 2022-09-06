import Datepicker from "../form-fields/datepicker.component";
import { expensesRange, setExpensesRange} from "../../redux/expenses.reducer";
import { useDispatch, useSelector } from "react-redux";

export default function ExpensesFilter(){
    let dispatch = useDispatch();
    const setStartDate = (startDate)=>{
        if(startDate) 
            dispatch(setExpensesRange({minDate: startDate}));
    }
    const setEndDate = (endDate)=>{
        if(endDate) 
            dispatch(setExpensesRange({maxDate: endDate}));
    }
    const range = useSelector(expensesRange);
    const startDate = range.minDate;
    const endDate = range.maxDate;
    return(
        <div>
            <small style={{color:"red"}}>**** Filters will be available in future verisons. ****</small>
            <Datepicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
            />
            <Datepicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
            />
        </div>
    );
}
