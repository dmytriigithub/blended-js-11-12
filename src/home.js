//Логіка сторінки Home
import { CATEGORY_LIST_URL, PRODUCTS_LIST_URL, CART_PRODUCT_LS_KEY, WISHLIST_PRODUCT_LS_KEY, currentPage } from "./js/constants";
import { categories, products, searchForm, searchFormBtnClear, loadMoreBtn } from "./js/refs";
import { categoriesItemMarkup, productsCardMarkup } from "./js/render-function";
import { getCategoryList, getProducts } from "./js/products-api";
import { handlerCategoriesFilter, handlerInputSearch, handlerClearInput } from "./js/handlers";
import { openModal } from "./js/modal";
import { updateNavCount } from "./js/helpers";

let page = currentPage;
updateNavCount(CART_PRODUCT_LS_KEY);
updateNavCount(WISHLIST_PRODUCT_LS_KEY);

categories.addEventListener('click', handlerCategoriesFilter);
searchForm.addEventListener('submit', handlerInputSearch);
products.addEventListener('click', openModal);

searchFormBtnClear.addEventListener('click', (event) => {
    if (event.target === searchFormBtnClear) {
        const form = document.querySelector('.search-form');
        handlerClearInput(form);
    }
});

initHomePage();

async function initHomePage() {
    try {
        const categoryList = await getCategoryList(CATEGORY_LIST_URL);
        const allCategories = ['All', ...categoryList];
        categories.insertAdjacentHTML('beforeend', categoriesItemMarkup(allCategories));
    } catch (error) {
        console.log("Помилка при отриманні категорій:", error);
    }

    initProducts()
}

async function initProducts(currentPage) {

    try {
        const productsList = await getProducts(PRODUCTS_LIST_URL, '', currentPage);
        products.insertAdjacentHTML('beforeend', productsCardMarkup(productsList.products));
    } catch (error) {
        console.log("Помилка при отриманні продуктів:", error);
    }
}

console.log(currentPage);


loadMoreBtn.addEventListener('click', () => {
    page += 1;
    initProducts(page)

})
