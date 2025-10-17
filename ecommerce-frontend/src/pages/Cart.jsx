import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { createOrder } from '../utils/api'
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    setLoading(true)
    try {
      const orderData = {
        items: cart.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: getCartTotal()
      }
      
      await createOrder(orderData)
      clearCart()
      navigate('/order-success')
    } catch (error) {
      console.error('Order failed:', error)
      alert('Order failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
          <button 
            className="checkout-btn" 
            onClick={handleCheckout}
            disabled={loading}
          >
            <FiShoppingBag className="btn-icon" />
            {loading ? 'Processing...' : 'Proceed to Checkout'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart