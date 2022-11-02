import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AddExpense from '../add-expense/add-expense.component';
import ExpensesList from '../expense-list/expenses-list.component';
import Header from '../header/header.component';
import Summary from '../summary/summary.component';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { setUserInfo, userSelector } from '../../redux/user.reducer';
import { auth, signInWithGoogle } from '../../utils/firebase.utils';
import { useEffect } from 'react';
import ExpensesReport from '../expenses-report/expenses-report.component';
import { APP_IMG } from '../../utils/app.constants';

const Container = styled.div`
width: 95%;
margin: auto;
`;

export default function Dashboard(){
    const dispatch = useDispatch();
    useEffect(()=>{
        auth.onAuthStateChanged((userRef)=>{
            console.log("Auth State changing", userRef);
            if(userRef){
                let userInfo = {name: userRef.displayName, email: userRef.email, photoUrl: userRef.photoURL};
                dispatch(setUserInfo(userInfo));
            }else{
                dispatch(setUserInfo(userRef));
            }
        });
    }, [dispatch]);
    return(
        <UserContent/>
    );
    
}


function UserContent(){
    const user = useSelector(userSelector);
    if(user){
        return(
            <Container>
                <Header/>
                <Summary/>
                <Row>
                <Col md="4">
                    <AddExpense/>
                </Col>
                <Col>
                    <ExpensesReport/>
                </Col>
                </Row>
                <hr/>
                <Row style={{display: "flex", justifyContent: "space-around", width:"95%", margin:"auto"}}>
                    <ExpensesList as={Col}/>
                </Row>
            </Container>
        );
    } else{
        return(
            <div className='bg_wall'>
                <Card className='shadow' style={{width:"100%", maxWidth: "500px", margin:"50px auto", border: 0 }}>                  
                    <Card.Body style={{textAlign: "center"}}>
                        <Card.Img variant="top" src={APP_IMG} className='img-fluid' />

                        <h6 className='py-4'> An application to track your earning & daily expenses </h6>

                        <Button className='btn btn_common' onClick={signInWithGoogle}>Sign In with Google</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
  }