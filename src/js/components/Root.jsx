'use strict';

import React from 'react';

export default class Root extends React.Component {
    render() {
        return (
            <section className="mainLayout">
                {this.props.children}
            </section>
        );
    };
};
