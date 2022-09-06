import { Button, Col, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import styledComponent from "styled-components";
import { userSelector } from "../../redux/user.reducer";
import {auth, signInWithGoogle} from '../../utils/firebase.utils'
import Logo from '../../assets/images/AppImg.png';

export default function Header(){
    return(
        <Container>
            <Row style={{width: "100%"}}>
                <Col>
                    <Image src={Logo} height={"120px"}/>
                </Col>
                <Col>
                    <UserMenu/>
                </Col>
            </Row>
        </Container>
    );
}

function UserMenu(){
    const user = useSelector(userSelector);
    return(
        <div style={{float: "right"}}>
            <span style={{marginRight:"10px"}}>Welcome, {user.name}</span>
            <Image src={user.photoUrl} style={{borderRadius: "50px", margin: "0px 20px"}}/>
            {
                user
                ? <Button variant="outline-primary" onClick={()=>auth.signOut()}>Sign Out</Button>
                : <Button variant="outline-primary" onClick={signInWithGoogle}>Sign In</Button>
            }
        </div>
    );
}

const Container = styledComponent.div`
        padding: 10px;
        width: 100%;
        margin: auto;
        display: flex;
        justify-content: space-between;
`;
  