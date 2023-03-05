import styles from './Sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBox,
    faBoxesStacked,
    faFileCircleMinus,
    faFileCirclePlus,
    faFileLines,
    faGauge,
    faRightFromBracket,
    faTentArrowLeftRight,
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
                        <SidebarMenu.Nav>
                            <SidebarMenu.Nav.Icon>
                                <FontAwesomeIcon className={cx('icon-gause')} icon={faGauge} />
                            </SidebarMenu.Nav.Icon>
                            <SidebarMenu.Nav.Title>Tổng quan</SidebarMenu.Nav.Title>
                        </SidebarMenu.Nav>
                    </SidebarMenu.Nav>
                    <Link to="/qlkho/export-manager" className='text-black text-decoration-none'>
                        <SidebarMenu.Nav>
                            <SidebarMenu.Nav.Icon>
                                {' '}
                                <FontAwesomeIcon className={cx('icon-circle-plus')} icon={faFileCirclePlus} />
                            </SidebarMenu.Nav.Icon>
                            <SidebarMenu.Nav.Title>Phiếu xuất</SidebarMenu.Nav.Title>

                        </SidebarMenu.Nav>
                    </Link>
                    <Link to="/qlkho/import-manager" className='text-black text-decoration-none'>
                        <SidebarMenu.Nav>
                            <SidebarMenu.Nav.Icon>
                                {' '}
                                <FontAwesomeIcon className={cx('icon-circle-plus')} icon={faFileCirclePlus} />
                            </SidebarMenu.Nav.Icon>
                            <SidebarMenu.Nav.Title>Phiếu nhập</SidebarMenu.Nav.Title>

                        </SidebarMenu.Nav>
                    </Link>

                    <Link to="/qlkho/product-manager" className='text-black text-decoration-none'>
                        <SidebarMenu.Nav>
                            <SidebarMenu.Nav.Icon>
                                <FontAwesomeIcon className={cx('icon-user')} icon={faBoxesStacked} />
                            </SidebarMenu.Nav.Icon>
                            <SidebarMenu.Nav.Title>Quản lý hàng hoá</SidebarMenu.Nav.Title>

                        </SidebarMenu.Nav>
                    </Link>
                    <Link to="/qlkho/type-product-manager" className='text-black text-decoration-none'>
                        <SidebarMenu.Nav>
                            <SidebarMenu.Nav.Icon>
                                <FontAwesomeIcon className={cx('icon-user')} icon={faBox} />
                            </SidebarMenu.Nav.Icon>
                            <SidebarMenu.Nav.Title>Quản lý loại hàng hoá</SidebarMenu.Nav.Title>

                        </SidebarMenu.Nav>
                    </Link>
                    <Link to="/qlkho/brand-manager" className='text-black text-decoration-none'>
                        <SidebarMenu.Nav>
                            <SidebarMenu.Nav.Icon>
                                <FontAwesomeIcon className={cx('icon-user')} icon={faBox} />
                            </SidebarMenu.Nav.Icon>
                            <SidebarMenu.Nav.Title>Quản lý chi nhánh</SidebarMenu.Nav.Title>

                        </SidebarMenu.Nav>
                    </Link>
                    <Link to="/qlkho/kho-manager" className='text-black text-decoration-none'>
                        <SidebarMenu.Nav>
                            <SidebarMenu.Nav.Icon>
                                <FontAwesomeIcon className={cx('icon-user')} icon={faBox} />
                            </SidebarMenu.Nav.Icon>
                            <SidebarMenu.Nav.Title>Quản lý kho</SidebarMenu.Nav.Title>

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
