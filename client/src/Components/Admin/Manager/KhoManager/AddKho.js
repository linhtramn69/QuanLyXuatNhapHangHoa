import { Card, Container } from "react-bootstrap";
import FormKho from "./FormKho";

function AddKho() {
    return ( 
        <>
        <Container className="p-5">

        <Card>
            <Card.Header>
                Thêm kho
            </Card.Header>
            <Card.Body className="p-4">
                <FormKho/>
            </Card.Body>
        </Card>
        </Container>
        </>
     );
}

export default AddKho;