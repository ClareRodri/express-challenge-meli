const config = require("../../config");

const handleSearchResponse = (data) => {
    const productList = data.results.map(
        (product) => mapProductItem(product)
    );
    const productCategoryList = data.results.map((w) => w.category_id);

   
    const categoriesList = data.filters.length > 0
        ? data.filters.find((w) => w.id === 'category').values
        : data.available_filters.length > 0
            ? data.available_filters.find((w) => w.id === 'category').values
            : [];

    const categories = getCategoriesWeight(productCategoryList, categoriesList);
    return {
        categories: categories,
        items: productList,
    };
}

const mapProductItem = (product) => {
    return  {
        id: product.id,
        title: product.title,
        picture: product.thumbnail,
        condition: product.condition,
        category_id: product.category_id,
        freeShipping: product.shipping.free_shipping,
        city_address: product.address ? product.address.city_name || '' : '',
        price: {
            currency: product.currency_id,
            amount: product.price
        }
    }
}

const mapCategories = (category) => {
    return {
        id: category.id,
        title: category.name
    }
}

const appendSignature = (responseModel) => {
    return {
        author: {
            name: config.signature.name,
            lastName: config.signature.lastName
        },
        ...responseModel
    };
}

const getCategoriesWeight = (productCategoryList, categoriesList) => {
    let categories = [];
    let categoryName = '';
    let categoryMatch = '';
    let indxCategoria = 0;

    if (productCategoryList == undefined || productCategoryList.length == 0 || categoriesList.length == 0) { categories = []; }
    else {
        productCategoryList.forEach(category => {
            categoryMatch = categoriesList.find(p => p.id == category)
            if (categoryMatch != undefined) {
                categoryName = categoryMatch.name;
                if (categories.length > 0) {
                    indxCategoria = categories.findIndex(p => p.id == category);
                    if (indxCategoria > -1) {
                        categories[indxCategoria] = {
                            id: category,
                            title: categoryName,
                            count: (categories[indxCategoria].count + 1)
                        }
                        return;
                    }
                }
                categories.push({
                    id: category,
                    title: categoryName,
                    count: 1
                });
            }
        });
    }
    return categories;
}

module.exports = {
    handleSearchResponse,
    mapProductItem,
    appendSignature,
    mapCategories
}