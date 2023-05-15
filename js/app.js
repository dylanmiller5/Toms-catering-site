// variables
console.log("workign")
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const  clearCartBtn= document.querySelector('.clear-btn');
const cartDOM = document.querySelector('.cart');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
//this might cause an error later 
const productsDOM= document.querySelector('.products-center');

// cart 
let cart = [];
// buttons 
let buttonsDOM = [];

// getting the products
class Products{
    async getProducts(){
        try {
            let result = await fetch('products.json');
            let data = await result.json();
            let products = data.items;
            products = products.map(item => {
                const { title , price } = item.fields;
                const { id } = item.sys
                const image = item.fields.image.fields.file.url;
                return {title,price,id,image};
            });
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}

// display product
class UI {
    async displayProducts(products) {
        console.log(products)
        let result = '';
       // dynamically adds elements to the page from the JSON file
       products.forEach(product => {
            result +=` 
             <div class="col-sm-6">
            <div class="card border-warning text-dark">
                
                <img class="card-img-top" src=${product.image} alt="Item 1 " >
                <h3 class="card-title">${product.title}</h3>
                <div class="card-body text-center">
                <p class="card-text">£${product.price}</p>
                <button class="bag-btn btn-primary data-id=${product.id}">Add To Basket</button>
                <br><br>
                </div>
            </div>
    </div>
            `;    
        });

        productsDOM.innerHTML = result;
    }
    getBagButtons(){
        const buttons = [...document.querySelectorAll(".bag-btn")];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if (inCart){
                button.innerText = "In Cart";
                button.disable = true;
            }         
            button.addEventListener("click", (event)=>{
                event.target.innerText = "In Cart";
                event.target.disabled = true;
                // get products from products based on ID
                let cartItem =Storage.getProducts(id)
                console.log(cartItem)
                    // add the product to cart
                    // save cart in LS
                    // set values
                    // display cart item
                    // show the cart
                })
        });
    }
}

// storage class
class Storage{
    static saveProducts(products){
        localStorage.setItem("products", JSON.stringify(products))
    }
    static getProducts(id){
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();
    
    // get all products
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(() => {
        ui.getBagButtons();
    });
});
