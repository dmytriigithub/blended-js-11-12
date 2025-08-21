import { getProducts, getProductsByCategory, getProductBySearch } from "./products-api";
import { CART_PRODUCT_LS_KEY, currentPage } from "./constants";
import { renderCardsList, clearFilterBtn, hidden } from "./helpers";
import { products } from "./refs";
import { productsCardMarkup } from "./render-function";

//Home

let page = currentPage;
let search = '';

export async function handlerCategoriesFilter(event) {
    const target = event.target;

    if (target.classList.contains('categories__btn--active')) return;

    const category = target.textContent.trim().toLowerCase();
    page = 1;

    clearFilterBtn();

    try {
        const fetchData = category !== 'all'
            ? await getProductsByCategory(category)
            : await getProducts();

        renderCardsList(fetchData.products);
        hidden(fetchData);
        target.classList.add('categories__btn--active');

    } catch (error) {
        console.error("Помилка:", error);
    }


}

export async function handlerClearInput(form) {
    clearFilterBtn()
    form.reset();
    page = 1;

    try {
        const data = await getProducts()
        renderCardsList(data.products);
        search = '';
        hidden(data);

    } catch (error) {
        console.error("Помилка:", error);
    }
}


export async function handlerInputSearch(event) {
    event.preventDefault();
    clearFilterBtn();
    const form = event.target;
    const searchValue = form.elements.searchValue.value.trim().toLowerCase();
    page = 1;

    if (!searchValue) {
        return;
    }

    try {
        const searchProducts = await getProductBySearch(searchValue);
        renderCardsList(searchProducts.products);
        hidden(searchProducts);
        search = searchValue;
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

export async function onLoadMore() {
    page++;
    const category = [...document.querySelectorAll('.categories__btn')].find(btn =>
        btn.classList.contains('categories__btn--active')
    );

    console.log(category);




    if (category) {
        const categoryValue = category.textContent.trim().toLowerCase();

        try {
            const fetchData = categoryValue !== 'all'
                ? await getProductsByCategory(categoryValue, page)
                : await getProducts(page);

            products.insertAdjacentHTML('beforeend', productsCardMarkup(fetchData.products));
            hidden(fetchData);

        } catch (error) {
            console.error("Помилка:", error);
        }

    } else if (search) {
        try {

            const searchProducts = await getProductBySearch(search, page);
            products.insertAdjacentHTML('beforeend', productsCardMarkup(searchProducts.products));
            hidden(searchProducts);

        } catch (error) {
            console.error("Помилка:", error);
        }

    } else {
        try {

            const fetchData = await getProducts(page);
            products.insertAdjacentHTML('beforeend', productsCardMarkup(fetchData.products));
            hidden(fetchData);

        } catch (error) {
            console.error("Помилка:", error);
        }
    }
}

