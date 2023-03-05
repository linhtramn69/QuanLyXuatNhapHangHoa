import { } from '@fortawesome/free-regular-svg-icons';
import {
    faCircleInfo,
    faFilePdf,
    faFileCsv,
    faPrint
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Container, Table, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../../../assets/style/formmanager.scss';
import { productService, typeProductService, brandService, khoService } from '../../../services/index';
import React, { useState, useEffect } from 'react';
const cx = classNames.bind(styles);

function ProductManager() {
    const [products, setProducts] = useState([]);
    const [typeProducts, setTypeProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [kho, setKho] = useState([]);
    const [filter, setFilter] = useState('');
    useEffect(() => {
        const get = async () => {
            setProducts((await productService.get()).data);
            setTypeProducts((await typeProductService.get()).data);
            setBrands((await brandService.get()).data);
            setKho((await khoService.get()).data);
        };
        get();

    }, []);
    console.log();
    return (
        <>
            <Container className={cx('p-4')}>
            <h2 className='text-center pb-2 pt-2 fw-bold'>THÔNG TIN HÀNG HOÁ</h2>
                <div className={cx('filter')}>
                    <Row className={cx('py-4')}>
                        <Col md="2" sm="12" className={cx('d-flex')}>
                            <select onChange={(e) => setFilter(e.target.value)} style={{ width: '100%' }} className={cx('option-status')}>
                                <option value=''>Tất cả</option>
                                {typeProducts.map((type) => (

                                    <option value={type.ten_loaihh}>{type.ten_loaihh}</option>
                                ))}
                            </select>
                        </Col>
                        <Col md="2" sm="12" className={cx('d-flex')}>
                            <select style={{ width: '100%' }} className={cx('option-status')}>
                                <option value=''>Tất cả</option>
                                {brands.map((brand) => (
                                    <option value={brand.ten_cn}>{brand.ten_cn}</option>
                                ))}
                            </select>
                        </Col>
                        <Col md="2" sm="12" className={cx('d-flex')}>
                            <select onChange={(e) => setFilter(e.target.value)}  style={{ width: '100%' }} className={cx('option-status')}>
                                <option value=''>Tất cả</option>
                                {kho.map((k) => (
                                    <option value={k.ten_kho}>{k.ten_kho}</option>
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
                        <Table striped bordered hover>
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
                                {products.map((product) => {
                                    if(filter){
                                        if(filter === product.ten_loaihh || filter === product.phieu_nhap.ten_kho){
                                            return (
                                                <tr>
                                                <td>{product.ten_hh}</td>
                                                <td>{product.ten_loaihh}</td>
                                                <td>
                                                    {new Intl.NumberFormat("it-IT", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }).format(product.dongia)}
                                                </td>
                                                <td>{product.dvt}</td>
                                                <td>{product.slt}</td>
                                                <td>{product.hsd}</td>
                                                <td>{product.phieu_nhap.ten_ncc}</td>
                                                <td>{product.ghichu}</td>
                                                <td>
                                                    <Link to={"/admin/product-detail/" + product._id} className={cx('icon-detail text-primary')}>
                                                        <FontAwesomeIcon icon={faCircleInfo} />
                                                    </Link>
                                                </td>
                                            </tr>
                                            )
                                        }
                                    } else {
                                        return (
                                            <tr>
                                            <td>{product.ten_hh}</td>
                                            <td>{product.ten_loaihh}</td>
                                            <td>
                                                {new Intl.NumberFormat("it-IT", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format(product.dongia)}
                                            </td>
                                            <td>{product.dvt}</td>
                                            <td>{product.slt}</td>
                                            <td>{product.hsd}</td>
                                            <td>{product.phieu_nhap.ten_ncc}</td>
                                            <td>{product.ghichu}</td>
                                            <td>
                                                <Link to={"/admin/product-detail/" + product._id} className={cx('icon-detail text-primary')}>
                                                    <FontAwesomeIcon icon={faCircleInfo} />
                                                </Link>
                                            </td>
                                        </tr>
                                        )
                                    }

                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default ProductManager;
