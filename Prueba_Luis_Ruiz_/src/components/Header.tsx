import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.logo}>Mi Tienda</h1>
        <nav style={styles.nav}>
          <a href="/" style={styles.link}>Inicio</a>
          <a href="#productos" style={styles.link}>Productos</a>
          <a href="#contacto" style={styles.link}>Contacto</a>
        </nav>
      </div>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    backgroundColor: '#282c34',
    padding: '20px 0',
    marginBottom: '20px'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    color: 'white',
    margin: 0,
    fontSize: '24px'
  },
  nav: {
    display: 'flex',
    gap: '20px'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    cursor: 'pointer'
  }
};

export default Header;