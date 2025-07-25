import { updateNavCount } from "./helpers";
import { getProduct } from "./products-api";

export async function toggleStorageItem(productId, key, button, label) {
    let items = JSON.parse(localStorage.getItem(key)) || [];
    const index = items.findIndex(({ id }) => id === productId);

    if (index === -1) {
        try {
            const product = await getProduct(productId)
            items.push(product);
            localStorage.setItem(key, JSON.stringify(items));
            button.textContent = `Remove from ${label}`;
            updateNavCount(key);
        }
        catch (error) {
            console.log(error.message);

        }

    } else {
        items = items.filter(({ id }) => id !== productId);
        localStorage.setItem(key, JSON.stringify(items));
        button.textContent = `Add to ${label}`;
        updateNavCount(key);
    }

}