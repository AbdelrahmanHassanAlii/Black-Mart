/* eslint-disable react/prop-types */
export default function ProductCard({ product }) {
    return (
        <div className="Products">
            <div className="image">
                <img src={product.imgCover} alt={product.name} />
            </div>

            <div className="info">
                <h1>{product.name}</h1>
                <p>{product.price}</p>
            </div>

            <div className="buttons">
                <button className="delete" onClick={() => {}}>Delete</button>
                <button className="edit" onClick={() => {}}>Edit</button>
            </div>
        </div>
    );
}
