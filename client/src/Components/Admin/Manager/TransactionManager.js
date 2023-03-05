import { } from '@fortawesome/free-regular-svg-icons';
import {
    faCircleInfo,
    faFilePdf,
    faFileCsv,
    faPenToSquare,
    faTrash,
    faPrint,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import {importService, exportService} from "../../../services/index"
import { Container, Table, Badge, Col, Row } from 'react-bootstrap';

import styles from '../../../assets/style/formmanager.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function TransactionManager() {
    const [phieunhap, setPhieuNhap] = useState([]);
    const [phieuxuat, setPhieuXuat] = useState([]);

    useEffect(()=> {
        const get = async () => {
            setPhieuNhap((await importService.get()).data);
            setPhieuXuat((await exportService.get()).data);
        }
        get();
    },[])
    return (
        <>
            <Container className={cx('')}>
                <div className={cx('filter')}>
                    <Row className={cx('py-4')}>
                        <Col md="6" sm="12" className={cx('d-flex')}>
                            <select className={cx('option-status')}>
                                <option>Trạng thái</option>
                                <option value="1">Đang xử lý</option>
                                <option value="2">Đã xử lý</option>
                                <option value="3">Đã huỷ</option>
                            </select>
                            <input type="date" className={cx('option-time')} />
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
                </div>
                <Table bordered hover className='text-center'>
                    <thead>
                        <tr className={cx('tr-head')}>
                            <th>Loại phiếu</th>
                            <th>Trạng thái</th>
                            <th>Nơi xuất hàng / Nhà cung cấp</th>
                            <th>Nơi nhận hàng</th>
                            <th>Người lập phiếu</th>
                            <th>Thời gian</th>
                            <th>Tác vụ</th>
                        </tr>
                    </thead>
                    <tbody >
                        {phieunhap.map((nhap) => (
                            <tr>
                                <td className='fw-bold'>NHẬP</td>
                            {(() => {
                                if (nhap.status === 0) {
                                    return (<td><Badge bg="warning">Chờ xử lý</Badge></td>)
                                } else if (nhap.status === 1) {
                                    return <td><Badge bg="success">Đã xử lý</Badge></td>
                                } else {
                                    return <td><Badge bg="danger">Đã huỷ</Badge></td>
                                }
                            })()}
                            <td>{nhap.noi_nhap_hang.ten_ncc}</td>
                            <td>{nhap.noi_nhan_hang.ten_kho}</td>
                            <td>{nhap.nhanvien.ten_nhanvien}</td>
                            <td>{nhap.thoigian}</td>
                            <td>
                                <Link to={"/admin/form-import-detail/" + nhap._id}
                                >
                                    <FontAwesomeIcon className={cx('btn-detail')} icon={faPenToSquare} />
                                </Link>
                            </td>
                        </tr>
                        ))}
                        {phieuxuat.map((xuat)=> (
                            <tr>
                                <td className='fw-bold'>XUẤT</td>
                            {(() => {
                                if (xuat.status === 0) {
                                    return (<td><Badge bg="warning">Chờ xử lý</Badge></td>)
                                } else if (xuat.status === 1) {
                                    return <td><Badge bg="success">Đã xử lý</Badge></td>
                                } else {
                                    return <td><Badge bg="danger">Đã huỷ</Badge></td>
                                }
                            })()}
                            <td>{xuat.noi_xuat_hang.ten_kho}</td>
                            {(() => {
                                    if (xuat.noi_nhan_hang.ten_cn === undefined) {
                                        return (
                                            <td>{xuat.noi_nhan_hang.ten_doitac}</td>
                                        )

                                    }
                                    else {
                                        return (
                                            <td>{xuat.noi_nhan_hang.ten_cn}</td>
                                        )
                                    }
                                })()}
                            <td>{xuat.nhanvien.ten_nhanvien}</td>
                            <td>{xuat.thoigian}</td>
                            <td>
                                <Link to={"/admin/form-export-detail/" + xuat._id}
                                >
                                    <FontAwesomeIcon className={cx('btn-detail')} icon={faPenToSquare} />
                                </Link>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default TransactionManager;
