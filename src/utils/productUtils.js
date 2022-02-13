const config = require("../../config");

const handleSearchResponse = (data) => {
    const productList = data.results.map(
        (product) => mapProductItem(product)
    );

    const productCategorieList = data.filters.find((w) => w.id === 'category');
    const categories = productCategorieList === undefined ? []:
        productCategorieList.values.map(w => w.name);

    return {
        items: productList,
        categories: categories
    };
}

const mapProductItem = (product) => {
    return  {
        id: product.id,
        title: product.title,
        picture: product.thumbnail,
        condition: product.condition,
        freeShipping: product.shipping.free_shipping,
        price: {
            currency: product.currency_id,
            amount: product.price
        }
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
    appendSignature
}