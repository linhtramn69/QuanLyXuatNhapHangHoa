import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Card, Container, Form, Row, Col } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { brandService, staffService, khoService } from '../../../../services/index';
import { useNavigate } from "react-router-dom";

function AddStaff() {
    const [chinhanh, setChiNhanh] = useState([]);
    const [cn, setCN] = useState([]);
    // const [k, setK] = useState([]);
    const [formValues, setFormValues] = useState([]);
    const [kho, setKho] = useState([]);
    let navigate = useNavigate();
    const [option, setOption] = useState(1);


    const HandleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const handleSubmit = async (e) => {
        try {
            var r = 2;
            if(cn[0].ten_kho === undefined){
                r = 1;
            }
            
            if (window.confirm("Bạn muốn thêm nhân viên này ?")) {
                const data = {
                    ten_nhanvien: formValues.ten_nhanvien,
                    ngaysinh: formValues.ngaysinh,
                    sdt: formValues.sdt,
                    diachi: formValues.diachi,
                    noi_lam_viec: cn[0],
                    account: {
                        email: formValues.email,
                        password: makeid(6),
                        role: r
                    }
                }
                await staffService.create(data);
                navigate("/admin/staff-manager");
            }



        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        const get = async () => {
            setChiNhanh((await brandService.get()).data);
            setKho((await khoService.get()).data);
        }
        get()
    })
    
    return (
        <>
            <Container className="p-5">
                <Card>
                    <Card.Header className="fs-4 fw-bold text-center py-3">
                        Thêm nhân viên
                    </Card.Header>
                    <Card.Body className="p-4">
                        <Form className='form-export'>

                            <Row className="mb-3">

                                <Form.Group className='form-group-export me-3' as={Col}>
                                    <Form.Label>Họ tên</Form.Label>
                                    <Form.Control type="text" placeholder="Họ tên" name="ten_nhanvien" onChange={HandleChange} />
                                </Form.Group>

                                <Form.Group className='form-group-export me-3' as={Col}>
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control type="text" placeholder="Số điện thoại" name="sdt" onChange={HandleChange} />
                                </Form.Group>

                                <Form.Group className='form-group-export me-3' as={Col}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email" name="email" onChange={HandleChange} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">

                                <Form.Group className='form-group-export me-3' as={Col}>
                                    <Form.Label>Ngày sinh</Form.Label>
                                    <Form.Control type="text" placeholder="Ngày sinh" name="ngaysinh" onChange={HandleChange} />
                                </Form.Group>

                                <Form.Group className='form-group-export me-3' as={Col}>
                                    <Form.Label>Địa chỉ</Form.Label>
                                    <Form.Control type="text" placeholder="Địa chỉ" name="diachi" onChange={HandleChange} />
                                </Form.Group>



                            </Row>
                            <Row>
                                <Form.Group className='form-group-export me-3' as={Col} controlId="formGridPassword">
                                    <Form.Label>Vị trí</Form.Label>
                                    <div>
                                        <input type="radio" defaultChecked onClick={() => (setOption(1))} name="option" /> Nhân viên chi nhánh
                                        <input type="radio" className='ms-3' onClick={() => (setOption(2))} name="option" /> Quản lý kho tỉnh
                                    </div>
                                </Form.Group>
                                {(() => {
                                    if (option === 1) {
                                        return (
                                            <Form.Group className='form-group-export me-3' as={Col}>
                                                <Form.Label className="d-block">Chi nhánh</Form.Label>
                                                <Typeahead
                                                    id="basic-typeahead-single"
                                                    labelKey={option => `${option.ten_cn}`}
                                                    onChange={setCN}
                                                    options={chinhanh}
                                                    placeholder="Chọn chi nhánh ..."
                                                    selected={cn}
                                                />
                                            </Form.Group>
                                        )

                                    }
                                    else {
                                        return (
                                            <Form.Group className='form-group-export me-3' as={Col}>
                                            <Form.Label className="d-block">Kho</Form.Label>
                                            <Typeahead
                                                id="basic-typeahead-single"
                                                labelKey={option => `${option.ten_kho}`}
                                                onChange={setCN}
                                                options={kho}
                                                placeholder="Chọn kho ..."
                                                selected={cn}
                                            />
                                        </Form.Group>
                                        )
                                    }
                                })()}
                            </Row>
                        </Form>
                        <button className="btn btn-success py-2 ms-auto d-block mt-4" onClick={handleSubmit}>
                            <FontAwesomeIcon className='icon-btn' icon={faPlus} /> Thêm nhân viên
                        </button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default AddStaff;