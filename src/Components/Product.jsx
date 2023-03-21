function Products({ image, category, price, rating, brand, description }) {


    return <div>

        <div className="card">
            <img src={image} alt="" />
            <div className="card-details">
                <div>
                    <h5>Category :</h5>
                    <p>Price :</p>
                    <p>Rating :</p>
                    <p>Brand :</p>
                </div>
                <div>
                    <h5>{category}</h5>
                    <p>{price}</p>
                    <p>{rating}</p>
                    <p>{brand}</p>
                </div>
            </div>

            <div className="description">

                <h6>Description</h6>
                <p>{description.length > 55 ? description.slice(0, 55) + "..." : description}</p>
            </div>

            <div className="card-button">
                <button>Add to Cart</button>
            </div>


        </div>


        {/* {JSON.stringify(product)} */}

    </div>
}

export default Products;