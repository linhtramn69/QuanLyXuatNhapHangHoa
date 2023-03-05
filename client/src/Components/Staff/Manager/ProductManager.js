import { } from '@fortawesome/free-regular-svg-icons';
import {
    faCircleInfo,
    faFilePdf,
    faFileCsv,
    faPrint
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Container, Table, Col, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../../../assets/style/formmanager.scss';
import {productService, typeProductService, exportService} from '../../../services/index';
import React, { useState, useEffect } from 'react';
const cx = classNames.bind(styles);

function ProductManager() {
    // products
    const [products, setProducts] = useState([]);
    const [phieuxuat, setPhieuXuat] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        const fetchProducts = async () => {
            setProducts((await productService.get()).data);
            setPhieuXuat((await exportService.getExportCN(user.noi_lam_viec.ten_cn)).data);
        };
        fetchProducts();
    }, []);

    // type products
    const [typeProducts, setTypeProducts] = useState([]);
    useEffect(() => {
        const fetchTypeProducts = async () => {
            const { data } = await typeProductService.get();
            setTypeProducts(data);
        };
        fetchTypeProducts();
    }, []);

    return (
        <>
            <Container className={cx('p-4')}>
            <h2 className='text-center pt-2 fw-bold'>THÔNG TIN HÀNG HOÁ</h2>
                <div className={cx('filter')}>
                    <Row className={cx('py-4')}>
                        <Col md="6" sm="12" className={cx('d-flex')}>
                            <select style={{ width: '74%' }} className={cx('option-status')}>
                                {typeProducts.map((type) => (
                                    <option value={type._id}>{type.ten_loaihh}</option>
                                ))}
                            </select>
                        </Col>
                        <Col md="6" sm="12" className={cx('text-end')}>
                            <button className={cx('btn-excel')}>
                                <FontAwesomeIcon className={cx('icon-btn')} icon={faFileCsv} />
                                Xuất Excel
                            </button>
                            <button className={cx('btn-pdf')}>
                                <FontAwesomeIcon className={cx('icon-btn')} icon={faFilePdf} />
                                Xuất PDF
                            </button>
                            <button className={cx('btn-save')}>
                                <FontAwesomeIcon className={cx('icon-btn')} icon={faPrint} />
                                Lưu và in
                            </button>
                        </Col>
                    </Row>
                    <div className={cx('list-products')}>
                        <Table bordered hover>
                            <thead>
                                <tr className={cx('tr-head')}>
                                    <th>Tên</th>
                                    <th>Loại</th>
                                    <th>Đơn giá</th>
                                    <th>ĐVT</th>
                                    <th>SLT</th>
                                    <th>HSD</th>
                                    <th>Nhà cung cấp</th>
                                    <th>Ghi chú</th>
                                    <th>Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {phieuxuat&&phieuxuat.map((product, index) => (
                                    <tr>
                                        <td>{product.export.ten_hh}</td>
                                        <td>{product.export.ten_loaihh}</td>
                                        <td>
                                            {new Intl.NumberFormat("it-IT", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(product.export.dongia)}
                                        </td>
                                        <td>{product.export.dvt}</td>
                                        <td>{product.export.sl}</td>
                                        <td>{product.export.hsd}</td>
                                        <td>{product.export.phieu_nhap.ten_ncc}</td>
                                        <td>{product.export.ghichu}</td>
                                        <td>
                                                <FontAwesomeIcon className={cx('icon-detail text-primary')} icon={faCircleInfo} />
                                           
                                        </td>
                                    </tr>
                                )




                                )}

                               
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default ProductManager;
