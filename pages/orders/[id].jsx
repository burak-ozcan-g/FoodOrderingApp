import Image from 'next/image'
import styles from '../../styles/Order.module.css'
import axios from 'axios';


const Order = ({order}) => {
  const status = order.status;

  const statusClass = (index) => {
    if (index - status < 1) return styles.done
    if (index - status === 1) return styles.inProgress
    if (index - status > 1) return styles.undone
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                <th>Sipariş ID</th>
                <th>Müşteri</th>
                <th>Adres</th>
                <th>Toplam</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className={styles.id}>{order._id} </span>
                </td>
                <td>
                  <span className={styles.name}> {order.customer} </span>
                </td>
                <td>
                  <span className={styles.adress}> {order.address} </span>
                </td>
                <td>
                  <span className={styles.total}> ₺{order.total} </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src="/img/paid.png" width={30} height={30} alt='' />
            <span>Ödeme</span>
            <div className={styles.checkedIcon}>
              <Image className={styles.checkedIcon} src="/img/checked.png" width={20} height={20} alt='' />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src="/img/bake.png" width={30} height={30} alt='' />
            <span>Paket Hazırlanıyor</span>
            <div className={styles.checkedIcon}>
              <Image className={styles.checkedIcon} src="/img/checked.png" width={20} height={20} alt='' />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src="/img/bike.png" width={30} height={30} alt='' />
            <span>Sipariş Yolda</span>
            <div className={styles.checkedIcon}>
              <Image className={styles.checkedIcon} src="/img/checked.png" width={20} height={20} alt='' />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src="/img/delivered.png" width={30} height={30} alt='' />
            <span>Teslim Edildi</span>
            <div className={styles.checkedIcon}>
              <Image className={styles.checkedIcon} src="/img/checked.png" width={20} height={20} alt='' />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>SEPET TOPLAMI</h2>
          <div className={styles.totalText}>
            <b className={styles.ttTitle}>Aratoplam:</b>₺{order.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.ttTitle}>İndirim:</b>₺0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.ttTitle}>Toplam:</b>₺{order.total}
          </div>
          <button disabled className={styles.button}>CHECKOUT NOW!</button>
        </div>
      </div>
    </div>
  )
}


export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`https://food-ordering-app-fawn.vercel.app//api/orders/${params.id}`)
  return {
    props: {
      order: res.data,
    },
  };
};

export default Order