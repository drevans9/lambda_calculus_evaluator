import React from 'react';
import './App.css';
import { FlowChart, actions, REACT_FLOW_CHART } from "@mrblenny/react-flow-chart";
import { mapValues } from "lodash";
import graph from './Structures/Graph';
import abstraction from './Structures/Abstraction';
import variable from './Structures/Variable';
import application from './Structures/Application';


// C:\Users\danie\OneDrive\Programming\lambda_calculus_evaluator\node_modules\@mrblenny\react-flow-chart






class DragAndDrop extends React.Component {

  constructor(props) {
    super(props);
    this.state = graph;


  }


  render() {
    const graph = this.state;
    const stateActions = mapValues(actions, (func) => (...args) =>
      this.setState(func(...args)));


    return (
      <div>
        <div class="Sidebar">

          <div
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData(
                REACT_FLOW_CHART,
                JSON.stringify(application)
              )
            }
            class="DragBox"
            style={{ cursor: "grabbing" }}
          >
            Application
          </div>
          <div
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData(
                REACT_FLOW_CHART,
                JSON.stringify(abstraction)
              )
            }
            class="DragBox"
            style={{ cursor: "grabbing" }}

          >
            Abstraction
          </div>
          <div
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData(
                REACT_FLOW_CHART,
                JSON.stringify(variable)
              )
            }
            class="DragBox"
            style={{ cursor: "grabbing" }}

          >
            Variable
          </div>
          <button
            class="DeleteButton"
            onClick={() => stateActions.onDeleteKey({})}>
            Delete
          </button>
        </div>
        <div class="Flowchart">
          <FlowChart

            chart={graph}
            callbacks={stateActions}
            config={{
            }}

          />
        </div>
      </div>
    );
  }

}


export default DragAndDrop;




