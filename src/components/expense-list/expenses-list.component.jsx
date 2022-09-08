import { useEffect } from "react";
import { Card, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { expensesRange, getExpensesListAsync, selectExpenses, totalExpense } from "../../redux/expenses.reducer";
import { userSelector } from "../../redux/user.reducer";
import { formatDate_ddMMyyyy } from "../../utils/date.utils";
import Tags from "../tags/tags.component";
import ExpensesFilter from "./expenses-filter.component";
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'

function ExpensesList(){
    const expensesList = useSelector(selectExpenses);
    const user = useSelector(userSelector);
    const totalExpenses = useSelector(totalExpense);
    const _expensesRange = useSelector(expensesRange);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(user && user.email)
            dispatch(getExpensesListAsync);
    }, [user, dispatch]);
    return(
        <Card>
            <Card.Header>
                <strong>Your Expenses List for period {formatDate_ddMMyyyy(_expensesRange.minDate)} - {formatDate_ddMMyyyy(_expensesRange.maxDate)}</strong>
                <small style={{float: "right"}}>
                    Total Expense:  
                    <strong> INR {totalExpenses}</strong>
                </small>
            </Card.Header>
            <Card.Header>
                <ExpensesFilter/>
            </Card.Header>
            <Card.Body style={{maxHeight: "450px", overflow: "auto"}}>
                {
                expensesList && expensesList.length>0
                ?<>
                {
                expensesList.map((item, inx)=>{
                    return(
                        <Toast key={inx} style={{width: "100%", marginBottom: "10px"}}>
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto"><small>INR</small> {item.amount}</strong>
                                <small>{item.date}</small>
                                <div style={{
                                    padding: "3px 10px",
                                    width: "64px",
                                    background: "#efefef",
                                    margin: "0 10px",
                                    display: "flex",
                                    color: "#414148",
                                    justifyContent: "space-between",
                                    borderRadius: "5px"
                                }}>
                                    <AiOutlineEdit style={{cursor: "pointer"}} onClick={()=>{console.log("edit clicked")}}/>
                                    <AiOutlineDelete style={{cursor: "pointer"}} onClick={()=>{console.log("delete clicked")}}/>
                                </div>
                            </Toast.Header>
                            <Toast.Body>
                                <span>{item.remarks}</span>
                                {
                                    item.tags && item.tags.length > 0
                                    ? (
                                        <>
                                            <hr/>
                                            <div>
                                                <Tags tags={item.tags}/>
                                            </div>
                                        </>
                                    )
                                    :null
                                }
                            </Toast.Body>
                        </Toast>
                    );
                })
                }</>
                : <span>No Expenses entered yet for this period.</span>
                }
            </Card.Body>
        </Card>
    );
}


export default ExpensesList;