import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

const Register = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        password2: ''
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleError = (e) => {
        toast.error(e, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // const {data} = await axios.post('http://localhost:4000/api/register', {
            //     ...values,
            // });
            const response = await toast.promise(
                axios.post('http://localhost:4000/api/register', {
                    ...values,
                }),
                {
                    pending: 'درحال ثبت نام📖',
                    success: 'ثبت نام موفقیت آمیر بود 🥳',
                    error: 'خطا در ثبت نام 🤯'
                },
                {
                    position: toast.POSITION.BOTTOM_RIGHT
                }
            )

            navigate('/login')
            // console.log(data);
            console.log(response);
            console.log("error1");
        } catch (error) {
            handleError(error.response.data);
            // console.log(error.response)
            // console.log("error2");
        }
    }

    return (
        <>
            <div className="login-form">
                <div>
                    <form method="post" onSubmit={event => handleSubmit(event)}>
                        <input type="text" name="email" onChange={e => handleChange(e)}
                               placeholder="ایمیل خود را وارد کنید"
                        />
                        <input type="password" name="password" onChange={e => handleChange(e)}
                               placeholder="پسورد خود را وارد کنید"/>
                        <input type="password" name="password2" onChange={e => handleChange(e)}
                               placeholder="مجددا پسورد خود را وارد کنید"/>
                        <button type="submit">ثبت نام</button>
                    </form>
                    <Link to="/login">ورود به حساب</Link>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
};

export default Register;
