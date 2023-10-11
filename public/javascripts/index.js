function loadfile(evt) {
    console.log(evt.target.name)
    let file
    let field
    let owner = evt.target.name
    if (owner === "thumbnail_image") {
        file = document.forms[0].thumbnail_image.files[0]
        field = document.forms[0].thumbnail 
    } else if (owner = "product_images") {
        file = document.forms[0].product_images.files[0]
        field = document.forms[0].images
    }

    var reader  = new FileReader();
    reader.onload = function(evt)  {
        let src = evt.target.result
        let i = new Image()
        i.src = src
        i.height="100"
        i.style = "margin:0.2rem"
        i.onclick = remove_image

        if (owner === "thumbnail_image") {
            field.value = (src)
            document.forms[0].querySelector("#div_" + owner).innerHTML = ""
            document.forms[0].querySelector("#div_" + owner).appendChild(i)    
        } else {
            if (field.value.at(-1) !== ",") field.value += ","
            field.value += ( src + ",")
            document.forms[0].querySelector("#div_" + owner).appendChild(i)    
            console.log(field.value)
            console.log(field.value.length)
        }
        
        // var image = document.forms[0].img
        // // the result image data
        
        // image.src = evt.target.result;
        // image.cloneNode(true)
    }
    reader.readAsDataURL(file);
}

let remove_image = (evt) => {
    src = evt.target.src
    yn = confirm("Remove this image from the product catalogue?")
    if (yn) {
        console.log(document.forms[0].images.value.length)
        let owner = evt.target.parentNode.id.slice(4) 
        // let parent = evt.target.parentNode
        let imgs = evt.target.parentNode // document.querySelector('#div_product_images')
        imgs.removeChild(evt.target)
        if (owner === "product_images") {
            document.forms[0].images.value = Array.from(imgs.children).map(img => img.src).toString()
            console.log(document.forms[0].images.value.length)
        } else if (owner === "thumbnail_image") {

            document.forms[0].thumbnail.value = ""
        }
    }
}
if (document.forms[0]) {
    document.forms[0].querySelector('#thumbnail_image').onchange = loadfile
    document.forms[0].querySelector('#product_images').onchange = loadfile
    form.querySelectorAll('img').forEach(i => i.addEventListener('click', (evt)=> { remove_image(evt) }))
}


let readURL = (prod) => {
    let id = prod.id
    let url = prod.thumbnail  
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
      i.id = url.slice(8).replace(/\./g,"_").replace("_jpg","")
      i.url = url
      i.fn = i.url.slice(i.url.lastIndexOf("/")+1)
      i.size = blob.size
      i.type = blob.type
      var reader  = new FileReader();
      reader.onload = function onload(evt)  {
        i.src = evt.target.result
        i.setAttribute('data-id', i.id)
        i.setAttribute('data-url', i.url)
        i.setAttribute('data-fn', i.fn)
        i.setAttribute('data-size', i.size)
        i.setAttribute('data-type', i.type)
        div.appendChild(i)
      } 
      reader.readAsDataURL(blob)
    })
  }
  

/*

    div = document.createElement('div')
    for (product of products.slice(0,3)) {
        readURL(product)
    }


// div.#
    img.thumb.#
    img.images.#






read = (prod) => {
  	let id = prod.id
  	let url = prod.thumbnail  
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
let mdiv = document.createElement('div')

for (product of products.slice(0,3)) {
  let pdiv = document.createElement('div')
  pdiv.id= "p" + product.id
  div = pdiv
  read(product)
}












*/





















/*
    divs = document.forms[0].querySelectorAll('div')
    images_views = divs[2]
    thumb_view = divs[1]


    document.forms[0].image.onchange = (evt) => {
        var file = document.forms[0].image.files[0]
        var reader  = new FileReader();
        // it's onload event and you forgot (parameters)
        reader.onload = function(e)  {
            var image = document.forms[0].img
            // the result image data
            image.src = e.target.result;
            i = new Image()
    i.src = image.src
    i.height="100"
        i.style = "margin:0.1rem"
        document.forms[0].images.value += "," + image.src
    images_views.appendChild(i)
        
        }
        // you have to declare the file loading
    reader.readAsDataURL(file);

    }




products

srcs = []

function readload(evt, id, url, size, type)  {
  src = evt.target.result
  srcs.push({ id:id, url:url, size:size, type:type, src:src })
}

reader  = new FileReader();
reader.onload = readload


resp = await fetch(products[10].thumbnail)
blob = await resp.blob()
src = await reader.readAsDataURL(blob)

b64 = {
  
}



prod = products[3]
p = await readImage(prod)
console.log(srcs)


async function readImage(prod) {
  _resp = await fetch(prod.thumbnail);
  _blob = await _resp.blob();
  reader.readAsDataURL(_blob)
}

    
    //await reader.readAsDataURL(_blob);
  return {
    id: prod.id,
    title: prod.title,
    thumbnail: _src,
    size: _blob.size,
    type: _blob.type
  }
}


















// ------------------------------------------------















const promise = new Promise(resolve => {
            reader.onload = function (e) {
                var img = document.createElement("img");
                img.onload = function (event) {
                    // Dynamically create a canvas element
                    var canvas = document.createElement("canvas");
                    
                    // var canvas = document.getElementById("canvas");
                    var ctx = canvas.getContext("2d");

                    // Actual resizing
                    ctx.drawImage(img, 0, 0, 300, 300);

                    // Show resized image in preview element
                    canvas.toBlob(blob => {
                        newFile = blob; 
                        console.log(newFile) 
                        resolve();
                    });
                    
                }
                img.src = e.target.result;
            }
    });

    reader.readAsDataURL(file);

    await promise;

    console.log(newFile)















await new Promise((resolve, reject) => {
  return reader.readAsDataURL(_blob)
})








let src

    reader.onload = function readload(evt)  {
        src = evt.target.result
    }

reader.readAsDataURL(res)
console.log(src)
{
  id: products[0].id,
  url: products[0].thumbnail,
  src: src
}


url = products[0].thumbnail

async readurl = (url) => {
  resp = await fetch(url)
  blob = await resp.blob()
  src = await 
}







async readUrl = (url) => {
  resp = await fetch(url)
  blob = await resp.blob()
  src = await reader.readAsDataURL(blob)
  return src
  
}



*/










