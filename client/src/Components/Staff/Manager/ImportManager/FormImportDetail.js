import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { exportService, productService } from "../../../../services/index";
import  '../../../../assets/style/detail.scss';
import { faBacon, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FormImportDetail() {
    const params = useParams();
    const navigate = useNavigate();
    const formatMoney = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' });
    const [phieunhap, setPhieuNhap] = useState({
        noi_nhan_hang: {
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
                slt: 0,
                ghichu: "",
                ten_loaihh: "",
                nsx: "",
                hsd: ""
            }
        ],
        nhanvien: {
            ten_nhanvien: ""
        }
    });
    const handleStatus = async (n) => {
        let mess;
        if (n === 2) {
            mess = "đã nhận được hàng";
        } else {
            mess = "không nhận được hàng"
        }
        if(window.confirm("Bạn muốn " + mess + " phiếu") ){
            if(n === 2){

                for(var i = 0; i< phieunhap.products.length; i++){
                    const e = (await productService.getId(phieunhap.products[i]._id)).data;
                    e.slt = e.slt - phieunhap.products[i].sl;
                    const px = {
                        id_phieu_xuat: phieunhap._id,
                        noi_xuat_den: phieunhap.noi_nhan_hang,
                        nhanvien: phieunhap.nhanvien
                    };
                    e.phieu_xuat.push({...px})
                    await productService.update(phieunhap.products[i]._id, e);
                }
            }
            
        }
        phieunhap.status = n;
        await exportService.update(phieunhap._id, phieunhap);
        navigate("/staff/import-manager");
    }
    useEffect(() => {
        const get = async () => {
            await exportService.getId(params.id).then((res) => {
                setPhieuNhap(res.data);
            })
        }
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
                                <p>No: <span className="text-danger fw-bold">{phieunhap._id}</span></p>

                            </Col>
                            <Col>
                                <p> Người lập phiếu: <span>{phieunhap.nhanvien.ten_nhanvien}</span></p>
                            </Col>
                            <Col>
                                <p>Thời gian nhập hàng: <span>{phieunhap.thoigian}</span></p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={5}>
                                <p>Chi nhánh: <span>{phieunhap.noi_nhan_hang.ten_cn}</span></p>
                            </Col>
                            <Col>
                                <p>Số điện thoại: <span>{phieunhap.noi_nhan_hang.sdt}</span></p>
                            </Col>
                            <Col>
                                <p>Địa chỉ: <span>{phieunhap.noi_nhan_hang.diachi}</span></p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={5}>
                                <p>Kho nhập hàng: <span>{phieunhap.noi_xuat_hang.ten_kho}</span></p>
                            </Col>
                            <Col>
                                <p> Số điện thoại: <span>{phieunhap.noi_xuat_hang.sdt}</span></p>
                            </Col>
                            <Col>
                                <p>Địa chỉ: <span>{phieunhap.noi_xuat_hang.diachi}</span></p>
                            </Col>
                        </Row>
                        <Row className="me-3 mt-3">
                            <Table bordered className="text-center">
                                <thead>
                                    <tr >
                                    <th>STT </th>
                                        <th>Tên hàng hoá</th>
                                        <th>Đơn vị tính</th>
                                        <th>Số lượng</th>
                                        <th>Đơn giá</th>
                                        <th>Loại hàng hoá</th>
                                        <th>NSX</th>
                                        <th>HSD</th>
                                        <th>Giá trị nhập</th>
                                        <th>Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {phieunhap.products.map((product, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{product.ten_hh}</td>
                                            <td>{product.dvt}</td>
                                            <td>{product.sl}</td>
                                            <td>{formatMoney.format(product.dongia)}</td>
                                            <td>{product.ten_loaihh}</td>
                                            <td>{product.nsx}</td>
                                            <td>{product.hsd}</td>
                                            <td>{formatMoney.format(product.dongia * product.sl)}</td>
                                            <td>{product.ghichu}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={8} className="text-end pe-4 fw-bold">Thành tiền: </td>
                                        <td colSpan={2} className="fw-bold">{formatMoney.format(phieunhap.total)}</td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </Row>
                      {(() => {
                            if (phieunhap.status === 1) {
                                return (
                                    <div className="d-flex justify-content-end">
                                        <button className='btn-pdf' onClick={() => handleStatus(-1)}>
                                            <FontAwesomeIcon className='icon-btn me-2' icon={faBacon} />
                                            Không nhận được hàng
                                        </button>
                                        <button className='btn-save' onClick={() => handleStatus(2)}>
                                            <FontAwesomeIcon className='icon-btn me-2' icon={faCircleCheck} />
                                            Đã nhận hàng
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

export default FormImportDetail;