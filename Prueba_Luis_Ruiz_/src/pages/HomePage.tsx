import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
}

const HomePage: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const products: Product[] = [
    { id: 1, title: "Producto 1", description: "Descripción del producto 1", price: "$99.99" },
    { id: 2, title: "Producto 2", description: "Descripción del producto 2", price: "$149.99" },
    { id: 3, title: "Producto 3", description: "Descripción del producto 3", price: "$199.99" },
    { id: 4, title: "Producto 4", description: "Descripción del producto 4", price: "$79.99" }
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.title}>Bienvenido a Mi Tienda</h1>
        <p style={styles.subtitle}>Los mejores productos al mejor precio</p>
        <button 
          style={styles.ctaButton} 
          onClick={() => setCount(count + 1)}
        >
          Click Aquí ({count})
        </button>
      </section>

      {/* Productos Section */}
      <section style={styles.productsSection}>
        <h2 style={styles.sectionTitle}>Nuestros Productos</h2>
        <div style={styles.productsGrid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>¿Por qué elegirnos?</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>🚚</span>
            <h3>Envío Gratis</h3>
            <p>En compras mayores a $50</p>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>🔒</span>
            <h3>Pago Seguro</h3>
            <p>100% protegido</p>
          </div>
          <div style={styles.featureCard}>
            <span style={styles.featureIcon}>⭐</span>
            <h3>Garantía</h3>
            <p>30 días de garantía</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2024 Mi Tienda - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '100vh'
  },
  hero: {
    textAlign: 'center',
    padding: '80px 20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    marginBottom: '40px'
  },
  title: {
    fontSize: '48px',
    color: '#333',
    marginBottom: '20px',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: '20px',
    color: '#666',
    marginBottom: '30px'
  },
  ctaButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    fontSize: '18px',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  productsSection: {
    marginBottom: '60px',
    padding: '0 20px'
  },
  sectionTitle: {
    fontSize: '32px',
    color: '#333',
    textAlign: 'center',
    marginBottom: '40px'
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px'
  },
  featuresSection: {
    backgroundColor: '#f8f9fa',
    padding: '60px 20px',
    marginTop: '40px'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  featureCard: {
    textAlign: 'center',
    padding: '20px'
  },
  featureIcon: {
    fontSize: '48px',
    display: 'block',
    marginBottom: '15px'
  },
  footer: {
    textAlign: 'center',
    padding: '30px',
    backgroundColor: '#282c34',
    color: 'white',
    marginTop: '40px'
  }
};

export default HomePage;