import { faFilePdf, faPlus, faPrint, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Container, Table, Col, Row, Badge, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import className from 'classnames/bind';
import styles from '../../../../assets/style/formmanager.scss';
import { Link } from 'react-router-dom';
import { importService, khoService } from '../../../../services/index';
import React, { useState, useEffect } from 'react';
const cx = className.bind(styles);
function ImportManager() {

    // get all phieunhaps
    const [imports, setImports] = useState([]);
    const [kho, setKho] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchImports = async () => {
            await importService.get().then((res) => {
                setImports(res.data);
            })
            await khoService.get().then((res) => {
                setKho(res.data)
            })
        };
        fetchImports();
    }, []);

    return (
        <>
            <Container className={cx('')}>
                <h2 className='text-center pb-3 pt-4 fw-bold'>PHIẾU NHẬP</h2>
                <div className={cx('filter')}>
                    <Row className={cx('py-4')}>
                        <Col md="6" sm="12" className={cx('d-flex')}>
                            <select onChange={(e) => setFilter(e.target.value)} className={cx('option-status')}>
                                <option value="">Tất cả</option>
                                <option value={0}>Đang xử lý</option>
                                <option value={1}>Đã xử lý</option>
                                <option value={-1}>Đã huỷ</option>
                            </select>

                            <select onChange={(e) => setFilter(e.target.value)} className={cx('option-status')}>
                                <option value="">Tất cả</option>
                                {kho.map((k) => (
                                    <option value={k.ten_kho}>{k.ten_kho}</option>
                                ))}

                                ()
                            </select>
                        </Col>
                        <Col md="6" sm="12" className={cx('text-end col-btn-option')}>
                            <Link to="/admin/form-import">
                                <button className={cx('btn-excel')}>
                                    <FontAwesomeIcon className={cx('icon-btn')} icon={faPlus} />
                                    Thêm mới
                                </button>
                            </Link>
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
                </div>
                <Table bordered hover className="text-center">
                    <thead>
                        <tr className={cx('tr-head')}>
                            <th>Trạng thái</th>
                            <th>Kho nhập</th>
                            <th>Nhà cung cấp</th>
                            <th>Người lập phiếu</th>
                            <th>Thời gian</th>
                            <th>Tác vụ</th>
                        </tr>
                    </thead>

                    <tbody>
                        {imports.map((nhap) => {
                            if (filter) {
                                if (filter == nhap.status || filter == nhap.noi_nhan_hang.ten_kho) {
                                    return (
                                    <tr>
                                        {(() => {
                                            if (nhap.status === 0) {
                                                return (<td><Badge bg="warning">Chờ xử lý</Badge></td>)
                                            } else if (nhap.status === 1) {
                                                return <td><Badge bg="success">Đã xử lý</Badge></td>
                                            } else {
                                                return <td><Badge bg="danger">Đã huỷ</Badge></td>
                                            }
                                        })()}
                                        <td>{nhap.noi_nhan_hang.ten_kho}</td>
                                        <td>{nhap.noi_nhap_hang.ten_ncc}</td>
                                        <td>{nhap.nhanvien.ten_nhanvien}</td>
                                        <td>{nhap.thoigian}</td>

                                        <td>
                                            <Link to={"/admin/form-import-detail/" + nhap._id}
                                            >
                                                <FontAwesomeIcon className={cx('btn-detail')} icon={faPenToSquare} />
                                            </Link>
                                        </td>
                                    </tr>)
                                }

                            } else return (<tr>
                                {(() => {
                                    if (nhap.status === 0) {
                                        return (<td><Badge bg="warning">Chờ xử lý</Badge></td>)
                                    } else if (nhap.status === 1) {
                                        return <td><Badge bg="success">Đã xử lý</Badge></td>
                                    } else {
                                        return <td><Badge bg="danger">Đã huỷ</Badge></td>
                                    }
                                })()}
                                <td>{nhap.noi_nhan_hang.ten_kho}</td>
                                <td>{nhap.noi_nhap_hang.ten_ncc}</td>
                                <td>{nhap.nhanvien.ten_nhanvien}</td>
                                <td>{nhap.thoigian}</td>
                                <td>
                                    <Link to={"/admin/form-import-detail/" + nhap._id}
                                    >
                                        <FontAwesomeIcon className={cx('btn-detail')} icon={faPenToSquare} />
                                    </Link>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default ImportManager;
