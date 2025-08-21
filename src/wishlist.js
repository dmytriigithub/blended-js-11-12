//Логіка сторінки Wishlist

import { WISHLIST_PRODUCT_LS_KEY, CART_PRODUCT_LS_KEY } from "./js/constants";
import { products, addToWishlistBtn } from "./js/refs";
import { openModal } from "./js/modal";
import { updateNavCount, deleteFromList, renderCardsList } from "./js/helpers";
import { getProductById } from "./js/products-api";



loadWishlistPage(WISHLIST_PRODUCT_LS_KEY);

products.addEventListener('click', openModal);
addToWishlistBtn.addEventListener('click', deleteCard);


function deleteCard() {
    deleteFromList(WISHLIST_PRODUCT_LS_KEY, loadWishlistPage);
}

export async function loadWishlistPage() {
    updateNavCount(CART_PRODUCT_LS_KEY);
    updateNavCount(WISHLIST_PRODUCT_LS_KEY);
    const wishlist = JSON.parse(localStorage.getItem(WISHLIST_PRODUCT_LS_KEY)) || [];

    if (wishlist.length === 0) {
        products.innerHTML = '<li><h2>Список бажаного порожній.</h2></li>';
        return;
    }

    try {
        const wishProducts = await Promise.all(
            wishlist.map(({ id }) => getProductById(id))
        );

        renderCardsList(wishProducts, products);
        updateNavCount(CART_PRODUCT_LS_KEY);
        updateNavCount(WISHLIST_PRODUCT_LS_KEY);

    } catch (error) {
        console.error('Не вдалося завантажити список бажаного:', error);
    }
}