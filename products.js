
fs = require("fs")

products = JSON.parse(fs.readFileSync("./products.json", "utf8"))

prod =  {
    id: 30,
    title: "Key Holder",
    description: "Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality",
    price: 30,
    discountPercentage: 2.92,
    rating: 4.92,
    stock: 54,
    brand: "Golden",
    category: "home-decoration",
    thumbnail: "https://i.dummyjson.com/data/products/30/thumbnail.jpg",
    images: [Array]
  }


categories = Array.from(new Set(products.products.map(p=>p.category)))

categories = [
    {"name":"smartphones"},
    {"name":"laptops"},
    {"name":"fragrances"},
    {"name":"skincare"},
    {"name":"groceries"},
    {"name":"home-decoration"}
  ]