import { faFilePdf, faPlus, faPrint, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Container, Table, Col, Row, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import className from 'classnames/bind';
import styles from '../../../../assets/style/formmanager.scss';
import { Link } from 'react-router-dom';
import { exportService } from '../../../../services/index';
import React, { useState, useEffect } from 'react';
const cx = className.bind(styles);
function ImportManager() {

    // get all phieunhaps
    const [imports, setImports] = useState([]);
    const [filter, setFilter] = useState("");
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchImports = async () => {
            setImports((await exportService.get()).data);
        };
        fetchImports();
    }, []);
    console.log(user._id);
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


                        </Col>
                        <Col md="6" sm="12" className={cx('text-end col-btn-option')}>
                            <Link to="/qlkho/import-form">
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
                <Table bordered hover className='text-center'>
                    <thead>
                        <tr className={cx('tr-head')}>
                            <th>Trạng thái</th>
                            <th>Kho nhận</th>
                            <th>Kho xuất hàng</th>
                            <th>Người lập phiếu</th>
                            <th>Thời gian</th>
                            <th>Tác vụ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {imports.map((nhap) => {
                            if (nhap.noi_nhan_hang._id === user.noi_lam_viec._id) {
                                return (
                                    filter ? (
                                        nhap.status == filter && (
                                            (
                                                <tr>
                                                    {(() => {
                                                        if (nhap.status === 0) {
                                                            return (<td><Badge bg="warning">Đang xử lý</Badge></td>)
                                                        } else if (nhap.status === 1) {
                                                            return <td><Badge bg="warning">Đang chuyển hàng</Badge></td>

                                                        } else if (nhap.status === 2) {
                                                            return <td><Badge bg="success">Đã nhận hàng</Badge></td>
                                                        }
                                                        else {
                                                            return <td><Badge bg="danger">Hủy nhận hàng</Badge></td>
                                                        }
                                                    })()}

                                                    <td>{nhap.noi_nhan_hang.ten_kho}</td>
                                                    <td>{nhap.noi_xuat_hang.ten_kho}</td>
                                                    <td>{nhap.nhanvien.ten_nhanvien}</td>
                                                    <td>{nhap.thoigian}</td>
                                                    <td>
                                                        <Link to={"/qlkho/form-import-detail/" + nhap._id}
                                                        >
                                                            <FontAwesomeIcon className={cx('btn-detail')} icon={faPenToSquare} />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )

                                        )
                                    ) : (
                                        <tr>
                                            {(() => {
                                                if (nhap.status === 0) {
                                                    return (<td><Badge bg="warning">Đang xử lý</Badge></td>)
                                                } else if (nhap.status === 1) {
                                                    return <td><Badge bg="warning">Đang chuyển hàng</Badge></td>

                                                } else if (nhap.status === 2) {
                                                    return <td><Badge bg="success">Đã nhận hàng</Badge></td>
                                                }
                                                else if(nhap.status === -1){
                                                    return <td><Badge bg="danger">Hủy nhận hàng</Badge></td>
                                                } else {
                                                    return <td><Badge bg="danger">Hủy yêu cầu</Badge></td>
                                                }
                                            })()}
                                            <td>{nhap.noi_nhan_hang.ten_kho}</td>
                                            <td>{nhap.noi_xuat_hang.ten_kho}</td>

                                            <td>{nhap.nhanvien.ten_nhanvien}</td>
                                            <td>{nhap.thoigian}</td>
                                            <td>
                                                <Link to={"/qlkho/form-import-detail/" + nhap._id}
                                                >
                                                    <FontAwesomeIcon className={cx('btn-detail')} icon={faPenToSquare} />
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                )

                            }


                        })}


                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default ImportManager;
