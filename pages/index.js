import axios from 'axios'
import Head from 'next/head'
import Featured from '@/components/Featured'
import ProductList from '@/components/ProductList'
import { useState } from 'react'
import AddButon from '@/components/AddButon'
import Add from '@/components/Add'

export default function Home({ productList, admin }) {
  const [close, setClose] = useState(true)

  return (
    <>
      <Head>
        <title>Satürn Pizza</title>
        <meta name="description" content="Şehrin en galaktik pizzacısı" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButon setClose={setClose} />}
      <ProductList productList={productList} />
      {!close && <Add setClose={setClose} />}
    </>
  )
}


export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get("https://food-ordering-app-fawn.vercel.app/api/products")
  return {
    props: {
      productList: res.data,
      admin,
    },
  }

}