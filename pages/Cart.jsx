import styles from "../styles/Cart.module.css"
import Image from "next/image"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "@/redux/cartSlice";
import OrderDetail from "@/components/OrderDetail";
import { loadStripe } from '@stripe/stripe-js';


const Cart = () => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  const cart = useSelector(state => state.cart);
  const [cash, setCash] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleOnline = async () => {
    const lineItems = cart.products.map((item) => {
      return {
        price_data: {
          currency: 'try',
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100
        },
        quantity: item.quantity,
      }
    })
    const {data} = await axios.post('https://food-ordering-app-fawn.vercel.app/api/checkout', {lineItems})

    const stripe = await stripePromise

    await stripe.redirectToCheckout({sessionId: data.id})
  }


  const createOrder = async (data) => {
    try {
      const res = await axios.post("https://food-ordering-app-fawn.vercel.app/api/orders", data);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Ürün</th>
              <th>Ürün Adı</th>
              <th>Extras</th>
              <th>Fiyat</th>
              <th>Adet</th>
              <th>Toplam Fiyat</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map(product => (
              <tr className={styles.trItem} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image src={product.img} alt="" fill={true} style={{ objectFit: "cover" }} />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.map(extra => (
                      <span key={extra._id}> {extra.text},  </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}> ₺{product.price} </span>
                </td>
                <td>
                  <span className={styles.quantity}> {product.quantity} </span>
                </td>
                <td>
                  <span className={styles.total}> ₺{product.quantity * product.price} </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>SEPET TOPLAMI</h2>
          <div className={styles.totalText}>
            <b className={styles.ttTitle}>Aratoplam: </b>₺{cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.ttTitle}>İndirim: </b>₺0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.ttTitle}>Toplam: </b>₺{cart.total}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button className={styles.payButton} onClick={() => setCash(true)}>NAKİT ÖDEME!</button>
              <button className={styles.payButton} onClick={handleOnline}>ONLINE ÖDEME!</button>
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className={styles.button}>Sepeti Onayla!</button>
          )}
        </div>
      </div>
      {cash && (<OrderDetail total={cart.total} createOrder={createOrder} />)}
    </div>
  )
}

export default Cart

