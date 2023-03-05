import styles from './Sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBox,
    faBoxesStacked,
    faFileCircleMinus,
    faFileCirclePlus,
    faFileLines,
    faGauge,
    faHouseLaptop,
    faRightFromBracket,
    faTentArrowLeftRight,
    faTruckField,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <>
            <SidebarMenu>
                <SidebarMenu.Body>
                    <SidebarMenu.Nav>
                        <SidebarMenu.Nav.Icon>
                            <FontAwesomeIcon className={cx('icon-gause')} icon={faGauge} />
                        </SidebarMenu.Nav.Icon>
                        <SidebarMenu.Nav.Title>Tổng quan</SidebarMenu.Nav.Title>
                    </SidebarMenu.Nav>
                    <SidebarMenu.Sub>
                        <SidebarMenu.Sub.Toggle>
                            <SidebarMenu.Nav.Icon>
                                <FontAwesomeIcon className={cx('icon-tent')} icon={faTentArrowLeftRight} />
                            </SidebarMenu.Nav.Icon>
                            <SidebarMenu.Nav.Title>Quản lý giao dịch</SidebarMenu.Nav.Title>
                        </SidebarMenu.Sub.Toggle>
                        <SidebarMenu.Sub.Collapse className={cx('show')}>
                            <Link to="/admin/export-manager" className='text-black text-decoration-none'>
                                <SidebarMenu.Nav>
                                    <SidebarMenu.Nav.Icon>
                                        {' '}
                                        <FontAwesomeIcon className={cx('icon-circle-minus')} icon={faFileCircleMinus} />
                                    </SidebarMenu.Nav.Icon>
                                    <SidebarMenu.Nav.Title>Phiếu xuất</SidebarMenu.Nav.Title>
                                </SidebarMenu.Nav>
                            </Link>
                            <Link to="/admin/import-manager" className='text-black text-decoration-none'>
                                <SidebarMenu.Nav>
                                    <SidebarMenu.Nav.Icon>
                                        {' '}
                                        <FontAwesomeIcon className={cx('icon-circle-plus')} icon={faFileCirclePlus} />
                                    </SidebarMenu.Nav.Icon>
                                    <SidebarMenu.Nav.Title>Phiếu nhập</SidebarMenu.Nav.Title>
                                </SidebarMenu.Nav>
                            </Link>
                            <Link to="/admin/transaction-manager" className='text-black text-decoration-none'>
                                <SidebarMenu.Nav>
                                    <SidebarMenu.Nav.Icon>
                                        {' '}
                                        <FontAwesomeIcon className={cx('icon-file-line')} icon={faFileLines} />
                                    </SidebarMenu.Nav.Icon>
                                    <SidebarMenu.Nav.Title>Tất cả</SidebarMenu.Nav.Title>
                                </SidebarMenu.Nav>
                            </Link>
                        </SidebarMenu.Sub.Collapse>
                    </SidebarMenu.Sub>
                    <Link to="/admin/product-manager" className='text-black text-decoration-none'>
                    <SidebarMenu.Nav>
                        <SidebarMenu.Nav.Icon>
                            <FontAwesomeIcon className={cx('icon-user')} icon={faBoxesStacked} />
                        </SidebarMenu.Nav.Icon>
                        <SidebarMenu.Nav.Title>Quản lý hàng hoá</SidebarMenu.Nav.Title>
                    </SidebarMenu.Nav>
                    </Link>
                    <Link to="/admin/type-product-manager" className='text-black text-decoration-none'>
                    <SidebarMenu.Nav>
                        <SidebarMenu.Nav.Icon>
                            <FontAwesomeIcon className={cx('icon-user')} icon={faBox} />
                        </SidebarMenu.Nav.Icon>
                        <SidebarMenu.Nav.Title>Quản lý loại hàng hoá</SidebarMenu.Nav.Title>
                    </SidebarMenu.Nav>
                    </Link>
                    <Link to="/admin/supplier-manager" className='text-black text-decoration-none'>
                    <SidebarMenu.Nav>
                        <SidebarMenu.Nav.Icon>
                            <FontAwesomeIcon className={cx('icon-user')} icon={faTruckField} />
                        </SidebarMenu.Nav.Icon>
                        <SidebarMenu.Nav.Title>Quản lý nhà cung cấp</SidebarMenu.Nav.Title>
                    </SidebarMenu.Nav>
                    </Link>
                    <Link to="/admin/staff-manager" className='text-black text-decoration-none'>
                    <SidebarMenu.Nav>
                        <SidebarMenu.Nav.Icon>
                            <FontAwesomeIcon className={cx('icon-user')} icon={faUsers} />
                        </SidebarMenu.Nav.Icon>
                        <SidebarMenu.Nav.Title>Quản lý nhân viên</SidebarMenu.Nav.Title>
                    </SidebarMenu.Nav>
                    </Link>
                    <Link to="/admin/kho-manager" className='text-black text-decoration-none'>
                    <SidebarMenu.Nav>
                        <SidebarMenu.Nav.Icon>
                            <FontAwesomeIcon className={cx('icon-user')} icon={faHouseLaptop} />
                        </SidebarMenu.Nav.Icon>
                        <SidebarMenu.Nav.Title>Quản lý kho</SidebarMenu.Nav.Title>
                    </SidebarMenu.Nav>
                    </Link>
                    <Link to="/admin/brand-manager" className='text-black text-decoration-none'>
                    <SidebarMenu.Nav>
                        <SidebarMenu.Nav.Icon>
                            <FontAwesomeIcon className={cx('icon-user')} icon={faHouseLaptop} />
                        </SidebarMenu.Nav.Icon>
                        <SidebarMenu.Nav.Title>Quản lý chi nhánh</SidebarMenu.Nav.Title>
                    </SidebarMenu.Nav>
                    </Link>
                    <hr></hr>
                    <Link to="/" className='text-black text-decoration-none'>
                    <SidebarMenu.Nav>
                        <SidebarMenu.Nav.Icon>
                            <FontAwesomeIcon className={cx('icon-user')} icon={faRightFromBracket} />
                        </SidebarMenu.Nav.Icon>
                        <SidebarMenu.Nav.Title>Đăng xuất</SidebarMenu.Nav.Title>
                    </SidebarMenu.Nav>
            </Link>
                </SidebarMenu.Body>
            </SidebarMenu>
        </>
    );
}

export default Sidebar;
