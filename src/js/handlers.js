import { getProducts, getProductBySearch } from "./products-api";
import { PRODUCTS_CATEGORY_LIST_URL, PRODUCTS_LIST_URL, PRODUCT_SEARCH_URL, CART_PRODUCT_LS_KEY } from "./constants";
import { renderCardsList, clearFilterBtn } from "./helpers";

//Home

export async function handlerCategoriesFilter(event) {
    const target = event.target;

    if (target.classList.contains('categories__btn--active')) return;

    const category = target.textContent.trim().toLowerCase();

    clearFilterBtn();

    try {
        const fetchData = category !== 'all'
            ? await getProducts(PRODUCTS_CATEGORY_LIST_URL, category)
            : await getProducts(PRODUCTS_LIST_URL);

        renderCardsList(fetchData.products);
        target.classList.add('categories__btn--active');

    } catch (error) {
        console.error("Помилка:", error);
    }


}

export async function handlerClearInput(form) {
    clearFilterBtn()
    form.reset();

    try {
        const data = await getProducts(PRODUCTS_LIST_URL)
        renderCardsList(data.products);

    } catch (error) {
        console.error("Помилка:", error);
    }
}


export async function handlerInputSearch(event) {
    event.preventDefault();
    clearFilterBtn();
    const form = event.target;
    const searchValue = form.elements.searchValue.value.trim().toLowerCase();

    if (!searchValue) {
        return;
    }

    try {
        const searchProducts = await getProductBySearch(PRODUCT_SEARCH_URL, searchValue);
        renderCardsList(searchProducts.products);
    } catch (error) {
        console.error("Помилка:", error);
    }

    form.reset();
}

export function onBuy() {
    const wishlist = JSON.parse(localStorage.getItem(CART_PRODUCT_LS_KEY)) || [];
    if (!wishlist.length) {
        alert('у кошику немає товарів');
    } else {
        alert('успішне придбання товарів');
    }

}

