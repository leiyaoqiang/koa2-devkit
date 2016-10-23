import React from 'react';

// a functional component using a ES2015 (ES6) arrow function:
// const Aquarium = (props) => {
// 	const fish = props.species;
// 	return <div>{ fish }</div>
// }

// or with a destructuring and a implicit return, simply:
const Aquarium = ({ species }) => (<div>{ species }</div>);

export default Aquarium;