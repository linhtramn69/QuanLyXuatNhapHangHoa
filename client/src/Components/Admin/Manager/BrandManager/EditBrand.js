import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import FormBrand from "./FormBrand";

function EditBrand() {
    const params = useParams();
    return ( 
        <>
        <Container className="p-5">

        <Card>
            <Card.Header>
                Chỉnh sửa chi nhánh
            </Card.Header>
            <Card.Body className="p-4">
                <FormBrand id = {params.id}/>
            </Card.Body>
        </Card>
        </Container>
        </>
     );
}

export default EditBrand;