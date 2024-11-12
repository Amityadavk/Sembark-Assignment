
import { HiShoppingCart } from "react-icons/hi"
import { useNavigate } from 'react-router-dom';
// import data from ".../db.json"

// AiOutlineShoppingCart

function Navbar({ pressEnter, searchinput, setSearchInput, search, cartvalue }) {

    const navigate = useNavigate();

    // console.log(search)
    return (
        <>
            <div className="navbar-background">
                <div className="navbar">
                    <h1 className="site-name" >SHOPPING SITE</h1>
                    <div className="search-box">
                        <input className="search-input" placeholder="Search by Product, Brand & More..." type="text" onKeyDown={pressEnter} value={searchinput} onChange={(e) => { setSearchInput(e.target.value); }} />

                        <button className="search-button" onClick={() => searchinput.length > 0 && search(searchinput)}>Search</button>
                    </div>
                    {/* <Link to="/cart"> */}
                    <div className='cart' onClick={() => navigate("/cart")}>
                        <HiShoppingCart className="cart-icon" />
                        {cartvalue !== 0 && <div className='cart-item'><span>{cartvalue}</span></div>}
                        {/* <div className='cart-item'><span>{cartvalue}</span></div> */}
                    </div>
                    {/* </Link> */}

                </div>
            </div> 
        </>
    );
}


export default Navbar;
