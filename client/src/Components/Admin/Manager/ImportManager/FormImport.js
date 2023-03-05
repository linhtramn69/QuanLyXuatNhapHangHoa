import className from 'classnames/bind';
import styles from '../../../../assets/style/form.scss';
import {
    faPrint,
    faBan,
    faCircleMinus,
    faPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Form, Col, Table, Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Typeahead } from 'react-bootstrap-typeahead';
import * as Service from "../../../../services/index";

const cx = className.bind(styles);
function FormImport() {

    let navigate = useNavigate();
    const [formValues, setFormValues] = useState({});
    const [ncc, setNccs] = useState([]);
    const [tenNCC, setTenNCC] = useState([]);
    const [tenKho, setTenKho] = useState([]);
    const [typeProducts, setTypeProducts] = useState([]);
    const [khotong, setKhoTong] = useState({});
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

    // them row moi
    const [rowsData, setRowsData] = useState([]);
    const addTableRows = () => {
        const rowsInput = {
            ten_hh: '',
            dvt: '',
            sl: '',
            dongia: '',
            ten_loaihh: '',
            ghichu: ''
        }
        setRowsData([...rowsData, rowsInput])
    }
    const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    }
    const handleChangeAddRow = (index, evnt) => {
        const { name, value } = evnt.target;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = value;
        setRowsData(rowsInput);
    }

    // submit form
    const handleSubmit = async (e) => {
        try {
            const data = {
                thoigian: formValues.thoigian,
                nhanvien: user,
                noi_nhap_hang: tenNCC[0],
                noi_nhan_hang: khotong,
                products: rowsData,
                status: 0,
                total: tong
            }
            await Service.importService.create(data)
                .then(async function (response) {
                    if (response) {
                        for (var i = 0; i < rowsData.length; i++) {
                            const product = {
                                ten_hh: rowsData[i].ten_hh,
                                dvt: rowsData[i].dvt,
                                dongia: rowsData[i].dongia,
                                slt: rowsData[i].sl,
                                nsx: rowsData[i].nsx,
                                hsd: rowsData[i].hsd,
                                ghichu: rowsData[i].ghichu,
                                ten_loaihh: rowsData[i].ten_loaihh,
                                phieu_nhap: {
                                    id_phieu_nhap: response.data,
                                    thoi_gian_nhap: formValues.thoigian,
                                    ten_ncc: data.noi_nhap_hang.ten_ncc,
                                    ten_kho: data.noi_nhan_hang.ten_kho
                                },
                                phieu_xuat: []
                            };
                            await Service.productService.create(product)
                                .then(function (res) {
                                    console.log(res);
                                });
                        }
                    }
                });

        } catch (error) {
            console.log(error);
        }
        navigate("/admin/import-manager");
    };


    useEffect(() => {
        const get = async () => {
            await Service.supplierService.get().then((res) => {
                setNccs(res.data)
            });
            await Service.typeProductService.get().then((res) => {
                setTypeProducts(res.data)
            });
            setKhoTong((await Service.khoService.getId('638f0daae08e455beca71ac2')).data)
        };

        get()
    }, []);

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

                                <Form.Group className={cx('form-group-export me-3')} as={Col}>
                                    <Form.Label>Nhà cung cấp</Form.Label>
                                    <Typeahead
                                        id="basic-typeahead-single"
                                        labelKey={option => `${option.ten_ncc}`}
                                        onChange={setTenNCC}
                                        options={ncc}
                                        placeholder="Chọn Nhà cung cấp ..."
                                        selected={tenNCC}
                                    />
                                </Form.Group>

                                <Form.Group className={cx('form-group-export me-3')} as={Col} controlId="formGridPassword">
                                    <Form.Label>Kho nhận hàng</Form.Label>
                                    <Form.Control type="text"  value={khotong.ten_kho} disabled />
                                </Form.Group>
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
                        </Form>

                        <Table bordered className={cx('table-export')}>
                            <thead className='table-header'>
                                <tr>
                                    <th style={{ width: '10%' }}>Tên</th>
                                    <th style={{ width: '7%' }}>ĐVT</th>
                                    <th style={{ width: '7%' }}>SL</th>
                                    <th>Đơn giá</th>
                                    <th>Loại</th>
                                    <th style={{ width: '12%' }}>NSX</th>
                                    <th style={{ width: '12%' }}>HSD</th>
                                    <th style={{ width: '8%' }}>Ghi chú</th>
                                    <th>Giá trị nhập</th>
                                    <th style={{ width: '3%' }}><div onClick={addTableRows}><FontAwesomeIcon className='fs-5' icon={faPlus} /></div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    rowsData.map((data, index) => {
                                        const { ten_hh, dvt, sl, dongia, ten_loaihh, nsx, hsd, ghichu } = data;
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <input type="text" value={ten_hh} onChange={(evnt) => (handleChangeAddRow(index, evnt))} name="ten_hh" className="form-control" />
                                                </td>
                                                <td><input type="text" value={dvt} onChange={(evnt) => (handleChangeAddRow(index, evnt))} name="dvt" className="form-control" /> </td>
                                                <td><input type="text" value={sl} onChange={(evnt) => (handleChangeAddRow(index, evnt))} name="sl" className="form-control" /> </td>
                                                <td><input type="text" value={dongia} onChange={(evnt) => (handleChangeAddRow(index, evnt))} name="dongia" className="form-control" /> </td>
                                                <td>
                                                    <select value={ten_loaihh} onChange={(evnt) => (handleChangeAddRow(index, evnt))} className={cx('form-control')} name="ten_loaihh">
                                                        {typeProducts.map((type) => (
                                                            <option value={type.ten_loaihh}>{type.ten_loaihh}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td><input type="text" value={nsx} onChange={(evnt) => (handleChangeAddRow(index, evnt))} name="nsx" className="form-control" /> </td>
                                                <td><input type="text" value={hsd} onChange={(evnt) => (handleChangeAddRow(index, evnt))} name="hsd" className="form-control" /> </td>
                                                <td><input type="text" value={ghichu} onChange={(evnt) => (handleChangeAddRow(index, evnt))} name="ghichu" className="form-control" /> </td>
                                                <td><input type="text" value={formatMoney.format(dongia * sl)} onChange={(handleTotal(dongia * sl))} name="tongGT" className="form-control" /> </td>
                                                <td><div onClick={() => (deleteTableRows(index))}><FontAwesomeIcon className='fs-4 text-danger' icon={faCircleMinus} /></div></td>

                                            </tr>
                                        )
                                    })

                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={8} className="text-end pe-4 fw-bold">Thành tiền: </td>
                                    <td colSpan={2} className="fw-bold">{formatMoney.format(tong)}</td>
                                </tr>
                                <tr>
                                    <th colSpan="6"></th>
                                    <td colSpan="4">
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
