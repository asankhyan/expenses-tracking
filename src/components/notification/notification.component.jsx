import { Alert, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification, notificationSelector } from "../../redux/notification.reducer";
import {IoIosNotifications} from 'react-icons/io'

export default function Notification(){
    const notification = useSelector(notificationSelector);

    const isVisible = notification.isVisible;
    const text=notification.content;
    const dispatch = useDispatch();
    let x = 1;
    if(x)
    return(
        <Modal show={isVisible} animation>
            <Modal.Header onHide={()=>{dispatch(hideNotification())}} closeButton >
                <strong className="me-auto"><IoIosNotifications style={{fontSize: "20pt"}}/></strong>
            </Modal.Header>
            <Modal.Body style={{fontSize: "12pt", padding: "0px", borderRadius: "5px"}}>
                <Alert variant="danger" style={{margin: "0px", padding: "20px 10px", borderRadius: "0px"}}>
                    {text}
                </Alert>
            </Modal.Body>
        </Modal>
    );
}