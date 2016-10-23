'use strict';
import React, { Component } from 'react';

export default class Hello extends Component {
	constructor (props, context) {
		super(props, context);
	}

	render () {
		return <h1>Hello {this.props.name}</h1>
	}
}