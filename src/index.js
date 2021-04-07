import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DragAndDrop from './App.jsx'



ReactDOM.render(
  <div>
    <div id="header">
      <h2>Drag and Drop Krivine Machine Evaluator</h2>
      <h3>Instructions</h3>
      <ul>
        <li>Create a lambda application, abstraction or variable node by dragging and dropping the three boxes on the right onto the canvas</li>
        <li>Connect the terms together to create a lambda expression by dragging and dropping connections between them</li>
        <li>Make sure that the created expression is in head-normal form</li>
        <li>Click the evaluate button to calculate the weak head normal form</li>
        <li>Scroll down to see the Krivine machine steps</li>
      </ul>
    </div>
    <DragAndDrop />
  </div>
  ,
  document.getElementById('root')
);

