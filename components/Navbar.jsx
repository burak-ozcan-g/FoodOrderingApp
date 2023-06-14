import Image from "next/image"
import styles from "../styles/Navbar.module.css"
import { useSelector } from "react-redux"
import Link from "next/link";

const Navbar = () => {
    const totalQuantity = useSelector(state => state.cart.totalQuantity);

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.callButton}>
                    <Image src="/img/telephone.png" alt="" width="32" height="32" />
                </div>
                <div className={styles.texts}>
                    <div className={styles.text}> HEMEN SİPARİŞ VER! </div>
                    <div className={styles.text}> 344 212 5566 </div>
                </div>
            </div>
            <div className={styles.item}>
                <ul className={styles.list}>
                    <Link href="/" passHref>
                        <li className={styles.listItem}>Ana Sayfa</li>
                    </Link>
                    <Link href="/Pizzas" passHref>
                        <li className={styles.listItem}>Pizzalar </li>
                    </Link>
                    <li className={styles.listItem}>Menü</li>
                    <Image src="/img/saturn.png" alt="" width="140" height="69" />
                    <li className={styles.listItem}>Haberler</li>
                    <li className={styles.listItem}>Blog</li>
                    <li className={styles.listItem}>İletişim</li>
                </ul>
            </div>
            <Link href="/Cart" passHref>
                <div className={styles.item}>
                    <div className={styles.cart}>
                        <Image src="/img/cart.png" alt="" width="30" height="30" />
                        <div className={styles.counter}>{totalQuantity}</div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default Navbar