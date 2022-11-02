import { useDispatch, useSelector } from "react-redux";
import FormButton from "../form-fields/button.component";
import Datepicker from "../form-fields/datepicker.component";
import FormInput from "../form-fields/input.component";
import MultiValueText from "../form-fields/multi-value-text.component";
import { saveExpenseAsync, getSelectedExpense, setExpenseDefaultsAsync, setExpenseDetails, isEditMode } from '../../redux/expenses.reducer'
import { formatDateISO } from "../../utils/date.utils";
import { Card, Col, Form, Row } from "react-bootstrap";
import { showNotificationAsync } from "../../redux/notification.reducer";
import Select from "../form-fields/select.component";
import { ExpenseCategories } from "../../utils/app.constants";

export default function AddExpense(){
    let expense = useSelector(getSelectedExpense);
    const editMode = useSelector(isEditMode);
    let dispatch = useDispatch();

    let updateExpenseDetails = (evt, val)=>{
        const {target} = evt;
        const value = val || target.value;
        console.log(target.name, value);
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
        <Card className="shadow">
            <Card.Body>
                <Form>
                    <Datepicker label={"Expense Date"} selected={expense.date} onChange={setDate} maxDate={new Date()}/>
                    <Row className="md-6">
                        <Col>
                            <FormInput name="amount" type={"number"} label={"Amount"} value={expense.amount} onChange={updateExpenseDetails}/>
                        </Col>
                        <Col>
                            <Select name="category" label={"Category"} onChange={updateExpenseDetails} value={expense.category} options={ExpenseCategories}/>
                        </Col>
                    </Row>
                    <FormInput as={"textarea"} name="remarks" type={"text"} label={"Remarks"} value={expense.remarks}  onChange={updateExpenseDetails}/>
                    <MultiValueText name="tags" type={"text"} label={"Tags"} value={expense.tags}  onChange={setTagsList}/>
                    <div style={{display: "flex", width: "100%", justifyContent: "end", gap:"20px"}}>
                        <FormButton className='btn btn_common' onClick={saveExpenseDetails}>{editMode?"Update Expense":"Add Expense"}</FormButton>
                        <FormButton className='btn btn_common' onClick={()=>dispatch(setExpenseDefaultsAsync)}>{editMode?"Cancel":"Reset"}</FormButton>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}