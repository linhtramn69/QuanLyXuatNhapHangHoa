import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import className from 'classnames/bind';
import { Container, Table } from 'react-bootstrap';
import { typeProductService } from '../../../../services/index';
import React, { useState, useEffect } from 'react';
import styles from '../../../../assets/style/formmanager.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = className.bind(styles);
function TypeProductManager() {

    let navigate = useNavigate();
    const [typeProducts, setTypeProducts] = useState([]);
    const handleDelete = async (id) => {
        if (window.confirm("Bạn muốn xóa ?")) {
            await typeProductService.delete(id);
            navigate("/admin/type-product-manager");
        }
        
    }
    useEffect(() => {
        const fetchTypeProducts = async () => {
            setTypeProducts((await typeProductService.get()).data);
        };
        fetchTypeProducts();
    }, []);

    return (
        <>
            <Container className={cx('p-4')}>
                <h2 className='text-center pb-2 pt-2 fw-bold'>THÔNG TIN LOẠI HÀNG HOÁ</h2>
                <Link to="/admin/add-type">
                    <button className={cx('btn btn-success py-2 mb-3')}>
                        <FontAwesomeIcon className="me-2" icon={faPlus} />
                        Thêm mới
                    </button>
                </Link>
                <div className={cx('filter')}>
                    <div className={cx('list-products')}>
                        <Table bordered hover>
                            <thead>
                                <tr className={cx('tr-head')}>
                                    <th>ID</th>
                                    <th>Tên</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {typeProducts.map((type) => (
                                    <tr>
                                        <td>{type._id}</td>
                                        <td>{type.ten_loaihh}</td>
                                        <td className=''>
                                            <Link to={"/admin/edit-type/" + type._id}>
                                                <FontAwesomeIcon className='btn-detail me-2' icon={faPenToSquare} />
                                            </Link>
                                            <div className='btn p-0 pb-1'  onClick={() => {handleDelete(type._id)}}>
                                                <FontAwesomeIcon className='text-danger' icon={faTrash} />
                                            </div>
                                        </td>
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

export default TypeProductManager;
