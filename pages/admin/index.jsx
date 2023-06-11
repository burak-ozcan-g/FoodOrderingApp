import Image from 'next/image'
import styles from '../../styles/Admin.module.css'
import axios from 'axios'
import { useState } from 'react'

const Index = ({ products, orders }) => {
  const [productList, setProductList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["Hazırlanıyor", "Yolda", "Teslim Edildi"]


  const handleDelete = async (id) => {
    try {
      const res = await axios.delete("https://food-ordering-app-fawn.vercel.app/api/products/" + id)
      setProductList(productList.filter((p) => p._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleStatus = async (id) => {
    const item = orderList.filter(order => order._id === id)[0]
    const currentStatus = item.status

    try {
      const res = await axios.put("https://food-ordering-app-fawn.vercel.app/api/orders/" + id, { status: currentStatus + 1 })
      setOrderList([
        res.data,
        ...orderList.filter((o) => o._id !== id)
      ])
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.item}>

        <h1 className={styles.title}>Ürünler </h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Görsel</th>
              <th>Id</th>
              <th>Ürün Adı</th>
              <th>Fiyat</th>
              <th>İşlem</th>
            </tr>
          </thead>
          {productList.map(product => (
            <tbody key={product._id}>
              <tr>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    alt=''
                    style={{ objectFit: "cover" }}
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>₺{product.prices[0]}</td>
                <td>
                  <button className={styles.button}>Düzenle</button>
                  <button className={styles.button} onClick={() => handleDelete(product._id)}>Sil</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}> Siparişler </h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Müşteri</th>
              <th>Toplam</th>
              <th>Ödeme</th>
              <th>Sipariş</th>
              <th>İşlem</th>
            </tr>
          </thead>
          {orderList.map(order => (
            <tbody key={order._id}>
              <tr>
                <td> {order._id.slice(0, 5)}... </td>
                <td> {order.customer} </td>
                <td> ₺{order.total} </td>
                <td>
                  {order.method === 0 ? <span>Nakit</span> : <span>Ödendi</span>}
                </td>
                <td> {status[order.status]} </td>
                <td>
                  <button onClick={() => handleStatus(order._id)}>Sonraki Adım</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  
  if(myCookie.token !== process.env.TOKEN){
    return{
      redirect: {
        destination: "/admin/login",
        permanent: false,
      }
    }
  }

  const proRes = await axios.get("https://food-ordering-app-fawn.vercel.app/api/products")
  const orRes = await axios.get("https://food-ordering-app-fawn.vercel.app/api/orders")

  return {
    props: {
      products: proRes.data,
      orders: orRes.data,
    }
  }
}

export default Index