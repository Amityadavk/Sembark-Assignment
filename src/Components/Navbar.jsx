import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
// import data from ".../db.json"



function Navbar({ pressEnter, searchinput, setSearchInput, search, cartvalue }) {

    const navigate = useNavigate();

    // console.log(search)
    return (
        <>
            <div className="navbar-background">
                <div className="navbar">
                    <h1 className="site-name" >SHOPPING SITE</h1>
                    <div className="search-box">
                        <input className="search-input" type="text" onKeyDown={pressEnter} value={searchinput} onChange={(e) => { setSearchInput(e.target.value); }} />

                        <button className="search-button" onClick={() => searchinput.length > 0 && search(searchinput)}>Search</button>
                    </div>
                    {/* <Link to="/cart"> */}
                    <div className='cart' onClick={() => navigate("/cart")}>
                        <FaShoppingCart className="cart-icon" />
                        <div className='cart-item'><span>{cartvalue}</span></div>
                    </div>
                    {/* </Link> */}

                </div>
            </div>
        </>
    );
}


export default Navbar;
