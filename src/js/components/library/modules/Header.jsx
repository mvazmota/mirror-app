import React from 'react';
import {Row, Column, Icon, Button} from 'react-foundation';

export default class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Row className="display">
                <Column className="headerTitle" small={8} medium={9} large={9}>Biblioteca de Vídeos</Column>
                <Column className="headerIcons" small={4} medium={3} large={3}>
                    <div className="ulHeader">
                        <div>Ver Televisão: 0</div>
                    </div>
                </Column>
            </Row>
        );
    };
};

Header.propTypes = {};

Header.defaultProps = {};