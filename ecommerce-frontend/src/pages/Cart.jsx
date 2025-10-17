import { useCart } from '../context/CartContext'
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart()

  if (cart.length === 0) {
    return (
      <div className="cart">
        <div className="container">
          <h2>Your Cart</h2>
          <p>Your cart is empty</p>
        </div>
      </div>
    )
  }

  return (
    <div className="cart">
      
      <div className="container">
        <h2>Your Cart</h2>
        <div className="cart-items">
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>₹{item.price.toLocaleString('en-IN')}</p>
              </div>
              <div className="cart-item-controls">
                <button 
                  onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                  className="quantity-btn"
                >
                  <FiMinus />
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  <FiPlus />
                </button>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="remove-btn"
                >
                  <FiTrash2 />
                </button>
              </div>
              <div className="cart-item-total">
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Total: ₹{getCartTotal().toLocaleString('en-IN')}</h3>
          <button className="checkout-btn">
            <FiShoppingBag className="btn-icon" />
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart