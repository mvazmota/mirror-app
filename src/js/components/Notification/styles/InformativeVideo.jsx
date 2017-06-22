'use strict';

import React from 'react';
import _ from 'lodash';
import {Row, Column, Icon, Button} from 'react-foundation';

export default class InformativeVideo extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {

        let content = !this.props.smallNot ?
            <Row>
                <Column medium={2} large={2} className="asgie_image">
                    <img src={this.props.asgieImage} />
                </Column>

                <Column className="description" medium={6} large={6}>

                    <span className="description-asgie">
                        {
                            _.truncate(this.props.description, {
                                'length': 67,
                                'separator': /,? +/
                            })
                        }
                    </span>
                </Column>

                <Column  medium={4} large={4} className="instruction">
                    <div>
                        Para ver <img src={require("../../../../assets/images/icons/control_small_a.png")}/>
                    </div>
                </Column>
            </Row>
            :
            <Row>
            <Column large={6} className="asgie_image">
                <img src={this.props.asgieImage} />
            </Column>

            <Column  large={6} className="instruction">
                <div>
                    <img src={require("../../../../assets/images/icons/control_small_a.png")}/>
                </div>
            </Column>
        </Row>;

        return (
            <div className="notification__content-informativeVideo">
                {content}
            </div>
        );
    };


};
InformativeVideo.propTypes = {
    description: React.PropTypes.string,
    asgieImage: React.PropTypes.string,
    smallNot: React.PropTypes.bool
};
