'use strict';

//This tool offers a simple way of creating animation for pour application

//You can set a priority so that elements have an animation ordered
//Several elements can have the same priority

//List of animation are on the _animations function

import React from 'react';
import _ from 'lodash';

export default class Animation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            animation: this.props.animation,
            styles: this.props.styles,
            priorityAnimations: [],
            normalAnimations: [],
        };
    };

    componentWillUnmount() {
        document.getElementById(this.props.childId).removeEventListener('transitionend', this._transitionEnd.bind(this));
    };

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    };

    componentDidMount() {

        document.getElementById(this.props.childId).addEventListener('transitionend', this._transitionEnd.bind(this));

        if(!_.isEmpty(this.props.animation['load'])){
            this._setLoadInitialStyle();

            let interval = setInterval(function() {
                if(document.readyState === 'complete') {
                    clearInterval(interval);
                    this._onLoadAnimate();
                }
            }.bind(this), 100);
        }
    };

    _onLoadAnimate(){
        this._animate(true);
    }

    _setLoadInitialStyle(){
        this.props.animation['load'].forEach(function(element){
            if(element.animation[0]=="fadeIn"){
                this._setInitialStyles(element);
            }
        }.bind(this));
    }

    //call by user on event FIRST CALL TO ACTION
    _animate(load){
        if(load){
            let load = this._animatePriority(this._findKeyDeeply(this.props.animation['load']));

            if(!load){
                this._animateOverplus();
            }
            return;
        }

        //check if there are animations with priority
        let event = this._animatePriority(this._findKeyDeeply(this.props.animation['event']));

        //Animate remaining animations if no priority exist
        //if priority exist this is called on transitionEnd Event;
        if(!event){
            this._animateOverplus();
        }
    }

    _animateOverplus(){
        let finalTransition = '';
        this.state.normalAnimations.forEach(function(element) {

            element.animation.forEach(function(value){
                document.getElementById(this.props.childId).className += ' '+ value;
                let comma=',';

                finalTransition += this._animations(value) + comma;
            });

            this._setStyles(element);

        }.bind(this));

        finalTransition=finalTransition.substring(0, finalTransition.length - 1);
        document.getElementById(this.props.childId).style.transition = finalTransition;
    }

    _findKeyDeeply(objectArray){
        let animationsPriority = [];
        let normalAnimations = [];

        _.forEach(objectArray, function (element, index) {
            if(typeof element.priority !== 'undefined'){
                let elementIndex = (element.priority - 1);
                if(!_.isEmpty(animationsPriority)){
                    element = this._convergeAnimations(animationsPriority, element);
                }
                animationsPriority.splice(elementIndex,0, element);
            }else{
                normalAnimations.push(element);
            }
        }.bind(this));

        if(!_.isEmpty(animationsPriority)){
            this.state.normalAnimations = normalAnimations;
            this.state.priorityAnimations = animationsPriority;
            return(animationsPriority);
        }
        return null;
    }

    //used to join animations with same level of priority if they exist
    _convergeAnimations(animationsPriority, testElement){
        let resultElement =testElement;
        _.forEach(animationsPriority, function (element, index) {
            if (typeof element != 'undefined'){
                if(element.priority===testElement.priority){
                    resultElement.animation = element.animation.concat(testElement.animation);
                    resultElement.style = _.merge(element.style,testElement.style);
                    resultElement.transition = element.transition;
                }
            }
        }.bind(this));

        return resultElement;
    }

    _animatePriority(objectArray){
        if (_.isEmpty(objectArray))
            return null;
        let finalTransition = "";

        objectArray[0].animation.forEach(function(value){
            document.getElementById(this.props.childId).className += ' '+ value;

            let comma=',';

            finalTransition += this._animations(value) + comma;

        }.bind(this));

        this._setStyles(objectArray[0]);

        finalTransition=finalTransition.substring(0, finalTransition.length - 1);
        document.getElementById(this.props.childId).style.transition =  finalTransition;

        return true;
    }

    _transitionEnd(){
        //Because we do not want this state to force re-Render, we give it values like so
        let objectArray= this.state.priorityAnimations;
        objectArray.shift();

        if(!_.isEmpty(objectArray)){

            document.getElementById(this.props.childId).className += ' '+ objectArray[0].animation;
            this._setStyles(objectArray[0]);
            document.getElementById(this.props.childId).style.transition =  this._animations(objectArray[0].animation);
        }else{
            this._animateOverplus();
        }
    }

    _setStyles(element){
        _.forIn(element.style, function(value, key) {
            document.getElementById(this.props.childId).style[key] = value;
        }.bind(this));
    }

    _setInitialStyles(element){
        _.forIn(element.initialStyle, function(value,   key) {
            document.getElementById(this.props.childId).style[key] = value;
        }.bind(this));
    }

    _animations(key){
        let animations =
        {
            fadeIn: {
                transition: "opacity 2000ms ease-in-out"
            },
            resizeAnim : {
                transition: "width 1200ms ease-in-out, height 1200ms ease-in-out"
            }
        };

        return animations[key].transition;
    }

};

Animation.propTypes = {
    animation: React.PropTypes.object,
    styles: React.PropTypes.object,
    childId: React.PropTypes.string,
};

Animation.defaultProps = {
    animation: [],
    styles: {},
    childId:  ""
};

