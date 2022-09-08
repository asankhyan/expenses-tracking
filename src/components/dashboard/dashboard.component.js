import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AddExpense from '../add-expense/add-expense.component';
import ExpensesList from '../expense-list/expenses-list.component';
import Header from '../header/header.component';
import Summary from '../summary/summary.component';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { setUserInfo, userSelector } from '../../redux/user.reducer';
import Logo from '../../assets/images/AppImg.png';
import { auth, signInWithGoogle } from '../../utils/firebase.utils';
import { useEffect } from 'react';
import ExpensesReport from '../expenses-report/expenses-report.component';

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
                    <ExpensesList as={Col}/>
                </Col>
                </Row>
                <hr/>
                <Row style={{display: "flex", justifyContent: "space-around"}}>
                    <ExpensesReport/>
                </Row>
            </Container>
        );
    } else{
        return(
            <Card style={{width:"100%", maxWidth: "500px", margin:"50px auto"}}>
                <Card.Img variant="top" src={Logo}/>
                <Card.Body style={{textAlign: "center"}}>
                    <Button onClick={signInWithGoogle}>Sign In with Google</Button>
                </Card.Body>
            </Card>
        );
    }
  }
  