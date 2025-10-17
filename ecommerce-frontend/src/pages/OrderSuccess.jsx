import { Link } from 'react-router-dom'
import { FiCheckCircle, FiHome, FiShoppingBag } from 'react-icons/fi'

const OrderSuccess = () => {

  return (
    <div className="order-success">
      <div className="container">
        <div className="success-card">
          <div className="success-icon">
            <FiCheckCircle />
          </div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase. Your order has been confirmed and will be processed shortly.</p>
          <div className="success-actions">
            <Link to="/" className="btn-primary">
              <FiHome className="btn-icon" />
              Continue Shopping
            </Link>
            <Link to="/orders" className="btn-secondary">
              <FiShoppingBag className="btn-icon" />
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess