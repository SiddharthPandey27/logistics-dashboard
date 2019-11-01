import React from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './form.css';

const Form = (props) => {
    const { billing_address, shipping_address, billingAddress, shippingAddress, billingIdError, shippingIdError, orderDate, expectedDate } = props;
    
    let billingHtml = [];
    billingHtml.push(
        <label className="label-text" htmlFor={"Billing Address"}>Billing Address</label>
    )
    billing_address && billing_address.length > 0 && billing_address.map((key, i) => {
        billingHtml.push(
            <div className="input-field">
                {key.id === "orderDate" ? <label className="label-text" htmlFor={"Ordered Date"}>Order Date</label> : ''}
                {key.id && key.id !== "orderDate" ? <input type="text" className="form-input" value={billingAddress[key.id]} id={key.id} placeholder={key.placeholder} onChange={props.handleBillingInput} /> : key.id && key.id === "orderDate" ? <DatePicker dateFormat="dd/MM/yyyy" placeholderText="20/10/2019" selected={orderDate} onChange={(date) => props.handleDate(date, "orderDate")} /> : '' }
                {(billingIdError && billingIdError.length > 0 && billingIdError.includes(key.id)) || (shippingIdError && shippingIdError.length > 0 && shippingIdError.includes(shipping_address[i].id)) 
                    ? 
                        <div>
                            <div className="error-msg input-field" id={`${key.id}-error-msg`}>
                                {billingIdError && billingIdError.length > 0 && billingIdError.includes(key.id) ? "Please fill the above field." : '' }
                            </div>
                        </div>
                    :
                    ""
                }
            </div>
        )
        return key;
    });

    let shippingHtml = [];
    shippingHtml.push(
        <label className="label-text" htmlFor={"Shipping Address"}>Shipping Address</label>
    )
    shipping_address && shipping_address.length > 0 && shipping_address.map((key, i) => {
        shippingHtml.push(
            <div className="input-field">
                {key.id === "expectedDate" ? <label className="label-text" htmlFor={"Expected Date"}>Order Date</label> : ''}
                {key.id && key.id !== "expectedDate" ? <input type="text" className="form-input" value={billingAddress[key.id]} id={key.id} placeholder={key.placeholder} onChange={props.handleBillingInput} /> : key.id && key.id === "expectedDate" ? <DatePicker dateFormat="dd/MM/yyyy" placeholderText="21/10/2019" selected={expectedDate} onChange={(date) => props.handleDate(date, "expectedDate")} /> : '' }
                {(billingIdError && billingIdError.length > 0 && billingIdError.includes(key.id)) || (shippingIdError && shippingIdError.length > 0 && shippingIdError.includes(key.id)) 
                    ? 
                        <div>
                            <div className="error-msg input-field" id={`${key.id}-error-msg`}>{shippingIdError && shippingIdError.length > 0 && shippingIdError.includes(key.id) ? "Please fill the above field." : ''}</div>
                        </div>
                    :
                    ""
                }
            </div>
        )
        return key;
    });

    return (
        <div className="form-box">
            <div className="billing-address">
                {billingHtml}
            </div>
            <div className="shipping-address">
                {shippingHtml}
            </div>
        </div>
    );
}

export default Form;