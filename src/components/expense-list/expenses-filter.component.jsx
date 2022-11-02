import Datepicker from "../form-fields/datepicker.component";
import { expensesRange, getExpensesListAsync, setExpensesRange} from "../../redux/expenses.reducer";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import FormButton from "../form-fields/button.component";
import { useState } from "react";

export default function ExpensesFilter(){
    const range = useSelector(expensesRange);
    // const startDate = ;
    // const endDate = range.maxDate;
    let dispatch = useDispatch();
    const [startDate, setStartDate] = useState(range.minDate);
    const [endDate, setEndDate] = useState(range.maxDate);
    // const setStartDate = (startDate)=>{
    //     if(startDate) 
    //         
    // }
    // const setEndDate = (endDate)=>{
    //     if(endDate) 
    //         dispatch(setExpensesRange({maxDate: endDate}));
    // }
    const applyFilter = ()=>{
        dispatch(setExpensesRange({minDate: startDate, maxDate: endDate}));
        dispatch(getExpensesListAsync);
    };
    return(
        <div>
        <Container>
            <Row>
                <Col className="md-3">
                    <div>
                        <label>From: </label>
                        <Datepicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            maxDate={endDate}
                        />
                    </div>
                </Col>
                <Col>
                    <label>To: </label>
                    <Datepicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                </Col>
                <Col style={{margin:"auto"}}>
                    <FormButton className='btn btn_common' onClick={applyFilter}>Apply Filter</FormButton>
                </Col>
            </Row>
            </Container>
        </div>
    );
}