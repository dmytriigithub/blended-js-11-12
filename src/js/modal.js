import { getProductById } from "./products-api";
import { modal, modalProduct, modalCloseBtn, addToCartBtn, addToWishlistBtn } from "./refs";
import { productModalMarkup } from "./render-function";
import { CART_PRODUCT_LS_KEY, WISHLIST_PRODUCT_LS_KEY } from "./constants";
import { toggleStorageItem } from "./storage";

modalCloseBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
});

export let currentProductId = null;

export async function openModal(event) {
    const target = event.target;
    const parent = target.closest(".products__item");
    if (!parent) return;

    currentProductId = +parent.dataset.id;


    try {
        const product = await getProductById(currentProductId);

        modalProduct.innerHTML = productModalMarkup(product);
        modal.classList.add("modal--is-open");

        updateButtonState(addToCartBtn, CART_PRODUCT_LS_KEY, "Cart");
        updateButtonState(addToWishlistBtn, WISHLIST_PRODUCT_LS_KEY, "Wishlist");

        document.addEventListener("keydown", handleEscKey);

        addToCartBtn.addEventListener("click", handleCartToggle);
        addToWishlistBtn.addEventListener("click", handleWishlistToggle);

    } catch (error) {
        console.log(error.message);

    }
}

export function closeModal() {
    modal.classList.remove("modal--is-open");
    modalProduct.innerHTML = "";

    document.removeEventListener("keydown", handleEscKey);
    addToCartBtn.removeEventListener("click", handleCartToggle);
    addToWishlistBtn.removeEventListener("click", handleWishlistToggle);
}

function handleEscKey(event) {
    if (event.key === "Escape") {
        closeModal()
    };
}


function updateButtonState(button, key, type) {
    const list = JSON.parse(localStorage.getItem(key)) || [];
    const inStorage = list.some(({ id }) => id === currentProductId);
    button.textContent = inStorage ? `Remove from ${type}` : `Add to ${type}`;
}


function handleCartToggle() {
    toggleStorageItem(currentProductId, CART_PRODUCT_LS_KEY, addToCartBtn, "Cart");
}


export function handleWishlistToggle() {
    toggleStorageItem(currentProductId, WISHLIST_PRODUCT_LS_KEY, addToWishlistBtn, "Wishlist");
}