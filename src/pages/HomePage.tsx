import React from 'react';
import { Search, ShoppingCart, User, Heart } from 'lucide-react';
import styles from '../styles/Home.module.css';

const NavCrud: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.mainNav}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <a href="/">
              <h1>Glow & Care</h1>
            </a>
          </div>

          <div className={styles.primaryNav}>
            <ul className={styles.navLinks}>
              <li><a href="/add-category">Categorías</a></li>
              <li><a href="/add-client">Clientes</a></li>
              <li><a href="/add-product">Productos</a></li>
              <li><a href="/purchases">Compras</a></li>
              <li><a href="/product-purchases">Detalles</a></li>
            </ul>
          </div>

          <div className={styles.navUtilities}>
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Buscar productos..."
              />
              <button className={styles.searchButton}>
                <Search size={20} />
              </button>
            </div>
            <div className={styles.navIcons}>
              <button className={styles.iconButton}>
                <User size={20} />
              </button>
              <button className={styles.iconButton}>
                <Heart size={20} />
                <span className={styles.badge}>0</span>
              </button>
              <button className={styles.iconButton}>
                <ShoppingCart size={20} />
                <span className={styles.badge}>0</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

const MainPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <NavCrud />
      <main className={styles.mainContent}>
        <h2>¡Bienvenido a Glow & Care!</h2>
        <p>Descubre nuestra selección de productos para el cuidado de tu piel y disfruta de una experiencia de compra única.</p>
        <div className={styles.featuredProducts}>
          <h3>Productos Destacados</h3>
          <div className={styles.productGrid}>
            <div className={styles.productCard}>
              <img src="/placeholder.svg" alt="Producto 1" />
              <h4>Crema Hidratante</h4>
              <p>$29.99</p>
              <button>Agregar al carrito</button>
            </div>
            <div className={styles.productCard}>
              <img src="/placeholder.svg" alt="Producto 2" />
              <h4>Sérum Facial</h4>
              <p>$39.99</p>
              <button>Agregar al carrito</button>
            </div>
            <div className={styles.productCard}>
              <img src="/placeholder.svg" alt="Producto 3" />
              <h4>Mascarilla Purificante</h4>
              <p>$24.99</p>
              <button>Agregar al carrito</button>
            </div>
            <div className={styles.productCard}>
              <img src="/placeholder.svg" alt="Producto 4" />
              <h4>Tónico Facial</h4>
              <p>$19.99</p>
              <button>Agregar al carrito</button>
            </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2024 Glow & Care. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default MainPage;