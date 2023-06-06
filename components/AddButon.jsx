import styles from '../styles/Add.module.css'

const AddButon = ({setClose}) => {
  return (
    <div onClick={() => setClose(false)} className={styles.newAddButton}>
      Yeni Ürün Ekle
    </div>
  )
}

export default AddButon