import { useCart } from '../context/CartContext'
import { FiShoppingCart, FiStar } from 'react-icons/fi'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-badge">{product.category}</div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <FiStar 
              key={i} 
              className={`star ${i < product.rating ? 'filled' : ''}`} 
            />
          ))}
          <span className="rating-text">({product.rating})</span>
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <div className="price-container">
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
            <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
          </div>
          <button 
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
          >
            <FiShoppingCart className="btn-icon" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard