import { Button, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import styledComponent from "styled-components";
import { userSelector } from "../../redux/user.reducer";
import {auth, signInWithGoogle} from '../../utils/firebase.utils'
import Logo from '../../assets/images/logo.png';

export default function Header(){
    return(
        <Container>
            <Image src={Logo} height={"90px"}/>
            <UserMenu/>
        </Container>
    );
}

function UserMenu(){
    const user = useSelector(userSelector);
    return(
        <div>
            <span style={{marginRight:"10px"}}>Welcome, {user.name}</span>
            {/* <Image src={user.profilePic} rounded/> */}
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
  