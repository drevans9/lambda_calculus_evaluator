import React from 'react';
import './App.css';
import { FlowChart, actions, REACT_FLOW_CHART } from "@mrblenny/react-flow-chart";
import { mapValues } from "lodash";
import graph from './Structures/Graph';
import abstraction from './Structures/Abstraction';
import abstraction2 from './Structures/Abstraction2';
import abstraction3 from './Structures/Abstraction3';
import abstraction4 from './Structures/Abstraction4';
import abstraction5 from './Structures/Abstraction5';
import abstraction6 from './Structures/Abstraction6';
import variable from './Structures/Variable';
import variable2 from './Structures/Variable2';
import variable3 from './Structures/Variable3';
import variable4 from './Structures/Variable4';
import variable5 from './Structures/Variable5';
import variable6 from './Structures/Variable6';
import application from './Structures/Application';
import NodeInnerHandler from './Structures/NodeInput';
import Evaluator from './evaluate.jsx'

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
                JSON.stringify(abstraction2)
              )
            }
            class="DragBox"
            style={{ cursor: "grabbing" }}

          >
            Abstraction2
          </div>
          <div
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData(
                REACT_FLOW_CHART,
                JSON.stringify(abstraction3)
              )
            }
            class="DragBox"
            style={{ cursor: "grabbing" }}

          >
            Abstraction3
          </div>
          <div
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData(
                REACT_FLOW_CHART,
                JSON.stringify(abstraction4)
              )
            }
            class="DragBox"
            style={{ cursor: "grabbing" }}

          >
            Abstraction4
          </div>
          <div
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData(
                REACT_FLOW_CHART,
                JSON.stringify(abstraction5)
              )
            }
            class="DragBox"
            style={{ cursor: "grabbing" }}

          >
            Abstraction5
          </div>
          <div
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData(
                REACT_FLOW_CHART,
                JSON.stringify(abstraction6)
              )
            }
            class="DragBox"
            style={{ cursor: "grabbing" }}

          >
            Abstraction6
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
            Variable A
          </div>
          <div
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData(
                REACT_FLOW_CHART,
                JSON.stringify(variable2)
              )
            }
            class="DragBox"
            style={{ cursor: "grabbing" }}

          >
            Variable B
          </div>
          <div
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData(
                REACT_FLOW_CHART,
                JSON.stringify(variable3)
              )
            }
            class="DragBox"
            style={{ cursor: "grabbing" }}

          >
            Variable C
          </div>
          <div
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData(
                REACT_FLOW_CHART,
                JSON.stringify(variable4)
              )
            }
            class="DragBox"
            style={{ cursor: "grabbing" }}

          >
            Variable D
          </div>
          <div
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData(
                REACT_FLOW_CHART,
                JSON.stringify(variable5)
              )
            }
            class="DragBox"
            style={{ cursor: "grabbing" }}

          >
            Variable E
          </div>
          <div
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData(
                REACT_FLOW_CHART,
                JSON.stringify(variable6)
              )
            }
            class="DragBox"
            style={{ cursor: "grabbing" }}

          >
            Variable F
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




