import classNames from 'classnames/bind';
import { Container, Table } from 'react-bootstrap';
import styles from '../../../assets/style/manager.scss';
import React, { useState, useEffect } from 'react';
import { khoService } from '../../../services/index';

const cx = classNames.bind(styles);

function KhoManager() {
    const [khos, setKho] = useState([]);

    useEffect(() => {
        const get = async () => {
            setKho((await khoService.get()).data)
        };
        get()
    }, []);
    return (
        <>
            <Container className={cx('p-4')}>
           
            <h3 className='text-center pb-3 fw-bold'>THÔNG TIN KHO</h3>
                    <div className={cx('list-products')}>
                        <Table bordered hover className=''>
                            <thead>
                                <tr className={cx('tr-head')}>
                                    <th>STT</th>
                                    <th>Tên</th>
                                    <th>Địa chỉ</th>
                                    <th>Số điện thoại</th>
                                </tr>
                            </thead>
                            <tbody>
                            {khos.map((kho, index) => (
                                    <tr key={kho._id} className="py-3">
                                        <td>{index+1}</td>
                                        <td>{kho.ten_kho}</td>
                                        <td>{kho.diachi}</td>
                                        <td>{kho.sdt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
            </Container>
        </>
    );
}

export default KhoManager;
