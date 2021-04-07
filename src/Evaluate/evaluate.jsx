/* eslint-disable no-mixed-operators */
import React from "react";
import './evaluate.css';
import Application from './application.js';
import Abstraction from './abstraction.js';
import Variable from './variable.js';
import BuildTerm from './buildterm.js';


class Evaluator extends React.Component {

    constructor(props) {
        super(props);
        this.state = { response: '', graph: props.graph, items: [], normalForm: "" }
    }

    async postData() {

        let term = this.InterpretGraph(this.state.graph);

        if (term === undefined) {
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                term: term
            }),
        };

        try {
            let result = await fetch('https://localhost:44362/api/LambdaExpressions', requestOptions);
            let data = await result.json();
            return data;

        } catch (e) {
            console.log(e);
        }
    }

    InterpretGraph(tree) {
        //Strips away unnecessary information
        const nodes = Object.entries(tree.nodes).map(node => node[1]);
        const links = Object.entries(tree.links).map(link => link[1]);

        const app = nodes.filter(node => node.type === "application");
        const abs = nodes.filter(node => node.type === "abstraction");
        const vars = nodes.filter(node => node.type === "variable");


        //Check all nodes for links on portA
        const totalLinks = nodes.map(node => ({
            id: node.id,
            portA: links.filter(link => (node.id === link.to.nodeId && link.to.portId === "portA") || (node.id === link.from.nodeId && link.from.portId === "portA"))
        }));

        const topNodes = totalLinks.filter(node => node.portA.length === 0);

        if (topNodes.length === 1) {
            var topNode = nodes.filter(node => node.id === topNodes[0].id)[0];
        } else {
            alert("More than one top node");
            return;
        }

        //Check each application has two links, to / from port C + B      

        //Each application node and their port B and port C links
        const appLinks = app.map(node => ({
            id: node.id,
            portB: links.filter(link => (node.id === link.to.nodeId && link.to.portId === "portB") || (node.id === link.from.nodeId && link.from.portId === "portB")),
            portC: links.filter(link => (node.id === link.to.nodeId && link.to.portId === "portC") || (node.id === link.from.nodeId && link.from.portId === "portC"))
        }));



        //Check appLinks for any node that doesn't have a portB and portC link
        const appMissing = appLinks.filter(node => (node.portB.length === 0 || node.portC.length === 0));

        if (appMissing.length > 0) {
            alert("Not all application nodes are fully connected");
            return;
        }



        //Check each abstraction has a link from port B
        const absLink = abs.map(node => ({
            id: node.id,
            portB: links.filter(link => (node.id === link.to.nodeId && link.to.portId === "portB") || (node.id === link.from.nodeId && link.from.portId === "portB"))
        }));

        //Check absLink for any node that doesn't have a link
        const absMissingLink = absLink.filter(node => node.portB.length === 0);

        if (absMissingLink.length > 0) {
            alert("Not all abstraction nodes are fully connected");
            return;
        }


        //Check each abstraction and variable term has an assigned variable
        const absMissingVal = abs.filter(node => (
            node.value === ""
        ));

        if (absMissingVal.length > 0) {
            alert("Not all abstraction nodes have assigned values");
            return;
        }

        const varMissingVal = vars.filter(node => (
            node.value === ""
        ));

        if (varMissingVal.length > 0) {
            alert("Not all variable nodes have assigned values");
            return;
        }
        console.log(nodes);
        let term = BuildTerm(nodes, links, topNode);
        console.log(term);
        return term;

    }

    ConvertResult(response) {

        // Convert final variable
        var finalVar = this.ConvertResponseTerm(response).print("");
        var tuple = []

        for (var state of response.states) {

            var stack = "□";
            var environment = "□";
            var expression = null;

            //Convert stack
            if (state.stack.length > 0) {
                stack = this.ConvertResponseList(state.stack);
            }

            //Convert environment
            if (state.environment.length > 0) {
                environment = this.ConvertResponseList(state.environment);
            }

            //If state has an expression
            if (state.hasOwnProperty('expression')) {
                expression = this.ConvertResponseTerm(state.expression).print("");
            }

            console.log(expression + "  |  " + stack + "  |  " + environment);
            tuple.push([expression, stack, environment]);
        }

        this.setState({ items: tuple })
        this.setState({ normalForm: finalVar })
    }

    ConvertResponseList(e) {

        if (e.length === 0) {
            return "□";
        }
        var textEnvironment = "";

        //for each closure in environment
        for (var closure of e) {
            var expression = this.ConvertResponseTerm(closure.expression);
            var textExpression = expression.print("");

            var environment = this.ConvertResponseList(closure.environment);

            var textClosure = "<" + textExpression + ", " + environment + ">";
            textEnvironment += textClosure;
        }

        return textEnvironment;
    }

    ConvertResponseTerm(term) {
        if (term.typeOfTerm === "Application") {
            return new Application(this.ConvertResponseTerm(term.val1), this.ConvertResponseTerm(term.val2))

        } else if (term.typeOfTerm === "Abstraction") {
            return new Abstraction(term.val1, this.ConvertResponseTerm(term.val2))

        } else if (term.typeOfTerm === "Variable") {
            return new Variable(term.val)
        }
    }

    renderRows() {
        return this.state.items.map(function (o, i) {
            return (
                <tr key={"item-" + i}>
                    <td>
                        {o[0]}
                    </td>
                    <td>
                        {o[1]}
                    </td>
                    <td>
                        {o[2]}
                    </td>
                </tr>
            );
        });
    }

    async onEvaluateClick() {
        var response;
        await this.postData().then(result => response = result);
        if (response !== undefined) {
            this.ConvertResult(response.expr)
        }
    }

    render() {
        return (
            <div className="Evaluate">
                <div id="evaluateUpper">
                    <button
                        className="EvaluateButton"
                        onClick={() => this.onEvaluateClick()}>
                        Evaluate
                    </button>
                    <div id="normalForm">
                        Weak Head Normal Form: {this.state.normalForm}
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Variable</th>
                            <th>Stack</th>
                            <th>Environment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default Evaluator;