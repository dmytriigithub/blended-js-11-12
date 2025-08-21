//Логіка сторінки Home
import { CART_PRODUCT_LS_KEY, WISHLIST_PRODUCT_LS_KEY } from "./js/constants";
import { categories, products, searchForm, searchFormBtnClear, loadMoreBtn } from "./js/refs";
import { categoriesItemMarkup, productsCardMarkup } from "./js/render-function";
import { getCategoryList, getProducts } from "./js/products-api";
import { handlerCategoriesFilter, handlerInputSearch, handlerClearInput, onLoadMore } from "./js/handlers";
import { openModal } from "./js/modal";
import { updateNavCount, hidden } from "./js/helpers";

updateNavCount(CART_PRODUCT_LS_KEY);
updateNavCount(WISHLIST_PRODUCT_LS_KEY);

categories.addEventListener('click', handlerCategoriesFilter);
searchForm.addEventListener('submit', handlerInputSearch);
products.addEventListener('click', openModal);
loadMoreBtn.addEventListener('click', onLoadMore);

searchFormBtnClear.addEventListener('click', (event) => {
    if (event.target === searchFormBtnClear) {
        const form = document.querySelector('.search-form');
        handlerClearInput(form);
    }
});

initHomePage();

async function initHomePage() {
    try {
        const categoryList = await getCategoryList();
        const allCategories = ['All', ...categoryList];
        categories.insertAdjacentHTML('beforeend', categoriesItemMarkup(allCategories));
    } catch (error) {
        console.log("Помилка при отриманні категорій:", error);
    }

    initProducts();
}

async function initProducts() {

    try {
        const productsList = await getProducts();
        products.insertAdjacentHTML('beforeend', productsCardMarkup(productsList.products));
        hidden(productsList);
    } catch (error) {
        console.log("Помилка при отриманні продуктів:", error);
    }
}