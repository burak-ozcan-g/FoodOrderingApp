import Add from '@/components/Add'
import AddButon from '@/components/AddButon'
import ProductList from '@/components/ProductList'
import axios from 'axios'
import React, { useState } from 'react'

export default function Pizzas({ productList, admin }) {
  const [close, setClose] = useState(true)
  return (
    <>
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

  const res = await axios.get("https://food-ordering-app-fawn.vercel.app//api/products")
  return {
    props: {
      productList: res.data,
      admin,
    },
  }

}
