import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import ProductFilter from '../components/ProductFilter'
import { getProducts, getCategories } from '../utils/api'


const Home = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [categories, setCategories] = useState([])

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts()
        const productsData = response.data
        setProducts(productsData)
        setFilteredProducts(productsData)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    const fetchCategories = async () => {
      try {
        const response = await getCategories()
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchProducts()
    fetchCategories()
  }, [])

  // Filter products based on category and search term
  useEffect(() => {
    let filtered = products
    
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    setFilteredProducts(filtered)
  }, [products, selectedCategory, searchTerm])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  const handleSearchChange = (term) => {
    setSearchTerm(term)
  }

  return (
    
    <div className="home">
      

      <div className="hero-section" >
        
        
        <div className="container">
         
          <h1 className="hero-title">
            {"Welcome to ShopEase".split("").map((letter, index) => (
              <span 
                key={index} 
                className="letter" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>
          <p className="hero-subtitle">Discover amazing products at unbeatable prices</p>
        </div>
      </div>
      
      <ProductFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <div className="container">
        <h2 className="section-title">
          {selectedCategory ? `${selectedCategory} Products` : 'Featured Products'}
          <span className="product-count">({filteredProducts.length} items)</span>
        </h2>
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home