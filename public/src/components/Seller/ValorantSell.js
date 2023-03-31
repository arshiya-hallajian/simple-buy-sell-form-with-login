import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import {Link} from "react-router-dom";
// import {useNavigate} from "react-router-dom";

const ValorantSell = () => {

    const region = ['لطفا ریجن خود را انتخواب کنید', 'امریکا', 'ترکیه', 'انگلیس', 'آمریکای شمالی', 'کره', 'ژاپن', 'برزیل', 'آمریکا'];
    const rank = ['لطفا رنک خود را انتخواب کنید', 'Iron 1', 'Iron 2', 'Iron 3', 'Bronze 1', 'Bronze 2', 'Bronze 3', 'Silver 1', 'Silver 2', 'Silver 3', 'Gold 1', 'Gold 2', 'Gold 3', 'Platinum 1', 'Platinum 2', 'Platinum 3', 'Diamond 1', 'Diamond 2', 'Diamond 3', 'Ascendant 1', 'Ascendant 2', 'Ascendant 3', 'Immortal 1', 'Immortal 2', 'Immortal 3', 'Gradiant 1', 'Gradiant 2', 'Gradiant 3'];
    // const battle_pass = ['E1:A1', 'E1:A2', 'E1:A3', 'E2:A1', 'E2:A2', 'E2:A3', 'E3:A1', 'E3:A2', 'E3:A3', 'E4:A1', 'E4:A2', 'E4:A3', 'E5:A1', 'E5:A2', 'E5:A3', 'E6:A1']
    const agents = ['تعداد اجنت ها را انتخواب کنید', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'همه باز است'];
    const {register, watch, handleSubmit} = useForm();
    const [image, setImage] = useState({
        response: '',
        data: {},
    });


    const Input = ({label, name, register}) => (
        <>
            <label>{label}</label>
            <input type="text" {...register(name)} />
        </>
    );
    const Select = React.forwardRef(({onChange, onBlur, name, label, options}, ref) => (
        <>
            <label>{label}</label>
            <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
                {options.map((option, key) =>
                    <option value={option} key={key}>{option}</option>
                )}
            </select>
        </>
    ));
    const mother_mail = watch('m_mail');
    // const onSubmit = (data) => console.log(data);


    // const navigate = useNavigate();

    const handleError = (e) => {
        toast.error(e, {
            position: toast.POSITION.BOTTOM_RIGHT
        });

    };

    const handleImage = (e) => {

        if (e.target.files[0]) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                data: e.target.files
            });
        } else {
            setImage({
                preview: '',
                data: {}
            });
        }

    };

    const handleSubmitF = async (e) => {
        // e.preventDefault();
        try {

            if (mother_mail === false) {
                delete e.m_email;
            }

            const sendData = {
                ...e,
                photos_number: image.data.length || 0

            }


            console.log(sendData);
            const frm = new FormData();
            for (let i = 0; i < image.data.length; i++) {
                frm.append('valorantImg', image.data[i]);
            }
            for (let key in sendData) {
                frm.append(key, sendData[key]);
            }

            const config = {
                headers:{
                    auth: localStorage.getItem('auth')
                }
            }
            const response = await toast.promise(
                axios.post('http://localhost:4000/api/sell-form', frm, config),
                {
                    pending: 'درحال ارتباط با سرور🔥',
                    success: 'حله داداش 😎👌',
                    error: 'خطای سرور 😢'
                },
                {
                    position: toast.POSITION.BOTTOM_LEFT
                }
            )

            setTimeout(1000);

            // navigate('/buy-list')
            console.log(response);
            console.log("err 1");
        } catch (error) {
            handleError(error.response.data);
            console.log(error);
            console.log("error2");
        }
    };

    return (

        <div className="sell-form">
            <ToastContainer/>
            <div className="box">
                <form onSubmit={handleSubmit(handleSubmitF)} id="val-form">
                    <div className="label">
                        <Select label="ریجن اکانت:" options={region} {...register("region")} />
                    </div>

                    <div className="label">
                        <Select label="رنک اکانت:" options={rank} {...register("rank")} />
                    </div>

                    <div className="label">
                        <Input label="لول اکانت:" name="level" register={register}/>
                    </div>

                    <div className="label">
                        <Input label="اسم اکانت:" name="account_name" register={register}/>
                    </div>

                    <div className="label">
                        <Input label="مقدار ولورانت پوینت:" name="valorant_point" register={register}/>
                    </div>

                    <div className="label">
                        <Input label="مقدار ریدیانت پوینت:" name="radiant_point" register={register}/>
                    </div>

                    <label form="mail">ایمیل را میدهم:</label>
                    <input type="checkbox" id="mail" name="mail" {...register('m_mail')}/>
                    {mother_mail &&
                        <div className="label"><Input label="ایمیل مادر:" name="m_email" register={register}/></div>}


                    {/*<label>بتل پس های خریداری شده</label>*/}
                    {/*<div className="checkbox">*/}
                    {/*    {battle_pass.map((pass, key) =>*/}
                    {/*        <div className="check-item" key={key}>*/}
                    {/*            /!*<label>{pass}</label>*!/*/}
                    {/*            <input type="checkbox" value="{pass}" {...register(`battle-pass-${key}`)}/>*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*</div>*/}

                    <div className="label">
                        <Select label="اجنت ها:" options={agents} {...register("agents")} />
                    </div>

                    <div className="label">
                        <label form="skins">اسکین ها:</label>
                        <textarea name="skins"
                                  placeholder="اسکین های خود را به صورت دقیق وارد کنید" {...register("skins")}></textarea>
                    </div>

                    <div className="label">
                        <label form="skins">عکس ها:</label>
                        {image.preview && <img src={image.preview} width="100" height="100" alt="preview"/>}
                        <input onChange={(e) => handleImage(e)} type="file" multiple/>
                    </div>


                    <div className="label">
                        <label form="skins">توضیحات:</label>
                        <textarea name="describtion"
                                  placeholder="لطفا توضیحات اضافه درمورد اکانت خود را وارد کنید" {...register("desc")}></textarea>
                    </div>

                    <div className="btnbox">
                        <button type="submit" className="">ثبت کنید</button>
                        <Link to="/"><button>برگشت</button></Link>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ValorantSell;
