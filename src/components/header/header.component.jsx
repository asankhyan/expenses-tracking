import { Button, Col, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import styledComponent from "styled-components";
import { userSelector } from "../../redux/user.reducer";
import { APP_IMG } from "../../utils/app.constants";
import {auth, signInWithGoogle} from '../../utils/firebase.utils'
import Notification from "../notification/notification.component";

export default function Header(){
    return(
        <Container>
            <Row style={{width: "100%"}}>
                <Col>
                    <Image src={APP_IMG} height={"120px"}/>
                </Col>
                <Col>
                    <UserMenu/>
                </Col>
            </Row>
            <Notification/>
        </Container>
    );
}

function UserMenu(){
    const user = useSelector(userSelector);
    return(
        <>
        <div style={{float: "right"}}>
            <span style={{marginRight:"10px"}}> Welcome, {user.name} </span>
            <Image src={user.photoUrl} style={{height:"50px", borderRadius: "50px", margin: "0px 10px"}}/>
            {
                user
                ? <Button className='btn btn_common' variant="outline-primary" onClick={()=>auth.signOut()}>Sign Out</Button>
                : <Button className='btn btn_common' variant="outline-primary" onClick={signInWithGoogle}>Sign In</Button>
            }
        </div>
        </>
    );
}

const Container = styledComponent.div`
        padding: 10px;
        width: 100%;
        margin: auto;
        display: flex;
        justify-content: space-between;
`;
  