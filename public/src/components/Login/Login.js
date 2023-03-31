import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    };

    const handleError = (e) => {
        toast.error(e, {
            position: toast.POSITION.BOTTOM_RIGHT
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const {data} = await axios.post('http://localhost:4000/api/login', {
            //     ...values,
            // });
            const response = await toast.promise(
                axios.post('http://localhost:4000/api/login', {
                    ...values,
                }),
                {
                    pending: 'درحال وارد شدن🔥',
                    success: 'وارد شدی 😎👌',
                    error: 'خطای سرور 😢'
                },
                {
                    position: toast.POSITION.BOTTOM_LEFT
                }
            )
            // console.log(window.)
            navigate('/')
            console.log(response);
            localStorage.setItem('auth',JSON.stringify(response.data))
            // console.log("err 1");
        } catch (error) {
            handleError(error.response.data);
             // console.log(error.response.data);
            console.log("error2");
        }
    };

    return (
        <>
            <div className="login-form">
                <div>
                    <form method="post" onSubmit={event => handleSubmit(event)}>
                        <input type="text" name="email" onChange={e => handleChange(e)}
                               placeholder="لطفا ایمیل خود را وارد کنید"/>
                        <input type="password" name="password" onChange={e => handleChange(e)}
                               placeholder="لطفا رمز خود را وارد کنید"/>
                        <button type="submit">ورود</button>
                    </form>
                    <p><Link to="/register">ثبت نام کنید</Link></p>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
};

export default Login;
