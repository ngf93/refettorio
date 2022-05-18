import React, { useContext } from "react"
import { observer } from "mobx-react-lite"
import { Context } from "../index"
import ProductItem from "./ProductItem"
import { Element } from "react-scroll"

const ProductList = observer(() => {
    const { product } = useContext(Context)

    return product.products && product.products.map(category => {

        return <>
            <Element name={category.item.id} className="element">
                <h2 className="mb-4">{category.item.title}</h2>
            </Element>
            <div className="row row-cols-sm-3 row-cols-xl-4 gx-3 gy-3 g-md-4">
                {
                    category.products.map(product => <ProductItem key={product.id} product={product} />)
                }
                {
                    category.subProducts && category.subProducts.map(product => product.map(subproduct => <ProductItem key={product.id} product={subproduct} />))
                }

            </div>
        </>
    })
});

export default ProductList