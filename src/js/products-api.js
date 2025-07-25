import axios from 'axios';
import { limit, currentPage } from './constants';


// 1. https://dummyjson.com/docs/products - документація бекенду, розділ продукти
// 2. https://dummyjson.com/products?limit=10&skip=10 - отримати всі продукти з пагінацією
// 3. https://dummyjson.com/products/1 - отримати один продукт по ID
// 4. https://dummyjson.com/products/search?q=nail - пошук продукту по ключовому слову
// 5. https://dummyjson.com/products/category-list - отримати список категорій продуктів
// 6. https://dummyjson.com/products/category/smartphones - отримати продукти по категорії



export const getCategoryList = async (url) => {
    const response = await axios.get(url);
    return response.data;
}

export const getProducts = async (url, category = '', currentPage = 1) => {

    const response = await axios.get(`${url}/${category}`, {
        params: {
            limit,
            skip: (currentPage - 1) * limit
        }
    })
    console.log(response.data);  //-------------------log

    return response.data;
}

export const getProduct = async (id) => {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
}

export const getProductBySearch = async (url, q) => {

    const response = await axios.get(url, {
        params: {
            q,
            limit,
            skip: (currentPage - 1) * limit
        }
    })

    return response.data;
}
