import {Outlet, Navigate} from 'react-router-dom';
import {useCallback, useEffect, useLayoutEffect, useState} from "react";
import axios from "axios";

const Private = ({children}) => {
    const [status, setStatus] = useState(false);


    const api = useCallback(
        async () => {
            const config = {
                headers: {
                    auth: localStorage.getItem('auth')
                }
            };
            try {
                const res = await axios.get('http://localhost:4000/api/auth', config)
                // console.log(res)
                // console.log('tst')
                // console.log(res.data.data, 1)
                // console.log(res.data.status, 2)
                    console.log(res)
                if (res.status === 200){
                setStatus(true)
                    console.log("ok")
                }else{
                    setStatus(false)
                    console.log("not ok: ",res)
                }
            } catch (err) {
                console.log(err)
            }
        },
        [],
    );


    useLayoutEffect(() => {
        api()
    }, []);


    console.log(status, 3)

    return status ? children : <Navigate to="/login"/>
}

export default Private;