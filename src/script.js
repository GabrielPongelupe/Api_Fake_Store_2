let products = document.querySelector('.products');
let carrinhoLista = document.getElementById('carrinho-lista');
let response
let quantidade = []


document.addEventListener('DOMContentLoaded', function () {
    const carrinhovazio = 1


    async function fetchProducts(url) {

        try {
            let data = await fetch(url);
            response = await data.json();

            console.log(response)

            for (let i = 0; i < response.length; i++) {
                quantidade[i] = 0

                let descricao = response[i].description;
                let titulo = response[i].title;
                products.innerHTML += `
       <div class="product">
           <img src=" ${response[i].image} " alt="" class="product-img">
           <div class="product-content">
           <a href="#"><h2 onclick="detalhes(event)" id="${i}" class="product-title">${titulo.length > 18 ? titulo.substring(0, 18).concat(' ...') : titulo
                    }</h2></a>
           <h4 class="product-category"> <strong>${response[i].category}</strong> </h4>
           <p class="product-description">${descricao.length > 80
                        ? descricao.substring(0, 80).concat(`<span class="more"> ...more </span>`)
                        : descricao
                    }</p>
           <div class="product-price-container">
               <h3 class="product-price">$${response[i].price}</h3>
               <a  onclick="atualizacarrinho(event)" href="#!" class="add-to-cart"  key="${i}" id="${i}"><ion-icon name="cart-outline"></ion-icon></a>
           </div>
           </div>
          
       </div>
       `;
            }
        } catch (err) {
            console.log(err);
        }
    }
    fetchProducts('https://fakestoreapi.com/products');


});





const cards = document.querySelectorAll(".product")
const filterElement = document.querySelector("input[type='search']")

filterElement.addEventListener('input', filterCards)

function filterCards() {


    if (filterElement.value != '') {
        products.innerHTML = ""

        for (let i = 0; i < 20; i++) {
            let title = response[i].title.toLowerCase();
            let filterText = filterElement.value.toLowerCase()

            if (title.includes(filterText)) {
                let descricao = response[i].description;
                let titulo = response[i].title;
                products.innerHTML += `
       <div class="product">
           <img src=" ${response[i].image} " alt="" class="product-img">
           <div class="product-content">
           <a href="#"><h2 onclick="detalhes(event)" id="${i}" class="product-title">${titulo.length > 18 ? titulo.substring(0, 18).concat(' ...') : titulo
                    }</h2></a>
           <h4 class="product-category"> <strong>${response[i].category}</strong> </h4>
           <p class="product-description">${descricao.length > 80
                        ? descricao.substring(0, 80).concat(`<span class="more"> ...more </span>`)
                        : descricao
                    }</p>
           <div class="product-price-container">
               <h3 class="product-price">$${response[i].price}</h3>
               <a  onclick="atualizacarrinho(event)" href="#!" class="add-to-cart" key="${i}" id="${i}"><ion-icon name="cart-outline"></ion-icon></a>
           </div>
           </div>
          
       </div>
       `;
            }




        }

    } else {
        products.innerHTML = ""

        for (let i = 0; i < 20; i++) {
            let title = response[i].title.toLowerCase();
            let filterText = filterElement.value.toLowerCase()


            let descricao = response[i].description;
            let titulo = response[i].title;
            products.innerHTML += `
       <div class="product">
           <img src=" ${response[i].image} " alt="" class="product-img">
           <div class="product-content">
           <a href="#"><h2 onclick="detalhes(event)" id="${i}" class="product-title">${titulo.length > 18 ? titulo.substring(0, 18).concat(' ...') : titulo
                }</h2></a>
           <h4 class="product-category"> <strong>${response[i].category}</strong> </h4>
           <p class="product-description">${descricao.length > 80
                    ? descricao.substring(0, 80).concat(`<span class="more"> ...more </span>`)
                    : descricao
                }</p>
           <div class="product-price-container">
               <h3 class="product-price">$${response[i].price}</h3>
               <a onclick="atualizacarrinho(event)" class="add-to-cart" key="${i}" id="${i}"><ion-icon name="cart-outline"></ion-icon></a>
           </div>
           </div>
          
       </div>
       `;





        }
    }
}


let quantidadeTotal
let carrinhoquant = document.getElementById("quantidadecima")
let totalInner = document.getElementById("total")
let carrinho = document.getElementById("carrinho_container")
let total = 0;
let numeroitens = 0

function atualizacarrinho(event) {
    const elementId = event.currentTarget.id;


    quantidade[elementId]++
    for (let i = 0; i < response.length; i++) {
        const idAtual = response[i].id


        if (idAtual == elementId && quantidade[elementId] == 1) {


            carrinho.innerHTML += `<div>${elementId} -- ${quantidade[elementId]}</div>`;
        }

    }

    console.log(quantidade[elementId])
    innerCarrinho()

    total = 0
}



