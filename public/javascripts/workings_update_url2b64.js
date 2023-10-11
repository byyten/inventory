// update original inventory to localhost/ed downloaded images
products.forEach(p=> {
  p.thumbnail = p.thumbnail.replace(/\//g,".").replace('https:..i.dummyjson.com.data.', "/images/").replace("products","product")    
  p.images = p.images.map(pi => pi = pi.replace(/\//g,".").replace('https:..i.dummyjson.com.data.', "/images/").replace("products","product")  )
}) 

products[0].thumbnail
products[0].images


// 
read = (prod) => {
  	let id = prod.id
  	let url = "http://localhost:3000" + prod.thumbnail  
  fetch(url).then(r=> r.blob()).then(blob => {  
    let i = new Image()
    i.id = id
    i.url = url
    var reader  = new FileReader();
    reader.onload = function onload(evt)  {
      i.src = evt.target.result
      i.setAttribute('data-id', i.id)
      i.setAttribute('data-url', i.url)
      div.appendChild(i)
    } 
  	reader.readAsDataURL(blob)
  })
}


read = (id, url, div) => {
  fetch(url).then(r=> r.blob()).then(blob => {  
    let i = new Image()
    i.id = id
    i.url = url
    var reader  = new FileReader();
    reader.onload = function onload(evt)  {
      i.src = evt.target.result
      i.setAttribute('data-id', i.id)
      i.setAttribute('data-url', i.url)
      div.appendChild(i)
    } 
    reader.readAsDataURL(blob)
  })
}










let div = document.createElement('div')

for (product of products.slice(0,3)) {
  let pdiv = document.createElement('div')
  pdiv.id= "p" + product.id
  div = pdiv
  read(product)
}

m = div.querySelectorAll('img')
div.innerHTML

