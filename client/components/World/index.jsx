'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

class World extends React.Component {
	render () {
		return <h2>World</h2>
	}
}

ReactDOM.render(<World />, document.getElementById('world'));