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

}

// storage class
class Storage{
    
}

document.addEventListener("DOMContentLoaded",()=>{
    const ui = new UI();
    const products = new Products();
    // get all products
    products.getProducts().then(products => console.log(products));
})