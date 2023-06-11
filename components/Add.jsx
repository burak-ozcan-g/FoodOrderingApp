import axios from 'axios';
import styles from '../styles/Add.module.css'
import { useState } from 'react'

const Add = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value })
  }

  const handleExtra = (e) => {
    setExtraOptions(p => [...p, extra])
  }

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices)
  }

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads")
    try {
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dqntehzu4/image/upload", data)

      const { url } = uploadRes.data;
      const newProduct = {
        title, desc, prices, extraOptions, img: url,
      }

      await axios.post("https://food-ordering-app-fawn.vercel.app/api/products",  newProduct);
      setClose(true)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>X</span>
        <h1>Yeni bir ürün ekle</h1>
        <div className={styles.item}>
          <label className={styles.label}>Bir görsel seçin</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Ürün Adı</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Açıklama</label>
          <textarea
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Fiyatlar</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Küçük"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Orta"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Büyük"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>

        </div>
        <div className={styles.item}>
          <label className={styles.label}>Ekstra</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Malzeme"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Fiyat"
              name="price"
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>Ekle</button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>Oluştur</button>
      </div>
    </div>
  )
}

export default Add