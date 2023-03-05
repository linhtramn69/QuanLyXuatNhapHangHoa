import classNames from 'classnames/bind';
import { Container, Table } from 'react-bootstrap';
import styles from '../../../assets/style/manager.scss';
import React, { useState, useEffect } from 'react';
import { brandService } from '../../../services/index';

const cx = classNames.bind(styles);

function BrandManager() {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const get = async () => {
            setBrands((await brandService.get()).data)
        };
        get()
    }, []);

    return (
        <>
            <Container className={cx('p-4')}>
            <h3 className='text-center pb-3 fw-bold'>THÔNG TIN CHI NHÁNH</h3>
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
                            {brands.map((brand, index) => (
                                    <tr key={brand._id} className="py-3">
                                        <td>{index+1}</td>
                                        <td>{brand.ten_cn}</td>
                                        <td>{brand.diachi}</td>
                                        <td>{brand.sdt}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
            </Container>
        </>
    );
}

export default BrandManager;
