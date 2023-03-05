import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useState } from 'react';
import axios from 'axios';
import * as Service from "../../services/index";
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const navigate = useNavigate()
    const handleLogin = async () => {
        try {
            const rs = (await Service.UserService.login({ email: email, password: pass })).data
            
            localStorage.setItem('user', JSON.stringify(rs));

            if (rs.account.role === 0) {
                navigate('/admin')
            } else if (rs.account.role === 1) {
                navigate('/staff')
            }
            else {
                navigate('/qlkho')
            }
        } catch (error) {
            console.log(error);
            alert("Đăng nhập thất bại!!!")
        }
    }

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('text-center')}>{/* <img className={cx('w-50')} src={images.logo_login} /> */}</h2>
            <Form>
                <Form.Floating className={cx('content-login my-4')}>
                    <Form.Control id="floatingInputCustom" type="email" placeholder="name@example.com" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <label htmlFor="floatingInputCustom">
                        <FontAwesomeIcon className={cx('me-1')} icon={faUser} /> Email address
                    </label>
                </Form.Floating>
                <Form.Floating className={cx('content-login my-4')}>
                    <Form.Control id="floatingPasswordCustom" type="password" placeholder="Password" value={pass} onChange={(e) => { setPass(e.target.value) }} />
                    <label htmlFor="floatingPasswordCustom">
                        <FontAwesomeIcon className={cx('me-2')} icon={faLock} />
                        Password
                    </label>
                </Form.Floating>
                <Form.Group className={cx('mt-4')} id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Form.Floating className={cx('btn-login mb-4 mt-3 text-center')}>
                    <Button className={cx('btn-content-login')} onClick={() => { handleLogin() }}>Login</Button>
                </Form.Floating>
            </Form>
        </div>
    );
}

export default Login;
