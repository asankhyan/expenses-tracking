import { useEffect } from "react";
import { Alert, Button, Card, Modal, ModalBody, ModalHeader, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpenseAsync, editExpenseAsync, expensesRange, getExpensesListAsync, selectExpenses, totalExpense } from "../../redux/expenses.reducer";
import { userSelector } from "../../redux/user.reducer";
import { formatDate_ddMMyyyy } from "../../utils/date.utils";
import Tags from "../tags/tags.component";
import ExpensesFilter from "./expenses-filter.component";
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'
import { useState } from "react";

export default function ExpensesList(){
    const expensesList = useSelector(selectExpenses);
    const user = useSelector(userSelector);
    const totalExpenses = useSelector(totalExpense);
    const _expensesRange = useSelector(expensesRange);
    const dispatch = useDispatch();

    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(()=>{
        if(user && user.email)
            dispatch(getExpensesListAsync);
    }, [user, dispatch]);

    const editExpense = (expId)=>{
        dispatch(editExpenseAsync(expId));
    } 

    const deleteExpense = (expId)=>{
        setSelectedItem(expId);
    }
    
    const showDeletePropmt = (itemId)=>{
        const cancelAction = ()=>{
            setSelectedItem(null);
        }
        return(
            <Modal show={itemId} onHide={cancelAction}>
                <ModalHeader closeButton>
                    <strong className="me-auto">Confirmation</strong>
                </ModalHeader>
                <ModalBody>
                    <Alert variant="danger">
                        Are you sure you want to delete this record.
                    </Alert>
                    <div style={{display:"flex", justifyContent: "end", gap:"20px"}}>
                        <Button className='btn btn_common' onClick={()=>{dispatch(deleteExpenseAsync(itemId)); cancelAction();}}>Yes</Button>
                        <Button className='btn btn_common' onClick={cancelAction}>Cancel</Button>
                    </div>
                </ModalBody>
            </Modal>
        );
    }

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
                    selectedItem && showDeletePropmt(selectedItem)
                }
                {
                expensesList && expensesList.length>0
                ?<>
                {
                expensesList.map((item, inx)=>{
                    return(
                        <Toast key={item.id} style={{width: "100%", marginBottom: "10px"}}>
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto"><small>INR</small> {item.amount}</strong>
                                <small><strong>Expense Date:</strong> {item.date}</small>
                                {
                                    item.lastUpdatedOn
                                    ? <small style={{margin: "0 10px"}}><strong>Last Updated:</strong> {item.lastUpdatedOn}</small>
                                    : null
                                }
                                
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
                                    <AiOutlineEdit style={{cursor: "pointer"}} onClick={()=>{editExpense(item.id)}}/>
                                    <AiOutlineDelete style={{cursor: "pointer"}} onClick={()=>{deleteExpense(item.id)}}/>
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