import { products, addToCartBtn, buyBtn, price, count } from "./js/refs";
import { openModal } from "./js/modal";
import { CART_PRODUCT_LS_KEY, WISHLIST_PRODUCT_LS_KEY } from "./js/constants";
import { getProduct } from "./js/products-api";
import { updateNavCount, renderCardsList, deleteFromList } from "./js/helpers";
import { onBuy } from "./js/handlers";



loadCartlistPage(CART_PRODUCT_LS_KEY);

products.addEventListener('click', openModal);
addToCartBtn.addEventListener('click', deleteCard);
buyBtn.addEventListener('click', onBuy);

function deleteCard() {
    deleteFromList(CART_PRODUCT_LS_KEY, loadCartlistPage);
}


async function loadCartlistPage() {
    updateNavCount(CART_PRODUCT_LS_KEY);
    updateNavCount(WISHLIST_PRODUCT_LS_KEY);
    const wishlist = JSON.parse(localStorage.getItem(CART_PRODUCT_LS_KEY)) || [];
    let totalPrice = 0;


    if (wishlist.length === 0) {
        price.textContent = 0;
        count.textContent = 0;
        products.innerHTML = '<li><h2>Кошик порожній.</h2></li>';
        return;
    }

    try {
        const wishProducts = await Promise.all(
            wishlist.map(({ id, price }) => {
                totalPrice += price;
                return getProduct(id)
            })
        );

        renderCardsList(wishProducts, products);
        updateNavCount(CART_PRODUCT_LS_KEY);
        updateNavCount(WISHLIST_PRODUCT_LS_KEY);
        price.textContent = +totalPrice.toFixed(2);
        count.textContent = wishlist.length;


    } catch (error) {
        console.error('Не вдалося завантажити список кошику:', error);
    }
}



