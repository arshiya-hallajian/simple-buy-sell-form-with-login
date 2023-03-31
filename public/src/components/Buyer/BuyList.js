import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const BuyList = () => {
    const [posts, setPosts] = useState([]);


    useEffect(() => {

        const apiUrl = "http://localhost:4000/api/buy-list";
        const config = {
            headers: {
                auth: localStorage.getItem('auth')
            }
        };
        axios.get(apiUrl, config).then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                setPosts(response.data);
            }

        });

    }, []);

    const fakeimg = "https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg";
    return (
        <div className="buylist">
            <div className="box">
                <h2 className="">
                    لیست خرید
                </h2>
                <div className="line"></div>

                {posts.map((post, key) => {
                        return (
                            <div className="order" key={key}>
                                <img
                                    src={post.images[0] ? `http://localhost:4000/${post.images[0]}` : fakeimg}
                                    alt="nothingyet"/>
                                <h3>اکانت {post.account_name}</h3>
                                <div className="detail">
                                    <p>رنک : {post.rank}</p>
                                    <p>لول : {post.level}</p>
                                    <p>تعداد اجنت : {post.agents}</p>
                                    <p>ریجن: {post.region}</p>
                                    <p>ولورانت پوینت: {post.valorant_point}</p>
                                    <p>رادینت پوینت: {post.radient_point}</p>
                                    <p>ایمیل: {post.email_status ? "دارد" : "ندارد"}</p>
                                </div>
                            </div>
                        )
                    }
                )
                }
            </div>
            <Link to="/"><button className="button">برگشت</button></Link>
        </div>
    );
}

export default BuyList;


