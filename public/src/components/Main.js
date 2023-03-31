import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";


const Main = () => {
    const navigate = useNavigate();
    console.log(JSON.parse(localStorage.getItem('auth')));
    console.log(localStorage.getItem('auth'));
    const logout = async () => {
        const header = {
            headers: {
                auth: localStorage.getItem('auth')
            }
        };
        try{
        const response = await axios.get('http://localhost:4000/api/logout', header);
            if (response.status === 200) {
                toast.warn("شما خارج شدید", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                localStorage.removeItem('auth');
                navigate('/login')
            }
        }catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="mainPage">
            <div className="butt">
                <Link to="/sell-form">
                    <button className="button">فروشنده</button>
                </Link>
                <Link to="/buy-list">
                    <button className="button">خریدار</button>
                </Link>
            </div>
            <button className="button1" onClick={logout}>خروج</button>
        </div>
    );
};

export default Main;
