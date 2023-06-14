import styles from '../styles/ProductList.module.css'
import ProductCard from './ProductCard'

function ProductList({ productList }) {
  return (
    <div className={styles.container} >
      <h1 className={styles.title}>Tüm Pizzalar</h1>
      <div className={styles.wrapper}>
        {productList.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductList