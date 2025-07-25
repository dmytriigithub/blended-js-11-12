export function categoriesItemMarkup(arr) {
    return arr.map(item => `
        <li class="categories__item">
            <button class="categories__btn" type="button">${item}</button>
        </li>
        `).join('');
}


export function productsCardMarkup(arr) {
    return arr.map(({ id, title, thumbnail, brand, category, price }) => `
        <li class="products__item" data-id="${id}">
            <img class="products__image" src="${thumbnail}" alt="${title}"/>
            <p class="products__title">${title}</p>
            <p class="products__brand"><span class="products__brand--bold">Brand:</span>${brand}</p>
            <p class="products__category">Category: ${category}</p>
            <p class="products__price">Price: ${price}$</p>
        </li>
        `).join('');
}


export function productModalMarkup({ title, images, description, shippingInformation, returnPolicy, price, tags }) {
    const tagsList = tags.map(item => `
        <li class="modal-product__tags-item">${item}</li>
        `).join('');

    return `
        <img class="modal-product__img" src="${images[0]}" alt="${title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${title}</p>
        <ul class="modal-product__tags">${tagsList}</ul>
        <p class="modal-product__description">${description}</p>
        <p class="modal-product__shipping-information">Shipping: ${shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
        <p class="modal-product__price">Price: ${price}$</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>
        `;
}





