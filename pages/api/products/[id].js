import dbConnect from "../../../utils/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { method, query: { id }, cookies } = req;

  const token = cookies.token;

  dbConnect();

  if (method === 'GET') {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json(error)
    }
  }
  if (method === 'PUT') {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Admin Girişi Gerekli!!!")
    }
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      })
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json(error)
    }
  }
  if (method === 'DELETE') {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Admin Girişi Gerekli!!!")
    }
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json("Ürün silindi!")
    } catch (error) {
      res.status(500).json(error);
    }
  }

}

