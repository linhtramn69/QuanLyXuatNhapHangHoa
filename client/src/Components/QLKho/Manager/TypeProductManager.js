import { } from '@fortawesome/free-regular-svg-icons';
import className from 'classnames/bind';
import { Container, Table } from 'react-bootstrap';
import axios from "axios";
import React, {useState, useEffect} from 'react';
import styles from '../../../assets/style/formmanager.scss';

const cx = className.bind(styles);
function TypeProductManager() {

    const [typeProducts, setTypeProducts] = useState([]);

    useEffect(() => {
        const fetchTypeProducts = async () => {
            const { data } = await axios.get('http://localhost:3001/api/type-products');
            setTypeProducts(data);
        };
        fetchTypeProducts();
    }, []);

    return (
        <>
            <Container className={cx('p-4')}>
                <div className={cx('filter')}>
                    <div className={cx('list-products')}>
                        <Table striped bordered hover>
                            <thead>
                                <tr className={cx('tr-head')}>
                                    <th>ID</th>
                                    <th>Tên</th>
                                </tr>
                            </thead>
                            <tbody>
                                {typeProducts.map((type)=>(
                                    <tr>
                                    <td>{type._id}</td>
                                    <td>{type.ten_loaihh}</td>
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
