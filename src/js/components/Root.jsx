'use strict';

import React from 'react';
import PageTransition from 'react-router-page-transition';

export default class Root extends React.Component {
    render() {
        return (
            <section className="mainLayout">
                <PageTransition>
                    {this.props.children}
                </PageTransition>
            </section>
        );
    };
};
