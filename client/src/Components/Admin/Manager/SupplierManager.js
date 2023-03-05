import { } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import { Container, Table } from 'react-bootstrap';
import styles from '../../../assets/style/formmanager.scss';
import { supplierService } from '../../../services/index';
import React, { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function SupplierManager() {
    const [nhaCungCaps, setNhaCungCaps] = useState([]);

    useEffect(() => {
        const fetchNhaCungCaps = async () => {
            setNhaCungCaps((await supplierService.get()).data);
        };
        fetchNhaCungCaps();
    }, []);

    return (
        <>
            <Container className={cx('p-4')}>
            <h2 className='text-center pb-3 pt-4 fw-bold'>THÔNG TIN NHÀ CUNG CẤP</h2>
                <div className={cx('filter')}>
                    <div className={cx('list-products')}>
                        <Table striped bordered hover>
                            <thead>
                                <tr className={cx('tr-head')}>
                                    <th>Tên</th>
                                    <th>Địa chỉ</th>
                                    <th>Số điện thoại</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nhaCungCaps.map((nhaCungCap) => (
                                    <tr>
                                        <td>{nhaCungCap.ten_ncc}</td>
                                        <td>{nhaCungCap.diachi}</td>
                                        <td>{nhaCungCap.sdt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default SupplierManager;
