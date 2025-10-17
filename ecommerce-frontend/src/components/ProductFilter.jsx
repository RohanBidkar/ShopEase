import { FiFilter } from 'react-icons/fi'

const ProductFilter = ({ categories, selectedCategory, onCategoryChange, searchTerm, onSearchChange }) => {
  return (
    <div className="filter-section">
      <div className="container">
        <div className="filter-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="category-filter">
            <FiFilter className="filter-icon" />
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="category-select"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductFilter