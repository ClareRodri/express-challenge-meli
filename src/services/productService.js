const axios = require('axios');
const config = require('../../config');
const { handleSearchResponse, mapProductItem } = require('../utils/productUtils');


const searchProducts = async(query) => {
    const defaultUrl = `${config.baseMLApiUrl}sites/MLA/search?q=${query}`;
    return await axios.get(defaultUrl)
    .then(function (response) {
        if(response.status !== 200) {
            throw new Error('Something wrong happenned');
        }

        return handleSearchResponse(response.data);
    })
    .catch(function (error) {
        return error;
    });
}

const getProductBasicInfo = async(productId) => {
    const defaultUrl = `${config.baseMLApiUrl}items/${productId}/description`;
    return await axios.get(defaultUrl)
    .then(function (response) {
        if(response.status !== 200) {
            throw new Error('Something wrong happenned');        
        }
        return {
            description: response.data.plain_text,
            snapshot: response.data.snapshot.url
        };
    })
    .catch(function (error) {
        return error;
    });
}

const getProductDetailedInfo = async(productId) => {
    const defaultUrl = `${config.baseMLApiUrl}items/${productId}`;
    return await axios.get(defaultUrl)
    .then(function (response) {
        if(response.status !== 200) {
            throw new Error('Something wrong happenned');        
        }

        return mapProductItem(response.data);
    })
    .catch(function (error) {
        return error;
    });
}


module.exports = {
    searchProducts,
    getProductBasicInfo,
    getProductDetailedInfo
}