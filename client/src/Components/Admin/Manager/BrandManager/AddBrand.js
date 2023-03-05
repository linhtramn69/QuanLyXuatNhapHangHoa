import { Card, Container } from "react-bootstrap";
import FormBrand from "./FormBrand";

function AddKho() {
    return ( 
        <>
        <Container className="p-5">

        <Card>
            <Card.Header>
                Thêm chi nhánh
            </Card.Header>
            <Card.Body className="p-4">
                <FormBrand/>
            </Card.Body>
        </Card>
        </Container>
        </>
     );
}

export default AddKho;