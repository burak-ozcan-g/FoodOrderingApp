import styles from '../styles/ProductList.module.css'
import ProductCard from './ProductCard'

function ProductList({ productList }) {
  return (
    <div className={styles.container} >
      <h1 className={styles.title}>ŞEHRİN EN İYİ PİZZASI</h1>
      <p className={styles.desc}>
        Şehrin her yerinden kolaylikla ulaşabileceğiniz en sevdiğiniz pizzaci.
        Sizlere sundugumuz unutamiyacaginiz lezzetlerimizin her zaman arkasindayiz.
      </p>
      <div className={styles.wrapper}>
        {productList.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductList