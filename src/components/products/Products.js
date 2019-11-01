import React from 'react';

import './products.css';

const Products = (props) => {
    const { products, productIdError } = props;
    let productsHtml = [];
    productsHtml.push(
        <div className="label-row" key="label-row">
            <label className="product-label-text product-id-label" htmlFor={"Product Id"}>Product Id</label>
            <label className="product-label-text product-name-label" htmlFor={"Product Name"}>Product Name</label>
            <label className="product-label-text product-quantity-label" htmlFor={"Qty"}>Qty</label>
            <label className="product-label-text product-unit-price-label" htmlFor={"Unit Price"}>Unit Price</label>
            <label className="product-label-text product-total-price-label" htmlFor={"Total Price"}>Total Price</label>
            <label className="product-label-text product-notes-label" htmlFor={"Notes"}>Notes</label>
        </div>
    )
    products && products.length > 0 && products.map((product, index) => {
        productsHtml.push(
            <React.Fragment>
                <div className="product-row-pre">
                    <input type="text" className={`product-form-input product-id product-input-box`} id="productId" value={product.productId} value={product.productId} disabled={true} />
                    <input type="text" className={`product-form-input product-name product-input-box`} id="productName" value={product.productName} onChange={(e) => props.handleProductField(e, index)} />
                    <input type="text" className={`product-form-input product-quantity product-input-box`} id="quantity" value={product.quantity && !isNaN(product.quantity) ? product.quantity : ''} onChange={(e) => props.handleProductField(e, index)} />
                    <input type="text" className={`product-form-input product-unit-price product-input-box`} id="unitPrice" value={product.unitPrice && !isNaN(product.unitPrice) ? product.unitPrice : ''} onChange={(e) => props.handleProductField(e, index)} />
                    <input type="text" className={`product-form-input product-total-price product-input-box ${(product.totalPrice || (product.quantity && product.unitPrice)) ? 'disabled' : ''}`} id="totalPrice" value={(product.quantity && product.unitPrice && !isNaN(product.quantity) && !isNaN(product.unitPrice) ? product.quantity * product.unitPrice : '')} disabled={product.totalPrice || (product.quantity && product.unitPrice)} onChange={(e) => props.handleProductField(e, index)} />
                    <div className="product-input-box product-notes-input">
                        <textarea className="product-form-input product-notes" name="Notes" placeholder="Notes" id="notes" value={product.notes || ''} onChange={(e) => props.handleProductField(e, index)}></textarea>
                    </div>
                    <button className="product-delete-button product-button" id={`delete${product.productId}`} onClick={() => props.deleteProductRow(product.productId)}>Delete</button>
                </div>
                {productIdError && (productIdError === index) ? <div className="error-msg" id="error">Please fill all the info in the above product row and then only you can save. Only notes is optional.</div> : ''}
            </React.Fragment>
        )
    })
    return (
        <div className="products-box">
            {productsHtml}
            <button className="add-product-button product-button" onClick={props.addNewProductRow}>Add Product</button>
        </div>
    );
}

export default Products;

{/* <div className="product-row-pre">
    <div className="product-input-box product-id-input">
        <input type="text" className={`product-form-input product-id`} id={product.productId} value={product.productId} readonly={true} />
    </div>
    <div className="product-input-box">
        <input type="text" className={`product-form-input product-name`} id={product.productName} value={product.productName} />
    </div>
    <div className="product-input-box">
        <input type="text" className={`product-form-input product-quantity`} id={product.id} value={product.quantity} readonly={true} />
    </div>
    <div className="product-input-box">
        <input type="text" className={`product-form-input product-unit-price`} id={product.id} value={product.unitPrice} readonly={true} />
    </div>
    <div className="product-input-box">
        <input type="text" className={`product-form-input product-total-price`} id={product.id} value={product.totalPrice} readonly={true} />
    </div>
    <div className="product-input-box product-notes-input">
        <textarea className="product-form-input product-notes" name="Notes" placeholder="Notes" id="notes" value={product.notes}></textarea>
    </div>
</div> */}