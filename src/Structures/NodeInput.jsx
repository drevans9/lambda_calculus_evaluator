import * as React from "react";
import './Inner.css'

class NodeInnerHandler extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = "";
        this.type = props.node.type;
    }

    render() {
        return (
            <div class="InnerContainer" >
                {
                    this.type === "abstraction" ? (
                        <React.Fragment>
                            <p class="InnerText"><b>&lambda;.</b></p>
                            <input type="text" id="AbstractionInput" placeholder="Var" maxLength="1"
                                onChange={() => this.setState(() => document.getElementById('AbstractionInput').value)} />
                            {/* onChange={() => this.props.onValChange("ZZ")} /> */}
                        </React.Fragment>
                    ) : (this.type === "variable" ? (
                        <React.Fragment>
                            <input type="text" id="VariableInput" placeholder="Var" maxLength="1"
                                onChange={() => this.setState(() => document.getElementById('VariableInput').value)} />
                        </React.Fragment>
                    ) : (
                            <React.Fragment>
                                <p class="ApplicationText"><b>@</b></p>
                            </React.Fragment>
                        )
                        )
                }
            </div>
        );
    }

}


export default NodeInnerHandler;