import React from 'react';
import './App.css';
import { FlowChart, actions, REACT_FLOW_CHART } from "@mrblenny/react-flow-chart";
import { mapValues } from "lodash";
import graph from './Structures/Graph';
import abstraction from './Structures/Abstraction';
import variable from './Structures/Variable';
import application from './Structures/Application';
import NodeInnerHandler from './Structures/NodeInput';
import Evaluator from './Evaluate/evaluate.jsx'

class DragAndDrop extends React.Component {

  constructor(props) {
    super(props);
    this.state = graph;
  }

  printgraph(value) {

    const test = value;
    console.log(test);

  }



  render() {
    const graph = this.state;
    const stateActions = mapValues(actions, (func) => (...args) =>
      this.setState(func(...args)));


    return (
      <div>
        <div className="Sidebar">

          <div
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData(
                REACT_FLOW_CHART,
                JSON.stringify(application)
              )
            }
            className="DragBox"
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
            className="DragBox"
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
            className="DragBox"
            style={{ cursor: "grabbing" }}

          >
            Variable
          </div>
          <button
            className="DeleteButton"
            onClick={() => stateActions.onDeleteKey({})}>
            Delete
          </button>

        </div>
        <div className="Flowchart">
          <FlowChart
            chart={graph}
            callbacks={stateActions}
            config={{
            }}
            Components={{ NodeInner: NodeInnerHandler }}
          />
        </div>
        <div>
          <Evaluator graph={this.state} />
        </div>
      </div>
    );
  }

}


export default DragAndDrop;




