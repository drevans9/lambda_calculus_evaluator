import * as React from "react";
import './Inner.css'

class NodeInnerHandler extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props);
        this.type = props.node.type;
        this.value = props.node.value;
    }

    render() {
        return (
            <div class="InnerContainer" >
                {
                    (this.type === "abstraction" && this.value === "A") ? (
                        <React.Fragment>
                            <p class="InnerText"><b>&lambda;.A</b></p>
                        </React.Fragment>
                    ) : ((this.type === "abstraction" && this.value === "B") ? (
                        <React.Fragment>
                            <p class="InnerText"><b>&lambda;.B</b></p>
                        </React.Fragment>
                    ) : ((this.type === "abstraction" && this.value === "C") ? (
                        <React.Fragment>
                            <p class="InnerText"><b>&lambda;.C</b></p>
                        </React.Fragment>
                    ) : ((this.type === "abstraction" && this.value === "D") ? (
                        <React.Fragment>
                            <p class="InnerText"><b>&lambda;.D</b></p>
                        </React.Fragment>
                    ) : ((this.type === "abstraction" && this.value === "E") ? (
                        <React.Fragment>
                            <p class="InnerText"><b>&lambda;.E</b></p>
                        </React.Fragment>
                    ) : ((this.type === "abstraction" && this.value === "F") ? (
                        <React.Fragment>
                            <p class="InnerText"><b>&lambda;.F</b></p>
                        </React.Fragment>
                    ) : ((this.type === "variable" && this.value === "A") ? (
                        <React.Fragment>
                            <p class="VariableText"><b>A</b></p>
                        </React.Fragment>
                    ) : ((this.type === "variable" && this.value === "B") ? (
                        <React.Fragment>
                            <p class="VariableText"><b>B</b></p>
                        </React.Fragment>
                    ) : ((this.type === "variable" && this.value === "C") ? (
                        <React.Fragment>
                            <p class="VariableText"><b>C</b></p>
                        </React.Fragment>
                    ) : ((this.type === "variable" && this.value === "D") ? (
                        <React.Fragment>
                            <p class="VariableText"><b>D</b></p>
                        </React.Fragment>
                    ) : ((this.type === "variable" && this.value === "E") ? (
                        <React.Fragment>
                            <p class="VariableText"><b>E</b></p>
                        </React.Fragment>
                    ) : ((this.type === "variable" && this.value === "F") ? (
                        <React.Fragment>
                            <p class="VariableText"><b>F</b></p>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <p class="ApplicationText"><b>@</b></p>
                        </React.Fragment>
                    )
                    )))))))))))
                }
            </div>
        );
    }

}


export default NodeInnerHandler;