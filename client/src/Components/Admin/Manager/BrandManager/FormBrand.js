import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { brandService } from '../../../../services/index';

function FormBrand(props) {
    const [formValues, setFormValues] = useState({});
    const [brand, setBrand] = useState({});
    let navigate = useNavigate();
    const HandleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = async (e) => {
        try {

            if (window.confirm("Bạn muốn thêm ?")) {
                const data = {
                   ten_cn: formValues.ten_cn,
                   diachi: formValues.diachi,
                   sdt: formValues.sdt
                }
                await brandService.create(data);
                navigate("/admin/brand-manager");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdate = async (e) => {
        try {

            if (window.confirm("Bạn muốn cập nhật ?")) {
                const data = {
                    ten_cn: formValues.ten_cn,
                    diachi: formValues.diachi,
                    sdt: formValues.sdt
                 }
                 await brandService.update(brand._id,data);
                 navigate("/admin/brand-manager");
            }
        } catch (error) {
            console.log(error);
        }

    };
    useEffect(()=> {
        const get = async () => {
            setBrand((await brandService.getId(props.id)).data);
        }
        get()
    })
    return (
        <>
            <Form className='form-export'>
                <Form.Group className='form-group-export me-3 mb-3' >
                    <Form.Label>Tên chi nhánh</Form.Label>
                    <Form.Control type="text" defaultValue={brand.ten_cn} placeholder="Nhập tên chi nhánh" name="ten_cn" onChange={HandleChange} />
                </Form.Group>
                <Form.Group className='form-group-export me-3 mb-3' >
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control type="text" defaultValue={brand.diachi} placeholder="Địa chỉ" name="diachi" onChange={HandleChange} />
                </Form.Group>
                <Form.Group className='form-group-export me-3' >
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control type="text" defaultValue={brand.sdt} placeholder="Số điện thoại" name="sdt" onChange={HandleChange} />
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

export default FormBrand;