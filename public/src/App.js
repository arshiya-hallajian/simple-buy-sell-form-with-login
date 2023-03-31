import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Register from "./components/Login/Register";
import Login from "./components/Login/Login";
import Main from "./components/Main";
import BuyList from "./components/Buyer/BuyList";
import ValorantSell from "./components/Seller/ValorantSell";
// import Private from "./components/Private"

function App() {
    return (
        <BrowserRouter>
            {/*<Routes>*/}
            {/*    <Route exact path="/register" element={<Register/>}/>*/}
            {/*    <Route exact path="/login" element={<Login/>}/>*/}
            {/*    <Route exact path="/" element={*/}
            {/*        <Private>*/}
            {/*            <Main/>*/}
            {/*        </Private>*/}
            {/*    }/>*/}
            {/*    <Route exact path="/buy-list" element={<Private/>}>*/}
            {/*        <Route element={<BuyList/>}/>*/}
            {/*    </Route>*/}
            {/*    <Route exact path="/buy-list" element={<Private/>}>*/}
            {/*        <Route element={<ValorantSell/>}/>*/}
            {/*    </Route>*/}

            {/*</Routes>*/}
            <Routes>
                <Route exact path="/register" element={<Register/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/" element={<Main/>}/>
                <Route exact path="/buy-list" element={<BuyList/>}/>
                <Route exact path="/sell-form" element={<ValorantSell/>}/>
            </Routes>
        </BrowserRouter>
    )
        ;
}

export default App;
