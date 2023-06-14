import Head from 'next/head'
import Featured from '@/components/Featured'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Satürn Pizza</title>
        <meta name="description" content="Şehrin en galaktik pizzacısı" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <div className={styles.container} >
        <h1 className={styles.title}>ŞEHRİN EN İYİ PİZZASI</h1>
        <p className={styles.desc}>
          Şehrin her yerinden kolaylıkla ulaşabileceğiniz en sevdiğiniz pizzaci.
          Sizlere sunduğumuz unutamayacağınız lezzetlerimizin her zaman arkasındayız.
        </p>
      </div>
    </>
  )
}
