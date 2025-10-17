import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { FiShoppingCart, FiHome, FiShoppingBag, FiUser, FiLogOut, FiSettings, FiSun, FiMoon } from 'react-icons/fi'

const Header = () => {
  const { getCartItemsCount } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <FiShoppingBag className="logo-icon" />
          <h1>ShopEase</h1>
        </Link>
        <nav>
          <button onClick={toggleTheme} className="theme-toggle">
            {isDark ? <FiSun className="nav-icon" /> : <FiMoon className="nav-icon" />}
          </button>
          <Link to="/" className="nav-link">
            <FiHome className="nav-icon" />
            Home
          </Link>
          <Link to="/cart" className="nav-link cart-link">
            <FiShoppingCart className="nav-icon" />
            Cart
            {getCartItemsCount() > 0 && (
              <span className="cart-badge">{getCartItemsCount()}</span>
            )}
          </Link>
          {isAuthenticated ? (
            <>
              {user?.role === 'admin' && (
                <Link to="/admin" className="nav-link">
                  <FiSettings className="nav-icon" />
                  Admin
                </Link>
              )}
              <span className="nav-link user-info">
                <FiUser className="nav-icon" />
                {user?.name}
              </span>
              <button onClick={logout} className="nav-link logout-btn">
                <FiLogOut className="nav-icon" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                <FiUser className="nav-icon" />
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header