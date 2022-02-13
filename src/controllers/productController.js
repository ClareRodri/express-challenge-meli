const { appendSignature } = require('../utils/productUtil');

const GetProducts = async(request, response, next) => {
    try {
        const queryParam = request.query.q;
        if(queryParam === undefined) {
            throw new Error('No search query found');
        }
        //const query = await productService.searchProducts(queryParam);
        const responseModel = appendSignature(query);

        response.status(200).send(responseModel);
        next();
    }catch(error) {
        response.status(500).send(error);
    }
}

module.exports = {
    GetProducts
}
