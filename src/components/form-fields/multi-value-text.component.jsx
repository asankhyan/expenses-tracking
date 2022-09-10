import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Tags from "../tags/tags.component";

function MultiValueText(props){
    const [tag, setTag] = useState("");
    const {value, label, onChange} = props;
    const _value = [...value];
    let updateTag = (evt)=>{
        const _tag = evt.target.value;
        setTag(_tag);
    }
    let addItemToList = ()=>{
        if(tag && tag.length>0 && _value.indexOf(tag) < 0){
            _value.splice(0, 0, tag);
            onChange(_value);
        }
        setTag("");
    };
    const removeTag = (inx)=>{
        if(_value && _value.length>0){
            _value.splice(inx, 1);
            onChange(_value);
        }
    }
    const newProps = {...props, onChange: updateTag, value: tag};
    return(
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <InputGroup>
                <InputGroup.Text>#</InputGroup.Text>
                <Form.Control {...newProps}/>
                <InputGroup.Text onClick={addItemToList}>Add</InputGroup.Text>
            </InputGroup>
            <Form.Text className="text-muted">
                <span className="danger">Add tags to easily find this expense later. You can click on a tag to remove them.</span>
            </Form.Text>
            <div style={{margin: "10px 0px"}}>
                <Tags tags={_value} tagOnClick={(inx)=>{removeTag(inx)}}/>
            </div>
        </Form.Group>
    );
}

export default MultiValueText;