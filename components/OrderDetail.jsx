import { useState } from 'react'
import styles from '../styles/OrderDetail.module.css'

const OrderDetail = ({total, createOrder}) => {
  const [customer, setCustomer] = useState("")
  const [address, setAddress] = useState("")

  const handleOrder = () => {
    createOrder({ customer, address, total, method: 0 });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Teslimattan sonra ₺20 ödeme alınacak.</h1>
        <div className={styles.item}>
          <label className={styles.label}>İsim Soyisim</label>
          <input
            placeholder="Burak Özcan"
            type="text"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Telefon Numarası</label>
          <input
            type="text"
            placeholder="+90 553 456 78 99"
            className={styles.input}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Adres</label>
          <textarea
            rows={5}
            placeholder="Hürriyet Mahallesi"
            type="text"
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleOrder}> Siparişi Tamamla </button>
      </div>
    </div>
  )
}

export default OrderDetail