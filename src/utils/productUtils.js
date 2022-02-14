const config = require("../../config");

const handleSearchResponse = (data) => {
    const productList = data.results.map(
        (product) => mapProductItem(product)
    );
    
    const categories = getSearchMainCategory(productList, data);
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

///Search the main category from product results
const getSearchMainCategory = (productList, searchResult) => {
    const categoriesOcurrence = getSearchCategoriesWithOcurrence(productList);

    if(categoriesOcurrence.length === 0) {
        return []
    }

    categoriesOcurrence.sort((a,b) => b.count - a.count);

    const categoriesList = searchResult.filters.length > 0
    ? searchResult.filters.find((w) => w.id === 'category').values
    : searchResult.available_filters.length > 0
        ? searchResult.available_filters.find((w) => w.id === 'category').values
        : [];    

    if(categoriesList.length === 0) {
        return [];
    }
    
    const mostRepeatedCategory = categoriesList.find(
        w => w.id == categoriesOcurrence[0].categoryId
    );

    if(mostRepeatedCategory === undefined) {
        return [];
    }

    return mostRepeatedCategory.path_from_root.map(w => {
        return {
            title: w.name
        }   
    });    
}

///
const getSearchCategoriesWithOcurrence = (productList) => {
    const categoriesOcurrence = [];

    productList.forEach(element => {
       if(categoriesOcurrence.find(w => w.categoryId === element.category_id) === undefined)  {
           categoriesOcurrence.push({
               categoryId: element.category_id,
               count: productList.reduce((n, product) => {
                   return n + (product.category_id === element.category_id)
               }, 0)
           });
       }
    });

    return categoriesOcurrence;
}

module.exports = {
    handleSearchResponse,
    mapProductItem,
    appendSignature,
    mapCategories
}