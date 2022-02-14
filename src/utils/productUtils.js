const config = require("../../config");

const handleSearchResponse = (data) => {
    let categoryName = "";
    const categories = [];
    const productList = data.results.map(
        (product) => mapProductItem(product)
    );
    const productCategoryList = data.results.map((w) => w.category_id);
    const categoriesList = data.filters.find((w) => w.id === 'category').values;

    if (productCategoryList == undefined) { categories = []; }
    else {
        productCategoryList.forEach(category => {
            categoryName = categoriesList.find(p => p.id == category).name;

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
        });
    }
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

module.exports = {
    handleSearchResponse,
    mapProductItem,
    appendSignature,
    mapCategories
}