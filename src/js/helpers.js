import { products, notFound } from "./refs";
import { productsCardMarkup } from "./render-function";
import { CART_PRODUCT_LS_KEY, WISHLIST_PRODUCT_LS_KEY } from "./constants";
import { getProductById } from "./products-api";
import { closeModal } from "./modal";

export function renderCardsList(items) {
    products.innerHTML = productsCardMarkup(items);

    if (!items.length) {
        notFound.classList.add('not-found--visible');
    } else {
        notFound.classList.remove('not-found--visible');
    }
}

export function clearFilterBtn() {
    document.querySelectorAll('.categories__btn').forEach(btn =>
        btn.classList.remove('categories__btn--active')
    );
}

export function updateNavCount(key) {
    const countElement = document.querySelector(`[data-${key}-count]`);
    const items = JSON.parse(localStorage.getItem(key)) || [];
    countElement.textContent = items.length;
}


export async function deleteFromList(key, loadlistPage) {
    {
        const wishlist = JSON.parse(localStorage.getItem(key)) || [];

        try {
            const wishProducts = await Promise.all(
                wishlist.map(({ id }) => getProductById(id))
            );

            renderCardsList(wishProducts, products);
            updateNavCount(key);

        } catch (error) {
            console.error('Не вдалося завантажити список бажаного:', error);
        }

        loadlistPage();
        closeModal();

    }
}


export function hidden(products) {
    const loadMoreBtn = document.querySelector('.load-more-btn');


    const { skip, limit, total } = products;

    if (skip + limit < total) {
        loadMoreBtn.classList.remove('is-hidden');
    } else {
        loadMoreBtn.classList.add('is-hidden');

    }
}