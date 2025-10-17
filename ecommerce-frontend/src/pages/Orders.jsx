import { useState, useEffect } from 'react'
import { getMyOrders } from '../utils/api'
import { FiPackage, FiCalendar, FiDollarSign } from 'react-icons/fi'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await getMyOrders()
      setOrders(response.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="orders-page">
        <div className="container">
          <h2>Loading orders...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="orders-page">
      <div className="container">
        <h2>My Orders</h2>
        {orders.length === 0 ? (
          <div className="no-orders">
            <FiPackage className="no-orders-icon" />
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="order-id">
                    <FiPackage className="order-icon" />
                    Order #{order._id.slice(-8)}
                  </div>
                  <div className="order-status">
                    <span className={`status ${order.status}`}>{order.status}</span>
                  </div>
                </div>
                <div className="order-details">
                  <div className="order-date">
                    <FiCalendar className="detail-icon" />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <div className="order-total">
                    <FiDollarSign className="detail-icon" />
                    ₹{order.totalAmount.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="order-items">
                  {order.items.map(item => (
                    <div key={item._id} className="order-item">
                      <span>{item.product?.name || 'Product'}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders