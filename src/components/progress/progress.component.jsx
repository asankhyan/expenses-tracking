import { Image, Modal, ModalBody} from "react-bootstrap";
import { useSelector } from "react-redux";
import { isProgressEnabled } from "../../redux/progress.reducer";
import { LOADER } from "../../utils/app.constants";

export default function Progress(){
    const progress = useSelector(isProgressEnabled);
    return (
        progress
        ? <Modal className="progress-modal" show={progress} centered>
            <ModalBody style={{margin: "auto"}}>
                <Image src={LOADER} style={{width: "100px"}}/>
            </ModalBody>
        </Modal>
        :null
    );
}