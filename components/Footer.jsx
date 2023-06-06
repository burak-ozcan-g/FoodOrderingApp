import Image from 'next/image'
import styles from '../styles/Footer.module.css'

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <Image src="/img/bg.png" alt='' fill={true} />
            </div>
            <div className={styles.item} >
                <div className={styles.card} >
                    <h2 className={styles.motto} >
                        GALAKSININ EN SICAK PIZZASI AGZINIZA GELDI
                    </h2>
                </div>
                <div className={styles.card} >
                    <h1 className={styles.title} >RESTORANLARIMIZ</h1>
                    <p className={styles.text}>
                        Hürriyet Mahallesi Şeyh Edibali Bulvarı #304.
                        <br /> Kahramanmaraş, 46100
                        <br /> (344) 234-5678
                    </p>
                    <p className={styles.text}>
                        Belediye Evleri Mahallesi Turgut Özal Bulvarı #304.
                        <br /> Adana, 01360
                        <br /> (344) 234-5678
                    </p>
                    <p className={styles.text}>
                        Şehitduran Mahallesi Manisalı Alibey Caddesi  #304.
                        <br /> Adana, 01000
                        <br /> (344) 234-5678
                    </p>
                </div>
                <div className={styles.card} >
                    <h1 className={styles.title}>Çalışma Saatleri</h1>
                    <p className={styles.text}>
                        Pazartesi - Cuma
                        <br /> 8:00 - 23:00
                    </p>
                    <p className={styles.text}>
                        Cumartesi - Pazar
                        <br /> 12:00 - 22:00
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Footer