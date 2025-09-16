import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CategoryPage from './components/CategoryPage';
import ProductDetailPage from './components/ProductDetailPage';
import ProductModal from './components/ProductModal';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import { products } from './data/products';
import { Product, CartItem } from './types/Product';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [productLikes, setProductLikes] = useState<{[key: number]: {likes: number, isLiked: boolean}}>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'category' | 'product' | 'login' | 'register' | 'forgot-password'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('GRAM KÜLÇE ALTIN');

  // Initialize product likes from products data
  React.useEffect(() => {
    const initialLikes: {[key: number]: {likes: number, isLiked: boolean}} = {};
    products.forEach(product => {
      initialLikes[product.id] = {
        likes: product.likes || 0,
        isLiked: product.isLiked || false
      };
    });
    setProductLikes(initialLikes);
  }, []);

  // Get products with updated likes
  const getProductsWithLikes = () => {
    return products.map(product => ({
      ...product,
      likes: productLikes[product.id]?.likes ?? product.likes ?? 0,
      isLiked: productLikes[product.id]?.isLiked ?? product.isLiked ?? false
    }));
  };

  const handleToggleLike = (product: Product) => {
    setProductLikes(prev => {
      const currentLikes = prev[product.id] || { likes: product.likes || 0, isLiked: false };
      const newIsLiked = !currentLikes.isLiked;
      const newLikes = newIsLiked ? currentLikes.likes + 1 : Math.max(0, currentLikes.likes - 1);
      
      return {
        ...prev,
        [product.id]: {
          likes: newLikes,
          isLiked: newIsLiked
        }
      };
    });

    // Update selected product if it's the same product
    if (selectedProduct && selectedProduct.id === product.id) {
      const updatedProduct = {
        ...selectedProduct,
        likes: productLikes[product.id]?.isLiked ? (productLikes[product.id]?.likes || 0) - 1 : (productLikes[product.id]?.likes || selectedProduct.likes || 0) + 1,
        isLiked: !productLikes[product.id]?.isLiked
      };
      setSelectedProduct(updatedProduct);
    }
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { product, quantity }];
      }
    });

    // Close modal and show cart
    setIsProductModalOpen(false);
    setIsCartOpen(true);
  };

  const handleViewProduct = (product: Product) => {
    const productWithLikes = getProductsWithLikes().find(p => p.id === product.id) || product;
    if (currentView === 'product') {
      // If we're already on a product page, just update the product
      setSelectedProduct(productWithLikes);
    } else {
      // Otherwise, navigate to product detail page
      setSelectedProduct(productWithLikes);
      setCurrentView('product');
    }
  };

  const handleUpdateCartQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('category');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedProduct(null);
  };

  const handleBackToCategory = () => {
    setCurrentView('category');
  };

  const handleShowLogin = () => {
    setCurrentView('login');
  };

  const handleShowRegister = () => {
    setCurrentView('register');
  };

  const handleShowForgotPassword = () => {
    setCurrentView('forgot-password');
  };

  const productsWithLikes = getProductsWithLikes();

  // Auth pages
  if (currentView === 'login') {
    return (
      <LoginPage
        onBack={handleBackToHome}
        onSwitchToRegister={handleShowRegister}
        onSwitchToForgotPassword={handleShowForgotPassword}
      />
    );
  }

  if (currentView === 'register') {
    return (
      <RegisterPage
        onBack={handleBackToHome}
        onSwitchToLogin={handleShowLogin}
      />
    );
  }

  if (currentView === 'forgot-password') {
    return (
      <ForgotPasswordPage
        onBack={handleBackToHome}
        onSwitchToLogin={handleShowLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItems={cartItems} 
        onCartClick={() => setIsCartOpen(true)}
        onCategoryClick={handleCategoryClick}
        onLoginClick={handleShowLogin}
      />
      
      {currentView === 'home' && (
        <>
          <Hero onCategoryClick={handleCategoryClick} />
          
          <ProductGrid
            products={productsWithLikes}
            onAddToCart={(product) => handleAddToCart(product, 1)}
            onViewProduct={handleViewProduct}
            onToggleLike={handleToggleLike}
          />
        </>
      )}
      
      {currentView === 'category' && (
        <CategoryPage
          category={selectedCategory}
          products={productsWithLikes}
          onAddToCart={(product) => handleAddToCart(product, 1)}
          onViewProduct={handleViewProduct}
          onToggleLike={handleToggleLike}
        />
      )}

      {currentView === 'product' && selectedProduct && (
        <ProductDetailPage
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onBack={handleBackToCategory}
          relatedProducts={productsWithLikes.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)}
          onViewProduct={handleViewProduct}
          onToggleLike={handleToggleLike}
        />
      )}

      <Footer />

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isProductModalOpen}
          onClose={() => {
            setIsProductModalOpen(false);
            setSelectedProduct(null);
          }}
          onAddToCart={handleAddToCart}
          onToggleLike={handleToggleLike}
        />
      )}

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
      />
    </div>
  );
}

export default App;