function innerCarrinho() {

    carrinhoquant.innerHTML = ``
    quantidadeTotal = 0
    carrinho.innerHTML = ``
    total = 0
    for (let i = 0; i < response.length; i++) {

        if (quantidade[i] > 0) {

            quantidadeTotal += quantidade[i]
            total += response[i].price * quantidade[i]
            carrinho.innerHTML += `
            <div class="fs-4 mb-4">
    <div class="row  border border-dark p-0">

      <img class="carrinho_img col-5" src="${response[i].image}" alt="">

      <div class="col-7 dir">
        <ul class="mt-4">
          <li>
            <h5>${response[i].title}</h5>
          </li>
          <li>${response[i].price}</li>
          <li class="mb-3">___________________________________________________________________________________________</li>
          <li class="preço pb-2">Quantidade: <button onclick="quantidadeMenos(event)" id="menos" class="${i}"> - </button><span
              class="fw-bolder border border-dark py-0 px-2 rounded-3"> ${quantidade[i]}</span> <button onclick="quantidademais(event)" id="mais" class="${i}">+</button>
          </li>
          <li class="menos_quant">
            <div onclick="qunatidadeZero(event)" class="${i}">
              <a class="fw-bolder border border-dark rounded-3 x">X</a>
            </div>
          </li>
      </div>
      </ul>
    </div>
  </div>`


        }
    }
    carrinhoquant.innerHTML = `${quantidadeTotal}`
    totalInner.innerHTML = `Número de itens: <span class="border border-dark bg-danger text-white px-2 py-0 pb-1 rounded-5">${quantidadeTotal}</span><br>total: $${total}`
    console.log("o TOTAL É: " + total)

}

function quantidadeMenos(event) {
    const idMenos = event.currentTarget.className;

    quantidade[idMenos]--
    console.log(idMenos)

    innerCarrinho()

    total = 0
}

function qunatidadeZero(event) {
    const idAgora = event.currentTarget.className;
    quantidade[idAgora] = 0
    console.log(idAgora)

    innerCarrinho()

    total = 0
}

function quantidademais(event) {
    const idNow = event.currentTarget.className;

    quantidade[idNow]++
    console.log(idNow)

    innerCarrinho()

    total = 0
}



let tipo = document.getElementById("tipos")
function pesquisarapida() {
    products.innerHTML = ``
    if (tipo.value != "Tipo" && tipo.value != "Qualquer um") {
        for (let i = 0; i < response.length; i++) {
            quantidade[i] = 0

            let descricao = response[i].description;
            let titulo = response[i].title;
            if (tipo.value == response[i].category) {
                products.innerHTML += `
           <div class="product">
               <img src=" ${response[i].image} " alt="" class="product-img">
               <div class="product-content">
               <a href="#"><h2 onclick="detalhes(event)" id="${i}" class="product-title">${titulo.length > 18 ? titulo.substring(0, 18).concat(' ...') : titulo
                    }</h2></a>
               <h4 class="product-category"> <strong>${response[i].category}</strong> </h4>
               <p class="product-description">${descricao.length > 80
                        ? descricao.substring(0, 80).concat(`<span class="more"> ...more </span>`)
                        : descricao
                    }</p>
               <div class="product-price-container">
                   <h3 class="product-price">$${response[i].price}</h3>
                   <a  onclick="atualizacarrinho(event)" href="#!" class="add-to-cart"  key="${i}" id="${i}"><ion-icon name="cart-outline"></ion-icon></a>
               </div>
               </div>
              
           </div>
           `;
            }
        }
    } else {
        for (let i = 0; i < response.length; i++) {
            quantidade[i] = 0

            let descricao = response[i].description;
            let titulo = response[i].title;

            products.innerHTML += `
           <div class="product">
               <img src=" ${response[i].image} " alt="" class="product-img">
               <div class="product-content">
               <a href="#"><h2 onclick="detalhes(event)" id="${i}" class="product-title">${titulo.length > 18 ? titulo.substring(0, 18).concat(' ...') : titulo
                }</h2></a>
               <h4 class="product-category"> <strong>${response[i].category}</strong> </h4>
               <p class="product-description">${descricao.length > 80
                    ? descricao.substring(0, 80).concat(`<span class="more"> ...more </span>`)
                    : descricao
                }</p>
               <div class="product-price-container">
                   <h3 class="product-price">$${response[i].price}</h3>
                   <a  onclick="atualizacarrinho(event)" href="#!" class="add-to-cart"  key="${i}" id="${i}"><ion-icon name="cart-outline"></ion-icon></a>
               </div>
               </div>
              
           </div>
           `;

        }
    }


}

function detalhes(event) {
    const idtitle = event.currentTarget.id
    console.log(idtitle)
    products.innerHTML = ``
    for (let i = 0; i < response.length; i++) {
        if (idtitle == i) {
            let descricao = response[i].description;
            let titulo = response[i].title;
            products.innerHTML = `
            <div class="product">
                <img src=" ${response[i].image} " alt="" class="product-img">
                <div class="product-content">
                <a href="#"><h2 onclick="detalhes(event)" id="${i}" class="product-title">${titulo.length > 18 ? titulo.substring(0, 18).concat(' ...') : titulo
                }</h2></a>
                <h4 class="product-category"> <strong>${response[i].category}</strong> </h4>
                <p class="product-description">${descricao.length > 80
                    ? descricao.substring(0, 80).concat(`<span class="more"> ...more </span>`)
                    : descricao
                }</p>
                
                <p class="fs-4"><strong> Rating:</strong>  ${response[i].rating.rate}<br></p>
                
                <p class="fs-4 mt-0 mb-5"><strong>Número de avaliações:</strong> ${response[i].rating.count} avaliações <br></p>
                <p class="fs-4"><strong>Id:</strong> ${response[i].id} <br></p>
                <div class="product-price-container">
                    <h3 class="product-price">$${response[i].price}</h3>
                    
                    
                    <a  onclick="atualizacarrinho(event)" href="#!" class="add-to-cart"  key="${i}" id="${i}"><ion-icon name="cart-outline"></ion-icon></a>
                </div>
                </div>
               
            </div>
            `;
        }
    }
}