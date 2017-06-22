'use strict';

import React from 'react';

import BoronModal from 'boron/OutlineModal';
import {Button,Row, Column, Icon} from 'react-foundation';
import Entities from 'html-entities';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            componentRendered: false
        };
    };

    componentWillMount() {
        document.addEventListener('keydown', this._handleKey.bind(this), false);
    };


    componentWillUnmount() {
        document.removeEventListener('keydown');
    };

    render() {
        let entities = new Entities.AllHtmlEntities();

        return (
            <BoronModal onHide={this._hideModalCallback.bind(this)} onShow={this._showModalCallback.bind(this)} id = "modal" className="modal" ref="modal">
                   <section className="modal__content">
                    <div className="modal__content-top">
                        <span className="modal__content-top-thumb">{this.props.thumbnail}</span>
                        <h1 className="modal__content-top-title">{this.props.title}</h1>
                    </div>
                    <div className="modal__content-description">{entities.decode(this.props.description)}</div>
                    {/*<div className="modal__content-button">*/}
                        {/*<Row>*/}
                            {/*<Column centerOnLarge>*/}
                                {/*<Button onClick={this._hideModal.bind(this)}>Fechar</Button>*/}
                            {/*</Column>*/}
                        {/*</Row>*/}
                    {/*</div>*/}
                </section>
            </BoronModal>
        );
    };


    _showModal(){
        this.refs.modal.show();
    };

    _showModalCallback(){
        this.setState({componentRendered:true});
    };

    _hideModal(){
        this.refs.modal.hide();
        this.props.onClose();
    };

    _hideModalCallback(){
        this.setState({componentRendered:false});
    };

    _handleKey(event) {
        // if(this.state.componentRendered){
        //     if (event.keyCode === 13) {
        //         this._hideModal();
        //     }
        // }
    };
};
Modal.propTypes = {
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    onClose: React.PropTypes.func,
    thumbnail: React.PropTypes.string
};

Modal.defaultProps = {
    title: "I am a Title",
    description:"I am a Warning/Description"
};
