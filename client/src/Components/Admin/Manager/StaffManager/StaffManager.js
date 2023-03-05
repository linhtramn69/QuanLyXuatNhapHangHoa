import { } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import { Col, Container, Row, Table } from 'react-bootstrap';
import styles from '../../../../assets/style/formmanager.scss';
import React, { useState, useEffect } from 'react';
import { staffService } from "../../../../services/index";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function StaffManager() {
    const [staffs, setStaffs] = useState([
        {
            noi_lam_viec:{
                ten_cn: "",
                ten_kho: ""
            },
            account:{
                role: ""
            }
        }
    ]);

    useEffect(() => {
        const get = async () => {
            setStaffs((await staffService.get()).data)
        }
        get();
    }, []);

    return (
        <>
            <Container className={cx('p-4')}>
                <h3 className='text-center pt-3 fw-bold'>THÔNG TIN NHÂN VIÊN</h3>
                <Link to="/admin/create-staff">
                    <button className={cx('btn btn-success py-2 mb-3')}>
                        <FontAwesomeIcon className="me-2" icon={faPlus} />
                        Thêm mới
                    </button>
                </Link>
                <div className={cx('list-products')}>
                    <Table striped bordered hover>
                        <thead>
                            <tr className={cx('tr-head')}>
                                <th>STT</th>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>Ngày sinh</th>
                                <th>SĐT</th>
                                <th style={{ width: '14%' }}>Địa chỉ</th>
                                <th>Nơi làm việc</th>
                            </tr>
                        </thead>
                        {staffs.map((staff, index) => (
                            <tbody >
                                {(staff.account.role !== 0 &&
                                    <tr>
                                        <td>{index}</td>
                                        <td>{staff.ten_nhanvien}</td>
                                        <td>{staff._id}</td>
                                        <td>{staff.ngaysinh}</td>
                                        <td>{staff.sdt}</td>
                                        <td>{staff.diachi}</td>
                                        {(()=> {
                                            if(staff.noi_lam_viec.ten_cn === undefined){
                                                return (
                                                    <td>{staff.noi_lam_viec.ten_kho}</td>
                                                )
                                            }
                                            else {
                                                return (
                                                    <td>{staff.noi_lam_viec.ten_cn}</td>
                                                )
                                            }
                                        })()}
                                        
                                    </tr>
                                )}
                            </tbody>))}
                    </Table>
                </div>
            </Container>
        </>
    );
}

export default StaffManager;
