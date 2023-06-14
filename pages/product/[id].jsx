import Image from 'next/image'
import styles from '../../styles/Product.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addProduct } from '@/redux/cartSlice'

const Product = ({ product }) => {
  const [price, setPrice] = useState(product.prices[0]);
  const [size, setSize] = useState(0);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number)
  }

  const handleSize = (sizeIndex) => {
    const difference = product.prices[sizeIndex] - product.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  }

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price)
      setExtras((p) => [...p, option]);
    } else {
      changePrice(-option.price)
      setExtras(extras.filter((e) => e._id !== option._id))
    }
  }

  const handleAddCart = () => {
    dispatch(addProduct({ ...product, extras, price, quantity }));
  }


  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={product.img} alt='' fill={true} style={{ objectFit: "contain" }} />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}> {product.title} </h1>
        <span className={styles.price}> ₺{price} </span>
        <p className={styles.desc}> {product.desc} </p>
        <h3 className={styles.choose}>Pizza Boyutu </h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" alt='' fill={true} />
            <span className={styles.sizeText}>Küçük</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" alt='' fill={true} />
            <span className={styles.sizeText}>Orta</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" alt='' fill={true} />
            <span className={styles.sizeText}>Büyük</span>
          </div>
        </div>
        <h3 className={styles.choose}>Eklenecek malzemeleri seçin</h3>
        <div className={styles.ingredients}>
          {product.extraOptions.map(option => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor='double' >{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className={styles.quantity}
          />
          <button className={styles.button} onClick={handleAddCart}>Sepete Ekle</button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`https://food-ordering-app-fawn.vercel.app//api/products/${params.id}`)
  return {
    props: {
      product: res.data,
    },
  };
};

export default Product