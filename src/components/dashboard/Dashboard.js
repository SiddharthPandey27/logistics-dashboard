import React, { Component } from 'react';

import Form from '../form/Form';
import Products from '../products/Products';
import preOrder from '../preOrder';
import './dashboard.css';

class Dashboard extends Component {

    state = {
        billingAddress: {},
        shippingAddress: {},
        products: [],
        productIdError: null,
        billingIdError: null,
        shippingIdError: null,
        orderDate: '',
        expectedDate: '',
    };

    componentDidMount() {
        const billingAddress = {
            firstName: '',
            lastName: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zipcode: '',
            country: '',
            orderDate: '',
        };
        const shippingAddress = {
            firstName: '',
            lastName: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zipcode: '',
            country: '',
            expectedDate: '',
        };
        this.setState({
            products: preOrder,
            billingAddress: billingAddress,
            shippingAddress: shippingAddress
        });
    }

    deleteProductRow = (productId) => {
        const { products } = this.state;
        let newProducts = products.filter(product =>  product.productId !== productId )
        this.saveProducts(newProducts);
    }

    addNewProductRow = () => {
        const { products } = this.state;
        const newProduct = {
            "productId": `10000${products.length + 1}`,
            "productName": "",
            "quantity": null,
            "unitPrice": null,
            "totalPrice": null,
            "notes": ""
        };
        newProduct.productId = Number(newProduct.productId);
        let newProducts = [...products];
        newProducts.push(newProduct);
        this.saveProducts(newProducts);
    }

    handleProductField = (e, index) => {
        let { products } = this.state;
        products[index][e.target.id] = e.target.value;
        products[index].totalPrice = products[index].quantity && products[index].unitPrice ? products[index].quantity * products[index].unitPrice : null;
        this.saveProducts(products);
    }

    saveProducts = (newProducts) => {
        this.setState({
            products: newProducts
        });
    }

    handleBillingInput = (e) => {
        let { billingAddress } = this.state;
        billingAddress[e.target.id] = e.target.value;
        this.setState({
            billingAddress: billingAddress
        });
    }

    handleShippingInput = (e) => {
        let { shippingAddress } = this.state;
        shippingAddress[e.target.id] = e.target.value;
        this.setState({
            shippingAddress: shippingAddress
        });
    }

    handleDate = (date, type) => {
        let { billingAddress, shippingAddress } = this.state;
        if (type === "orderDate") {
            billingAddress.orderDate = date;
            this.setState({
                orderDate: date,
                billingAddress: billingAddress
            });
        } else {
            shippingAddress.expectedDate = date;
            this.setState({
                expectedDate: date,
                shippingAddress: shippingAddress
            });
        }
    }

    productsValidated = () => {
        this.setState({
            productIdError: null,
        });
        const { products } = this.state;
        const keysToCheck = ["productName", "quantity", "unitPrice", "totalPrice"];
        let productIndex = null;
        products.map((product, index) => {
            keysToCheck.map((key) => {
                if (!product[key] && !productIndex) {
                    productIndex = index;
                    this.setState({
                        productIdError: index,
                    });
                }
            });
        });
        const productsValidated = !productIndex;
        return productsValidated;
    }

    billingAddressValidated = () => {
        this.setState({
            billingIdError: null
        });
        const { billingAddress } = this.state;
        const keysToCheck = Object.keys(billingAddress);
        const billingIdError = keysToCheck.filter((key) => !billingAddress[key] )
        if (billingIdError.length > 0) {
            this.setState({
                billingIdError: billingIdError
            });
        } else {
            return true;
        }
    }

    shippingAddressValidated = () => {
        this.setState({
            shippingIdError: null
        });
        const { shippingAddress } = this.state;
        const keysToCheck = Object.keys(shippingAddress);
        const shippingIdError = keysToCheck.filter((key) => !shippingAddress[key] )
        if (shippingIdError.length > 0) {
            this.setState({
                shippingIdError: shippingIdError
            });
        } else {
            return true;
        }
    }
    
    saveForms = () => {
        const billingAddressValidated = this.billingAddressValidated();
        const shippingAddressValidated = this.shippingAddressValidated();
        const allProductsValidated = this.productsValidated();
        let save = {};
        if (billingAddressValidated && shippingAddressValidated && allProductsValidated) {
            const { products, billingAddress, shippingAddress } = this.state;
            save = allProductsValidated ? Object.assign(save, { products: products, billingAddress: billingAddress, shippingAddress: shippingAddress }) : {};
            console.log("Saved object", save);
        }
    }

    render() {
        const { products, productIdError, billingAddress, shippingAddress, billingIdError, shippingIdError, orderDate, expectedDate } = this.state;
        const billing_address = [{id: "firstName", placeholder: "First Name"}, {id: "lastName", placeholder: "Last Name"}, {id: "addressLine1", placeholder: "Address Line 1"}, {id: "addressLine2", placeholder: "Address Line 2"}, {id: "city", placeholder: "City"}, {id: "state", placeholder: "State"}, {id: "zipcode", placeholder: "Zipcode"}, {id: "country", placeholder: "Country"}, {id: "orderDate", placeholder: "Order Date"}];
        const shipping_address = [{id: "firstName", placeholder: "First Name"}, {id: "lastName", placeholder: "Last Name"}, {id: "addressLine1", placeholder: "Address Line 1"}, {id: "addressLine2", placeholder: "Address Line 2"}, {id: "city", placeholder: "City"}, {id: "state", placeholder: "State"}, {id: "zipcode", placeholder: "Zipcode"}, {id: "country", placeholder: "Country"}, {id: "expectedDate", placeholder: "Expected Date"}];
        return (
            <div className="dashboard">
                <div className="form-section">
                    <Form 
                        billing_address={billing_address}
                        shipping_address={shipping_address}
                        billingAddress={billingAddress}
                        shippingAddress={shippingAddress}
                        handleBillingInput={this.handleBillingInput}
                        handleShippingInput={this.handleShippingInput}
                        billingIdError={billingIdError}
                        shippingIdError={shippingIdError}
                        orderDate={orderDate}
                        expectedDate={expectedDate}
                        handleDate={this.handleDate}
                    />
                </div>
                <div className="product-section">
                    <Products 
                        products={products}
                        saveProducts={this.saveProducts}
                        handleProductField={this.handleProductField}
                        deleteProductRow={this.deleteProductRow}
                        addNewProductRow={this.addNewProductRow}
                        productIdError={productIdError}
                    />
                    <div className="save-button-section">
                        <button 
                            className="product-button save-button" 
                            onClick={this.saveForms}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;