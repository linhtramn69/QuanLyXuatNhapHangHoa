import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { typeProductService } from '../../../../services/index';

function FormType(props) {

    const [type, setType] = useState({});
    const [formValues, setFormValues] = useState({});
    let navigate = useNavigate();
    var id = props.id;
    const HandleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = async (e) => {
        try {

            if (window.confirm("Bạn muốn thêm ?")) {
                const data = {
                    ma_loai: formValues.ma_loai,
                    ten_loaihh: formValues.ten_loaihh
                }
                await typeProductService.create(data);
                navigate("/admin/type-product-manager");
            }



        } catch (error) {
            console.log(error);
        }

    };
    const handleUpdate = async (e) => {
        try {

            if (window.confirm("Bạn muốn cập nhật ?")) {
                const data = {
                    ma_loai: formValues.ma_loai,
                    ten_loaihh: formValues.ten_loaihh
                }
                await typeProductService.update(id, data);
                navigate("/admin/type-product-manager");
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const get = async () => {
            setType((await typeProductService.getId(id)).data);
        }
        get();

    })
    return (
        <>
            <Form className='form-export'>
                <Form.Group className='form-group-export me-3'>
                    <Form.Label>Mã loại</Form.Label>
                    {(() => {
                        if (type._id != undefined) {
                            return (<Form.Control type="text" disabled placeholder="Nhập mã loại" defaultValue={type._id} name="ma_loai" onChange={HandleChange} />)
                        }
                        else {
                            return (<Form.Control type="text" placeholder="Nhập mã loại" name="ma_loai" onChange={HandleChange} />)
                        }
                    })()}
                </Form.Group>
                <Form.Group className='form-group-export me-3'>
                    <Form.Label>Tên loại</Form.Label>
                    <Form.Control type="text" placeholder="Nhập tên loại" defaultValue={type.ten_loaihh} name="ten_loaihh" onChange={HandleChange} />
                </Form.Group>
            </Form>
            {(() => {
                if (props.id !== undefined) {
                    return (
                        <button className="btn btn-success py-2 ms-auto d-block mt-4" onClick={handleUpdate}>
                            <FontAwesomeIcon className='icon-btn' icon={faPlus} /> Cập nhật
                        </button>
                    )

                }
                else {
                    return (
                        <button className="btn btn-success py-2 ms-auto d-block mt-4" onClick={handleSubmit}>
                            <FontAwesomeIcon className='icon-btn' icon={faPlus} /> Thêm
                        </button>
                    )
                }
            })()}

        </>
    );
}

export default FormType;