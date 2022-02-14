const productService = require('../services/productService');
const { appendSignature } = require('../utils/productUtils');

const GetProducts = async(request, response, next) => {
    try {
        const queryParam = request.query.q;
        if(queryParam === undefined) {
            throw new Error('No search query found');
        }
        const query = await productService.searchProducts(queryParam);
        const responseModel = appendSignature(query);

        response.status(200).send(responseModel);
        next();
    }catch(error) {
        response.status(500).send(error);
    }
}

const GetProductDetail = async(request, response, next) => {
    try {
        const queryParam = request.params.id;
        if(queryParam === undefined) {
            throw new Error('No product id found');
        }
        const detailedInfo = await productService.getProductDetailedInfo(queryParam);
        const basicInfo = await productService.getProductBasicInfo(queryParam);
        const categoryInfo = await productService.getCategoryInfo(detailedInfo.category_id);
        if(detailedInfo === undefined) {
            throw new Error('Unexpected error');
        }

        const productModel = {
            item: {
                ...detailedInfo,
                category: categoryInfo,
                description: basicInfo.description
            }
        }

        const responseModel = appendSignature(productModel);

       // console.log("responseModel", responseModel);
        response.status(200).send(responseModel);
        next();
    }catch(error) {
        response.status(500).send(error);
    }
}

module.exports = {
    GetProducts,
    GetProductDetail
}
