import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function Datepicker(props){
    return (
        <Form.Group className="mb-3">
            <Form.Label>{props.label}</Form.Label>
            <DatePicker customInput={<Form.Control/>} {...props} dateFormat={'dd/MM/yyyy'} />
        </Form.Group>
    );
}