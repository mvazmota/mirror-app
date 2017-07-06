'use strict';

import React from 'react';
import {Row, Column, Icon, Button} from 'react-foundation';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
                <ReactCSSTransitionGroup
                        component="div"
                        transitionName="fade"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}
                        transitionAppear={true}
                        transitionAppearTimeout={1000}
                    >
                    <Row className="display-shopping">
                        <img className="img" src={require("../../assets/images/icons/tasks/compras.png")} />
                        Lista Compras <span className="eva">EVA</span>
                    </Row>
                    <Row>
                   <table className="table"><tr className="tr">{shoppingHTML}</tr></table>
                    </Row>
                </ReactCSSTransitionGroup>
            </div>
        );
    };

};

