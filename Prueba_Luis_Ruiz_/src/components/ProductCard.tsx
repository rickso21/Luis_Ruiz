import React from 'react';

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, price }) => {
  return (
    <div style={styles.card}>
      <div style={styles.imagePlaceholder}>
        <span>🖼️</span>
      </div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{description}</p>
      <p style={styles.price}>{price}</p>
      <button style={styles.button}>Comprar</button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease'
  },
  imagePlaceholder: {
    backgroundColor: '#f0f0f0',
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    marginBottom: '10px',
    fontSize: '40px'
  },
  title: {
    margin: '10px 0',
    color: '#333',
    fontSize: '18px'
  },
  description: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '10px'
  },
  price: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '10px'
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px'
  }
};

export default ProductCard;