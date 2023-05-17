// error with cartItem being undefiend and i dont know how to fix it
// Storage.getProduct(id) === undef
// when ID is being passed into the methods it is being passed as undefiend?

// variables
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
            console.log(result);
            let data = await result.json();
            // products is every item in the JSON 
            let products = data.items;
            products = products.map(item => {
                const { title , price } = item.fields;
                const { id } = item.sys;
                const image = item.fields.image.fields.file.url;
                
                return {title,price,id,image};
            });
            

            // the error appears to be here
            // cannot call specifc values from the array
            console.log(products.id)
            return products;
           
        } catch (error) {
            console.log(error);
        }
    }
}

// display product
class UI {
    // passes this method product data
    async displayProducts(products) {
        let result = '';
       // dynamically adds elements to the page from the JSON file
       products.forEach(product => {
            result +=` 
            <div id="product">
                <div class="col-sm-6">
                    <div class="card border-warning text-dark">
                
                        <img class="card-img-top" src=${product.image} alt="Item 1 " >
                        <h3 class="card-title">${product.title}</h3>
                        <div class="card-body text-center">
                        <p class="card-text">£${product.price}</p>
                        <button class="bag-btn btn-primary" data-id=${product.id}>Add To Basket</button>
                        <p>${product.id}</p>
                        <br><br>
                    </div>
                </div>
            </div>
        </div>
            `;    
        });
        
        productsDOM.innerHTML = result;
    }

    getBagButtons(){
        const buttons = [...document.querySelectorAll(".bag-btn")];
        console.log(buttons)
        buttons.forEach(button => {
            // THIS ID IS BEING SET TO UNDEFINED
            let id = button.dataset.id;
            console.log(id);
            let inCart = cart.find(item => item.id === id);
            if (inCart){
                button.innerText = "In Cart";
                button.disable = true;
            }    

            button.addEventListener("click", (event)=>{
                event.target.innerText = "In Cart";
                event.target.disabled = true;
                
                // get products from products based on ID
                let cartItem = {...Storage.getProduct(id),
                amount:1};
                console.log(cartItem)

                 // add the product to cart
                 cart = [...cart, cartItem];

                // save cart in LS
                Storage.saveCart(cart)
                // set values
                this.setCartValues(cart);
                    // display cart item
                    // show the cart
                })
        });
    }
    setCartValues(cart){
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item =>{
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        })
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2))
        cartItems.innerText = itemsTotal;
        console.log(cartTotal, cartItems);
    }
}

// storage class
class Storage{
    static saveProducts(products){
        localStorage.setItem("products" , JSON.stringify(products))
    }
    static getProduct(id){
        // returns my array
        let products = JSON.parse(localStorage.getItem('products'));
        console.log(products)
        // products.id and id are undefined

        return products.find(product => product.id === id);
    }
    static saveCart(cart){
        localStorage.setItem('cart',JSON.stringify(cart))
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

