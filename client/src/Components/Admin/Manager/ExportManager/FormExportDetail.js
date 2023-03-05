import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { exportService, productService } from "../../../../services/index";
import styles from '../../../../assets/style/detail.scss';
import className from 'classnames/bind';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

const cx = className.bind(styles);
function FormExportDetail() {
    const params = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [formexport, setFormExport] = useState({
        noi_nhan_hang: {
            ten_doitac: "",
            ten_cn: "",
            diachi: "",
            sdt: ""
        },
        noi_xuat_hang: {
            ten_kho: "",
            diachi: "",
            sdt: ""
        },
        products: [
            {
                ten_hh: "",
                dvt: "",
                dongia: 0,
                sl: 0,
                ghichu: "",
                ten_loaihh: "",
            }
        ],
        nhanvien: {
            ten_nhanvien: "",
        }
    });
    const formatMoney = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' });

    const handleStatus = async (n) => {
        let mess;
        if (n === 1) {
            mess = "xác nhận";
        } else {
            mess = "huỷ"
        }


        if (window.confirm("Bạn muốn " + mess + " phiếu")) {
            formexport.status = n;
        }
        await exportService.update(formexport._id, formexport);
        navigate("/admin/export-manager");
    }

    useEffect(() => {
        const get = async () => {
            setFormExport((await exportService.getId(params.id)).data)
        };
        get();
    })
    return (
        <>
            <Container className="py-4">
                <Card className="info-import">
                    <Card.Header className="text-center fs-5 fw-bold py-3">
                        THÔNG TIN CHI TIẾT
                    </Card.Header>
                    <Card.Body className="ms-3">
                        <Row>
                            <Col md={5}>
                                <p>No: <span className="text-danger fw-bold">{formexport._id}</span></p>

                            </Col>
                            <Col>
                                <p> Người lập phiếu: <span>{formexport.nhanvien.ten_nhanvien}</span></p>
                            </Col>
                            <Col>
                                <p>Thời gian nhập hàng: <span>{formexport.thoigian}</span></p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={5}>
                                <p> Kho xuất: <span>{formexport.noi_xuat_hang.ten_kho}</span></p>
                            </Col>
                            <Col>
                                <p>Số điện thoại: <span>{formexport.noi_xuat_hang.sdt}</span></p>
                            </Col>
                            <Col>
                                <p>Địa chỉ: <span>{formexport.noi_xuat_hang.diachi}</span></p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={5}>
                                {(() => {
                                    if (formexport.noi_nhan_hang.ten_cn === undefined) {
                                        return (
                                            <p>Đối tác: <span>{formexport.noi_nhan_hang.ten_doitac}</span></p>
                                        )
                                    }
                                    else {
                                        return (<p>Chi nhánh: <span>{formexport.noi_nhan_hang.ten_cn}</span></p>)
                                    }
                                })()}

                            </Col>
                            <Col>
                                <p> Số điện thoại: <span>{formexport.noi_nhan_hang.sdt}</span></p>
                            </Col>
                            <Col>
                                <p>Địa chỉ: <span>{formexport.noi_nhan_hang.diachi}</span></p>
                            </Col>
                        </Row>
                        <Row className="me-3 mt-3">
                            <Table bordered className="text-center">
                                <thead >
                                    <tr>
                                        <th>STT </th>
                                        <th>Tên hàng hoá</th>
                                        <th>Đơn vị tính</th>
                                        <th>Số lượng</th>
                                        <th>Đơn giá</th>
                                        <th>Loại hàng hoá</th>
                                        <th>Giá trị nhập</th>
                                        <th>Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formexport.products.map((product, index) => (
                                        <tr key={product._id}>
                                            <td>{index + 1}</td>
                                            <td>{product.ten_hh}</td>
                                            <td>{product.dvt}</td>
                                            <td>{product.sl}</td>
                                            <td>{formatMoney.format(product.dongia)}</td>
                                            <td>{product.ten_loaihh}</td>
                                            <td>{formatMoney.format(product.dongia * product.sl)}</td>
                                            <td>{product.ghichu}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={6} className="text-end pe-4 fw-bold">Thành tiền: </td>
                                        <td colSpan={2} className="fw-bold">{formatMoney.format(formexport.total)}</td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </Row>
                        {(() => {
                            if (formexport.status === 0 && formexport.nhanvien._id !== user._id) {
                                return (
                                    <div className="d-flex justify-content-end">
                                        <button className={cx('btn-pdf')} onClick={() => handleStatus(-2)}>
                                            <FontAwesomeIcon className={cx('icon-btn me-2')} icon={faBan} />
                                            Huỷ phiếu
                                        </button>
                                        <button className={cx('btn-save')} onClick={() => handleStatus(1)}>
                                            <FontAwesomeIcon className={cx('icon-btn me-2')} icon={faCircleCheck} />
                                            Xác nhận
                                        </button>
                                    </div>
                                )
                            }
                        })()}

                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default FormExportDetail;