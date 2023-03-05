import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import FormType from './FormType'
function EditTypeProduct() {
    const params = useParams();
    return ( 
        <>
         <Card className='m-5'>
                <Card.Header>
                    Cập nhật loại hàng hoá
                </Card.Header>
                <Card.Body className='p-3'>
                <FormType id = {params.id}/>
                </Card.Body>
            </Card>
        
        </>
     );
}

export default EditTypeProduct;