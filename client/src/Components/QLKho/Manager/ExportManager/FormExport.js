import className from 'classnames/bind';
import styles from '../../../../assets/style/form.scss';
import {
    faPrint,
    faBan,
    faPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Form, Col, Table, Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Typeahead } from 'react-bootstrap-typeahead';
import * as Service from "../../../../services/index";
const cx = className.bind(styles);
function FormExport() {

    let navigate = useNavigate();
    const [formValues, setFormValues] = useState({});
    const [sanpham, setSanPhams] = useState([]);
    const [sanphamhien, setSanPhamHiens] = useState([]);
    const [chinhanh, setChiNhanh] = useState([]);
    const [tenChiNhanh, setTenChiNhanh] = useState([]);
    const [khotong, setKhoTong] = useState({});
    const [typeProducts, setTypeProducts] = useState([]);
    const [phieuxuat, setPhieuXuat] = useState([]);
    const [temp, setTemp] = useState([]);
    const [type, setType] = useState("");
    const formatMoney = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' });
    const user = JSON.parse(localStorage.getItem('user'));
    var tong = 0;

    const HandleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const handleTotal = (n) => {
        tong += n;
    };

    const handleAddTemp = (e) => {
        setTemp((prev) => {
            prev.unshift({ ...e })
            return [...prev]
        });
    }
    // submit form
    const handleSubmit = async (e) => {
        temp.forEach(e => { delete e.slt })
        try {
            const data = {
                thoigian: formValues.thoigian,
                nhanvien: user,
                noi_xuat_hang: khotong,
                noi_nhan_hang: tenChiNhanh[0],
                products: temp,
                status: 1,
                total: tong
            }
            await Service.exportService.create(data)

        } catch (error) {
            console.log(error);
        }
        navigate("/qlkho/export-manager");
    };


    useEffect(() => {
        const get = async () => {
            setSanPhams((await Service.productService.get()).data)
            setTypeProducts((await Service.typeProductService.get()).data)
            setKhoTong((await Service.khoService.getId(user.noi_lam_viec._id)).data)
            setChiNhanh((await Service.brandService.get()).data)
            setPhieuXuat((await Service.exportService.getExport(user.noi_lam_viec.ten_kho)).data);
        };
        get()
    }, []);

    useEffect(() => {
        setSanPhamHiens(phieuxuat.filter(e => {
            if (type[0] !== undefined) {
                return e.export.ten_loaihh === type[0].ten_loaihh
            }

        }))
    }, [type])
    return (
        <>
            <Container className={cx('py-4')}>
                <Card className="info-import">
                    <Card.Header className="text-center fs-4 fw-bold py-3">
                        THÊM PHIẾU XUẤT
                    </Card.Header>
                    <Card.Body>
                        <div className={cx('filter')}>
                            <Row className={cx('py-4 justify-content-end')}>
                                <Col md="6" className={cx('text-end')}>
                                    <button className={cx('btn-pdf')}>
                                        <FontAwesomeIcon className={cx('icon-btn')} icon={faBan} />
                                        Xoá phiếu
                                    </button>
                                    <button className={cx('btn-save')}>
                                        <FontAwesomeIcon className={cx('icon-btn')} icon={faPrint} />
                                        Lưu và in
                                    </button>
                                </Col>
                            </Row>
                        </div>
                        <Form className={cx('form-export')}>

                            <Row className="mb-3">

                                <Form.Group className={cx('form-group-export me-3')} as={Col}>
                                    <Form.Label>Kho xuất hàng</Form.Label>
                                    <Form.Control type="text" disabled value={khotong.ten_kho} />
                                </Form.Group>
                                <Form.Group className={cx('form-group-export me-3')} as={Col} controlId="formGridPassword">
                                    <Form.Label>Chi nhánh nhận hàng</Form.Label>
                                    <Typeahead
                                        id="basic-typeahead-single"
                                        labelKey={option => `${option.ten_cn}`}
                                        onChange={setTenChiNhanh}
                                        options={chinhanh}
                                        placeholder="Chọn chi nhánh nhận hàng ..."
                                        selected={tenChiNhanh}
                                    />
                                </Form.Group>





                            </Row>
                            <Row>
                                <Form.Group className={cx('form-group-export me-3')} as={Col} controlId="formGridPassword">
                                    <Form.Label>Người lập phiếu</Form.Label>
                                    <Card className='py-2 ps-3 bg-light'>
                                        {user.ten_nhanvien}
                                    </Card>
                                </Form.Group>

                                <Form.Group className={cx('form-group-export me-3')} as={Col} controlId="formGridPassword">
                                    <Form.Label>Thời gian</Form.Label>
                                    <Form.Control type="date" placeholder="Password" name='thoigian' onChange={HandleChange} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className={cx('form-group-export me-3')} as={Col} controlId="formGridPassword">
                                    <Form.Label>Loại sản phẩm</Form.Label>
                                    <Typeahead
                                        id="basic-typeahead-single"
                                        labelKey={option => `${option.ten_loaihh}`}
                                        onChange={setType}
                                        options={typeProducts}
                                        placeholder="Chọn loại hàng hoá ..."
                                        selected={type}
                                    />
                                </Form.Group>
                            </Row>
                        </Form>
                        <Table bordered className={cx('table-export')}>
                            <thead className='table-header'>
                                <tr>
                                    <th style={{ width: '15%' }}>Tên</th>
                                    <th>ĐVT</th>
                                    <th>SL</th>
                                    <th>Đơn giá</th>
                                    <th>Loại hàng hoá</th>
                                    <th style={{ width: '12%' }}>NSX</th>
                                    <th style={{ width: '12%' }}>HSD</th>
                                    <th>Ghi chú</th>
                                    <th></th>
                                    {/* <th style={{ width: '3%' }}><div onClick={addTableRows}><FontAwesomeIcon className='fs-5 text-warning' icon={faPlus} /></div></th> */}
                                </tr>
                            </thead>
                            {sanphamhien.map((e, i) => (
                                <tbody>
                                    <td hidden>{e.export._id}</td>
                                    <td>{e.export.ten_hh}</td>
                                    <td>{e.export.dvt}</td>
                                    <td>{e.export.sl}</td>
                                    <td>{formatMoney.format(e.export.dongia)}</td>
                                    <td>{e.export.ten_loaihh}</td>
                                    <td>{e.export.nsx}</td>
                                    <td>{e.export.hsd}</td>
                                    <td>{e.ghichu}</td>
                                    <td onClick={() => (handleAddTemp(e.export))}><FontAwesomeIcon icon={faPlus} /></td>
                                </tbody>

                            ))}
                        </Table>
                        <Table bordered className={cx('table-export')}>
                            <thead className='table-header'>
                                <tr>
                                    <th>Tên</th>
                                    <th>ĐVT</th>
                                    <th style={{ width: '7%' }}>SL</th>
                                    <th>Đơn giá</th>
                                    <th>Loại hàng hoá</th>
                                    <th style={{ width: '12%' }}>NSX</th>
                                    <th style={{ width: '12%' }}>HSD</th>
                                    <th>Ghi chú</th>
                                    <th>Giá trị nhập</th>
                                    {/* <th style={{ width: '3%' }}><div onClick={addTableRows}><FontAwesomeIcon className='fs-5 text-warning' icon={faPlus} /></div></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {temp.map((item, i) => (
                                    <tr>
                                        <td>{item.ten_hh}</td>
                                        <td>{item.dvt}</td>
                                        <td ><input style={{ width: '100%' }} type="number" max={item.slt} value={item.sl} onChange={(e) => {
                                            setTemp((prev) => {
                                                prev[i].sl = parseInt(e.target.value)
                                                return [...prev]
                                            })
                                        }} /></td>
                                        <td>{formatMoney.format(item.dongia)}</td>
                                        <td>{item.ten_loaihh}</td>
                                        <td>{item.nsx}</td>
                                        <td>{item.hsd}</td>
                                        <td>{item.ghichu}</td>
                                        <td><input type="text" value={formatMoney.format(item.dongia * item.sl)} onChange={(handleTotal(item.dongia * item.sl))} name="tongGT" className="form-control" /></td>

                                    </tr>


                                )

                                )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={8} className="text-end pe-4 fw-bold">Thành tiền: </td>
                                    <td colSpan={1} className="fw-bold">{formatMoney.format(tong)}</td>
                                </tr>
                                <tr>
                                    <th colSpan="7"></th>
                                    <td colSpan="3">
                                        <button className={cx('btn-save-add')} onClick={handleSubmit}>Thêm phiếu</button>

                                    </td>
                                </tr>
                            </tfoot>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default FormExport;
