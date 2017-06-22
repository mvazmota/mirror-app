'use strict';

import React from 'react';

import {Row, Column, Icon, Button} from 'react-foundation';

export default class Channel extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <Row>
                <Column>
                    <div className="notification__content-top">
                        <span className="notification__content-top-thumb_c">
                            {this.props.thumbnail}
                        </span>
                    </div>
                </Column>

                <Column>
                    <div className="notification__content-action">
                        <div className="notification__content-channel">
                            {this.props.channel}
                        </div>
                    </div>
                </Column>
            </Row>
        );
    };

};
Notification.propTypes = {
    thumbnail: React.PropTypes.string,
    channel: React.PropTypes.number
};
