import Warship from '../../models/warship';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';
export const SET_SHIPS = 'SET_SHIPS';

export const toggleFavorite = (id) => {
    return { type: TOGGLE_FAVORITE, shipId: id };
};

export const setFilters = filterSettings => {
    return { type: SET_FILTERS, filters: filterSettings };
};

export const fetchProducts = () => {
    return async dispatch => {
        // any async code you want!
        const response = await fetch(
            'https://warship-guide.firebaseio.com/ships.json'
        );

        const resData = await response.json();
        const loadedProducts = [];

        for (const key in resData) {
            loadedProducts.push(
                new Warship(
                    key,
                    'u1',
                    resData[key].title,
                    resData[key].categoryIds,
                    resData[key].name,
                    resData[key].year,
                    resData[key].nationality,
                    resData[key].description,
                    resData[key].gunCaliber,
                    resData[key].speed,
                    resData[key].power,
                    resData[key].displacement,
                    resData[key].beltArmor,
                    resData[key].image,
                    resData[key].destroyed,
                    resData[key].isWW1EraShip
                )
            );

        }

        dispatch({ type: SET_SHIPS, products: loadedProducts });
    };
};

export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        // any async code you want!
        const response = await fetch(
            'https://warship-guide.firebaseio.com/ships.json',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                    price
                })
            }
        );

        const resData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                title,
                description,
                imageUrl,
                price
            }
        });
    };
};