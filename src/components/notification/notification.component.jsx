import { Toast, ToastContainer } from "react-bootstrap";
import { useSelector } from "react-redux";
import { notificationSelector } from "../../redux/notification.reducer";

export default function Notification(){
    const notification = useSelector(notificationSelector);

    const isVisible = notification.isVisible;
    const text=notification.content;

    if(isVisible)
    return(
        <ToastContainer position="top-center">
            <Toast.Header/>
            <Toast animation={true}>
                <Toast.Body>
                    {text}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}