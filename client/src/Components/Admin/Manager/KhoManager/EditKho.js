import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import FormBrand from "./FormKho";

function EditKho() {
    const params = useParams();
    return ( 
        <>
        <Container className="p-5">

        <Card>
            <Card.Header>
                Chỉnh sửa kho
            </Card.Header>
            <Card.Body className="p-4">
                <FormBrand id = {params.id}/>
            </Card.Body>
        </Card>
        </Container>
        </>
     );
}

export default EditKho;