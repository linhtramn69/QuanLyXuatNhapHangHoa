import className from 'classnames/bind';
import styles from '../../../../assets/style/form.scss';
import {
    faPrint,
    faBan
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Form, Col, Table, Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Typeahead } from 'react-bootstrap-typeahead';
import * as Service from "../../../../services/index";
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
const cx = className.bind(styles);
function FormImport() {
    let navigate = useNavigate();
    const [formValues, setFormValues] = useState({});
    const [sanpham, setSanPhams] = useState([]);
    const [sanphamhien, setSanPhamHiens] = useState([]);
    const [typeProducts, setTypeProducts] = useState([]);
    const [khotong, setKhoTong] = useState([]);
    const [temp, setTemp] = useState([]);
    const [type, setType] = useState([]);
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
        temp.forEach(e => { delete e.slt 
        e.sl=parseInt(e.sl)})
        try {
            const data = {
                thoigian: formValues.thoigian,
                nhanvien: user,
                noi_xuat_hang: khotong,
                noi_nhan_hang: user.noi_lam_viec,
                products: temp,
                status: 0,
                total: tong
            }
            await Service.exportService.create(data)

        } catch (error) {
            console.log(error);
        }
        navigate("/qlkho/import-manager");
    };


    useEffect(() => {
        const get = async () => {
            setSanPhams((await Service.productService.get()).data)
            setTypeProducts((await Service.typeProductService.get()).data)
            setKhoTong((await Service.khoService.getId('638f0daae08e455beca71ac2')).data);
        };
        get()
    }, []);

    useEffect(() => {
        setSanPhamHiens(sanpham.filter(e => {
            if (type[0] !== undefined) {
                return e.ten_loaihh === type[0].ten_loaihh
            }
        }))
    }, [type]);
    return (
        <>
            <Container className={cx('py-4')}>
                <Card className="info-import">
                    <Card.Header className="text-center fs-4 fw-bold py-3">
                        THÊM PHIẾU NHẬP
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

                                <Form.Group className={cx('form-group-export me-3')} as={Col} controlId="formGridPassword">
                                    <Form.Label>Kho xuất hàng</Form.Label>
                                    <Card className='py-2 ps-3 bg-light'>
                                        {khotong.ten_kho}
                                    </Card>
                                </Form.Group>
                                <Form.Group className={cx('form-group-export me-3')} as={Col} controlId="formGridPassword">
                                    <Form.Label>Kho nhận hàng</Form.Label>
                                    <Card className='py-2 ps-3 bg-light'>
                                        {user.noi_lam_viec.ten_kho}
                                    </Card>
                                </Form.Group>
                                <Form.Group className={cx('form-group-export me-3')} as={Col} controlId="formGridPassword">
                                    <Form.Label>Người lập phiếu</Form.Label>
                                    <Card className='py-2 ps-3 bg-light'>
                                        {user.ten_nhanvien}
                                    </Card>
                                </Form.Group>

                                


                            </Row>
                            <Row>
                            <Form.Group className={cx('form-group-export me-3')} as={Col} controlId="formGridPassword">
                                    <Form.Label>Thời gian</Form.Label>
                                    <Form.Control type="date" placeholder="Password" name='thoigian' onChange={HandleChange} />
                                </Form.Group>
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
                                    <td hidden>{e._id}</td>
                                    <td>{e.ten_hh}</td>
                                    <td>{e.dvt}</td>
                                    <td>{e.slt}</td>
                                    <td>{formatMoney.format(e.dongia)}</td>
                                    <td>{e.ten_loaihh}</td>
                                    <td>{e.nsx}</td>
                                    <td>{e.hsd}</td>
                                    <td>{e.ghichu}</td>
                                    <td onClick={() => (handleAddTemp(e))}><FontAwesomeIcon icon={faSquarePlus} /></td>
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
                                        <td><input style={{ width: '100%' }} type="number" max={item.slt} value={item.sl} onChange={(e) => {
                                            setTemp((prev) => {
                                                prev[i].sl = e.target.value
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
                                    <th colSpan="6"></th>
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

export default FormImport;
