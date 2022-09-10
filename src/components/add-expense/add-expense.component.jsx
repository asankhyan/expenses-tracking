import { useDispatch, useSelector } from "react-redux";
import FormButton from "../form-fields/button.component";
import Datepicker from "../form-fields/datepicker.component";
import FormInput from "../form-fields/input.component";
import MultiValueText from "../form-fields/multi-value-text.component";
import { saveExpenseAsync, getSelectedExpense, setExpenseDefaultsAsync, setExpenseDetails, isEditMode } from '../../redux/expenses.reducer'
import { formatDateISO } from "../../utils/date.utils";
import { Card, Form } from "react-bootstrap";
import { showNotificationAsync } from "../../redux/notification.reducer";

export default function AddExpense(){
    let expense = useSelector(getSelectedExpense);
    const editMode = useSelector(isEditMode);
    let dispatch = useDispatch();

    let updateExpenseDetails = (evt, val)=>{
        const {target} = evt;
        const value = val || target.value;
        dispatch(setExpenseDetails({[target.name]: value}));
    }
    let setDate = (val)=>{
        updateExpenseDetails({target:{name: "date"}}, val);
    }
    let setTagsList = (val)=>{
        updateExpenseDetails({target:{name: "tags"}}, val);
    }
    let saveExpenseDetails = ()=>{
        let _expense = {...expense};
        if(validateExpenseDetails(_expense)){
            //dispatching save action
            dispatch(saveExpenseAsync(_expense));
        }
    }
    let validateExpenseDetails = (_expense)=>{
        //validating all the information
        if(!_expense.date){
            dispatch(showNotificationAsync("Please choose date."));
            return false;
        }else{
            _expense.date = formatDateISO(_expense.date);
        }
        let amount = parseFloat(_expense.amount);
        if(isNaN(amount) || amount<=0){
            dispatch(showNotificationAsync("Amount should be greater than 0."));
            return false;
        }else{
            _expense.amount=amount;
        }
        if(_expense.remarks.length===0){
            dispatch(showNotificationAsync("Please enter remarks for expense."));
            return false;
        }
        return true;
    }
    return(
        <Card>
            <Card.Body>
                <Form>
                    <Datepicker selected={expense.date} onChange={setDate} maxDate={new Date()}/>
                    <FormInput name="amount" type={"number"} label={"Amount"} value={expense.amount} onChange={updateExpenseDetails}/>
                    <FormInput as={"textarea"} name="remarks" type={"text"} label={"Remarks"} value={expense.remarks}  onChange={updateExpenseDetails}/>
                    <MultiValueText name="tags" type={"text"} label={"Tags"} value={expense.tags}  onChange={setTagsList}/>
                    <div style={{display: "flex", width: "100%", justifyContent: "space-evenly"}}>
                        <FormButton onClick={saveExpenseDetails}>{editMode?"Update Expense":"Add Expense"}</FormButton>
                        <FormButton onClick={()=>dispatch(setExpenseDefaultsAsync)}>{editMode?"Cancel":"Reset"}</FormButton>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}