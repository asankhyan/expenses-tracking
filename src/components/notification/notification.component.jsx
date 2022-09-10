import { Alert, Toast, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification, notificationSelector } from "../../redux/notification.reducer";
import {IoIosNotifications} from 'react-icons/io'

export default function Notification(){
    const notification = useSelector(notificationSelector);

    const isVisible = notification.isVisible;
    const text=notification.content;
    const dispatch = useDispatch();
    return(
        <ToastContainer position="top-center">
            <Toast animation={true} show={isVisible} onClose={()=>{dispatch(hideNotification())}}>
                <Toast.Header style={{backgroundColor: "#ebe8e8"}}>
                    <strong className="me-auto"><IoIosNotifications/></strong>
                </Toast.Header>
                <Toast.Body style={{fontSize: "12pt", padding: "0px"}}>
                    <Alert variant="danger" style={{margin: "0px", borderRadius: "0px"}}>
                        {text}
                    </Alert>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}