import { FaShoppingCart } from 'react-icons/fa'; 
function Navbar({ pressEnter, searchinput, setSearchInput, search, cartvalue }) {
    return (
        <>
            <div className="navbar-background">
                <div className="navbar">
                    <h1 className="site-name" >Shoping Site</h1>
                    <div className="search-box">
                        <input className="search-input" type="text" onKeyDown={pressEnter} value={searchinput} onChange={(e) => { setSearchInput(e.target.value); }} />

                        <button className="search-button" onClick={() => searchinput.length > 0 && search(searchinput)}>Search</button>
                    </div>
                    <div className='cart'>
                        <div className='cart-item'><span>{cartvalue}</span></div>
                        <FaShoppingCart className="cart-icon" />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Navbar;
