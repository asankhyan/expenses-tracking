import Form from 'react-bootstrap/Form';

function FormInput(props){
    const {label} = props;
    return(
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control {...props}/>
        </Form.Group>
    );   
}

export default FormInput;