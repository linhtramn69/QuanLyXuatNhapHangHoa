import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { khoService } from '../../../../services/index';

function FormKho(props) {
    const [formValues, setFormValues] = useState({});
    const [kho, setKho] = useState({});
    let navigate = useNavigate();
    const HandleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = async (e) => {
        try {

            if (window.confirm("Bạn muốn thêm ?")) {
                const data = {
                   ten_kho: formValues.ten_kho,
                   diachi: formValues.diachi,
                   sdt: formValues.sdt
                }
                await khoService.create(data);
                navigate("/admin/kho-manager");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdate = async (e) => {
        try {

            if (window.confirm("Bạn muốn cập nhật ?")) {
                const data = {
                    ten_kho: formValues.ten_kho,
                    diachi: formValues.diachi,
                    sdt: formValues.sdt
                 }
                 await khoService.update(kho._id,data);
                 navigate("/admin/kho-manager");
            }
        } catch (error) {
            console.log(error);
        }

    };
    useEffect(()=> {
        const get = async () => {
            setKho((await khoService.getId(props.id)).data);
        }
        get()
    })
    return (
        <>
            <Form className='form-export'>
                <Form.Group className='form-group-export me-3 mb-3' >
                    <Form.Label>Tên kho</Form.Label>
                    <Form.Control type="text" defaultValue={kho.ten_kho} placeholder="Nhập tên kho" name="ten_kho" onChange={HandleChange} />
                </Form.Group>
                <Form.Group className='form-group-export me-3 mb-3' >
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control type="text" defaultValue={kho.diachi} placeholder="Địa chỉ" name="diachi" onChange={HandleChange} />
                </Form.Group>
                <Form.Group className='form-group-export me-3' >
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control type="text" defaultValue={kho.sdt} placeholder="Số điện thoại" name="sdt" onChange={HandleChange} />
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

export default FormKho;