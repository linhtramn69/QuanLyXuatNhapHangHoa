import { Card } from 'react-bootstrap';
import FormType from './FormType'
function AddTypeProduct() {
    return (
        <>
            <Card className='m-5'>
                <Card.Header>
                    Thêm loại hàng hoá
                </Card.Header>
                <Card.Body className='p-3'>
                    <FormType />
                </Card.Body>
            </Card>
        </>
    );
}

export default AddTypeProduct;