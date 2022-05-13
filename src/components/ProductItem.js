import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { Context } from "./../index"
import { PRODUCT_ROUTE } from "../utils/consts"

const ProductItem = observer(({ product }) => {
    const { cart, favorite } = useContext(Context)
    const history = useHistory()
    const [updateState, setUpdateState] = useState(false)
    const [updateFavorite, setUpdateFavorite] = useState(false)
    const dataFavorite = favorite.checkFavorite(product)
    const btnFavoriteAdd = (dataFavorite) ? dataFavorite.status : false

    const addFavorite = () => {
        favorite.setFavorite(product)
        setUpdateFavorite(!updateFavorite)
    }
    const addCart = () => {
        cart.setCart(product)
        setUpdateState(!updateState)
    }

    return (
        <>
            <div className="product-preview">
                <div className="row m-0 w-100">
                    <div className="col-5 col-sm-12 col-md-12 p-0">
                        <a onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id)}>
                            <img key={product.id} src={(product.image) ? process.env.REACT_APP_API_URL + '/products/' + product.image : '/images/no-image.jpg'} effect="blur" />
                        </a>
                    </div>
                    <div className="col-7 col-sm-12 col-md-12 pl-2 pe-0 p-md-0">
                        <a onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id)}>
                            <h5>{product.title}</h5>
                        </a>
                        <div className="ingredients">{(product.mini_description) ? product.mini_description : product.description}</div>
                        <div className="row m-0 justify-content-between align-items-center">
                            <div className="col p-0 d-none d-md-block">
                                <div className="price mb-2 mb-md-0">
                                    <div className="sec-font d-flex flex-wrap flex-row-reverse flex-md-row align-items-center">
                                        <span className="fw-6 fs-15 align-middle">{(product.groupModifiers) ? 'от ' + product.price : product.price} ₽</span>
                                        {product.sale && product.sale > 0 ? <span className="gray-3 text-decoration-line-through align-middle me-1 me-md-0 ms-1">{product.sale} ₽</span> : null}
                                    </div>
                                </div>
                            </div>
                            <div className="col p-0">
                                <div className="add-to-cart">
                                    <button type="button" className="add-prod d-none d-md-block" onClick={() => (product.groupModifiers) ? history.push(PRODUCT_ROUTE + '/' + product.id) : (!updateState) ? addCart() : ''}>{updateState ? 'Добавлено' : (product.groupModifiers) ? 'Выбрать' : 'Добавить'}</button>
                                    <button type="button" className="add-prod d-block d-md-none" onClick={() => (product.groupModifiers) ? history.push(PRODUCT_ROUTE + '/' + product.id) : (!updateState) ? addCart() : ''}>{updateState ? 'Добавлено' : (product.groupModifiers) ? 'от ' + product.price + ' ₽' : product.price + ' ₽'}</button>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btn-icon favorite" onClick={addFavorite} data-state={btnFavoriteAdd ? 'on' : 'off'} ></button>
                    </div>
                </div>
            </div>
        </>
    )
})

export default ProductItem
