import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import { Container, Table } from 'react-bootstrap';
import styles from '../../../../assets/style/manager.scss';
import React, { useState, useEffect } from 'react';
import { khoService } from '../../../../services/index';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function KhoManager() {
    const [khos, setKho] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        const get = async () => {
            setKho((await khoService.get()).data)
        };
        get()
    }, []);
    const handleDelete = async (id) => {
        if (window.confirm("Bạn muốn xóa ?")) {
            await khoService.delete(id);
            navigate("/admin/kho-manager");
        }
    }

    return (
        <>
            <Container className={cx('p-4')}>
            <h3 className='text-center  fw-bold'>THÔNG TIN KHO</h3>
            <Link to="/admin/add-kho">
                    <button className={cx('btn btn-success py-2 mb-3')}>
                        <FontAwesomeIcon className="me-2" icon={faPlus} />
                        Thêm mới
                    </button>
                </Link>
                    <div className={cx('list-products')}>
                        <Table bordered hover className=''>
                            <thead>
                                <tr className={cx('tr-head')}>
                                    <th>STT</th>
                                    <th>Tên</th>
                                    <th>Địa chỉ</th>
                                    <th>Số điện thoại</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                            {khos.map((kho, index) => (
                                    <tr key={kho._id} className="py-3">
                                        <td>{index+1}</td>
                                        <td>{kho.ten_kho}</td>
                                        <td>{kho.diachi}</td>
                                        <td>{kho.sdt}</td>
                                        <td >
                                            <Link to={"/admin/edit-kho/" + kho._id}>
                                                <FontAwesomeIcon className='btn-detail me-2' icon={faPenToSquare} />
                                            </Link>
                                            <div className='btn p-0 pb-1'  onClick={() => {handleDelete(kho._id)}}>
                                                <FontAwesomeIcon className='text-danger' icon={faTrash} />
                                            </div>
                                        </td>
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
