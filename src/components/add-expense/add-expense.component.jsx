import { useState } from "react";
import { useDispatch } from "react-redux";
import FormButton from "../form-fields/button.component";
import Datepicker from "../form-fields/datepicker.component";
import FormInput from "../form-fields/input.component";
import MultiValueText from "../form-fields/multi-value-text.component";
import { addExpenseAsync } from '../../redux/expenses.reducer'
import { formatDateISO } from "../../utils/date.utils";
import { Card, Form } from "react-bootstrap";

export default function AddExpense(){
    const expenseDefaults = {date: new Date(), amount:"", remarks:"", tags:[]};
    const [expense, setExpense] = useState(expenseDefaults);
    let dispatch = useDispatch();

    let updateExpenseDetails = (evt, val)=>{
        const {target} = evt;
        const value = val || target.value;
        
        setExpense(prevState=>{
            const newState = {...prevState, [target.name]: value};
            return newState;
        });
    }
    let setDate = (val)=>{
        updateExpenseDetails({target:{name: "date"}}, val);
    }
    let setTagsList = (val)=>{
        updateExpenseDetails({target:{name: "tags"}}, val);
    }
    let addExpenseDetails = ()=>{
        let _expense = {...expense};
        //validating all the information
        if(!_expense.date){
            alert("Please choose date.");
            return false;
        }else{
            _expense.date = formatDateISO(_expense.date);
        }
        let amount = parseFloat(_expense.amount);
        if(isNaN(amount) || amount<=0){
            alert("Amount should be greater than 0.");
            return false;
        }else{
            _expense.amount=amount;
        }
        if(_expense.remarks.length===0){
            alert("Please enter remarks for expense.");
            return false;
        }
        //dispatching save action
        dispatch(addExpenseAsync(_expense));

        //setting form to default values
        setExpense(expenseDefaults);
    }
    return(
        <Card>
            <Card.Body>
                <Form>
                    <Datepicker selected={expense.date} onChange={setDate} maxDate={new Date()}/>
                    <FormInput name="amount" type={"number"} label={"Amount"} value={expense.amount} onChange={updateExpenseDetails}/>
                    <FormInput as={"textarea"} name="remarks" type={"text"} label={"Remarks"} value={expense.remarks}  onChange={updateExpenseDetails}/>
                    <MultiValueText name="tags" type={"text"} label={"Tags"} value={expense.tags}  onChange={setTagsList}/>
                    <FormButton onClick={addExpenseDetails}>Add Expense</FormButton>
                </Form>
            </Card.Body>
        </Card>
    );
}