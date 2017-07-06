'use strict';

import React from 'react';
import {Row, Column, Icon, Button} from 'react-foundation';
import _ from 'lodash';

export default class Shopping extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentWillMount(){
        console.log(this.props.lists)
    }

    render() {
        console.log("shopping");

        let lists = this.props.lists;

        // let img = <img src={require("../../assets/images/icons/tasks/tasks.png")} />;
        let shoppingHTML = [];
        let productHTML = [];
        
        shoppingHTML.push (<Row></Row>);
        _.forEach(lists, (list, index) => {
             let productHTML = [];
             //productHTML.push (<Column></Column>);
            _.forEach(list.products, (product, index) => {
                productHTML.push (
                        <p key={`product_${index}`} className="row_product">- {product.title} x{product.quantity}</p>);
            });

            shoppingHTML.push (
                <th key={`list_${index}`} className="th">
                    {list.name}
                    <br />
                    {productHTML}
                </th>
                );
        });

        return (
            <div className="shopping">
                <Row className="display-shopping">
                    Lista Compras
                </Row>

               <table className="table"><tr className="tr">{shoppingHTML}</tr></table>
            </div>
        );
    };

};

