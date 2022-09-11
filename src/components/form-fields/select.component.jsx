import { Form } from "react-bootstrap";

export default function Select({onChange, label, options, value, name}){
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Select name={name} onChange={onChange} value={value}>
                <option value={""}>--- Select {label} ---</option>
                {
                    options && options.length>0
                    ? options.map(opt=><option key={opt.code} value={opt.code}>{opt.value}</option>)
                    :null
                }
            </Form.Select>
        </Form.Group>
    );
}