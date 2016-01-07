import './main.css'
import React from 'react'
import { render } from 'react-dom'
import Root from './containers/root.jsx'

main();

function main() {
    let root = document.createElement('div');
    document.body.appendChild(root);
    render(<Root />, root);
}