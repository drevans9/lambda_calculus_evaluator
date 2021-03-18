import React from "react";
import './evaluate.css';


class Application {
    constructor(t1, t2) {
        this.name = "Application"
        this.t1 = t1;
        this.t2 = t2;
    }

    print(output) {
        output = this.t1.print(output);
        output = this.t2.print(output);
        return output;
    }

}

class Abstraction {
    constructor(t1, t2) {
        this.name = "Abstraction"
        this.t1 = t1;
        this.t2 = t2;
    }


    print(output) {
        output += "(λ" + this.t1 + ".";
        output = this.t2.print(output);
        output += ")";
        return output;
    }
}

class Variable {
    constructor(t) {
        this.name = "Variable"
        this.t = t;
    }

    print(output) {
        output += this.t;
        return output;
    }
}



class Evaluator extends React.Component {

    constructor(props) {
        super(props);
        this.state = { response: '', graph: props.graph }
    }

    async postData() {

        let term = this.InterpretGraph(this.state.graph);

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
            //don't allow evaluation
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
            //don't allow evaluation
        }



        //Check each abstraction has a link from port B
        const absLink = abs.map(node => ({
            id: node.id,
            portB: links.filter(link => (node.id === link.to.nodeId && link.to.portId === "portB") || (node.id === link.from.nodeId && link.from.portId === "portB"))
        }));

        //Check absLink for any node that doesn't have a link
        const absMissing = absLink.filter(node => node.portB.length === 0);

        if (absMissing.length > 0) {
            //don't allow evaluation
        }

        let term = this.BuildTerm(nodes, links, topNode);
        return term;

    }

    //Converts the 
    BuildTerm(nodes, links, node) {
        if (node.type === "application") {
            //Find the two links for application node
            let link1 = links.filter(link => (node.id === link.to.nodeId && link.to.portId === "portB") || (node.id === link.from.nodeId && link.from.portId === "portB"))[0]
            let link2 = links.filter(link => (node.id === link.to.nodeId && link.to.portId === "portC") || (node.id === link.from.nodeId && link.from.portId === "portC"))[0]

            // Find the children associated with those links
            let child1 = nodes.filter(n => (((n.id === link1.from.nodeId) || (n.id === link1.to.nodeId) && n.id !== node.id)))[0]
            let child2 = nodes.filter(n => (((n.id === link2.from.nodeId) || (n.id === link2.to.nodeId) && n.id !== node.id)))[0]

            return new Application(this.BuildTerm(nodes, links, child1), this.BuildTerm(nodes, links, child2));

        } else if (node.type === "abstraction") {
            let link1 = links.filter(link => (node.id === link.to.nodeId && link.to.portId === "portB") || (node.id === link.from.nodeId && link.from.portId === "portB"))[0]
            let child1 = nodes.filter(n => (((n.id === link1.from.nodeId) || (n.id === link1.to.nodeId) && n.id !== node.id)))[0]

            //abstraction value goes here
            return new Abstraction("X", this.BuildTerm(nodes, links, child1));

        } else if (node.type === "variable") {

            //value is meant to go here
            return new Variable("X")

        } else {
            //Error
        }
    }






    ConvertResult(result) {
        var test = this.Convert(result);
        var text = "";
        let b = test.print(text);
        console.log(b);
    }


    Convert(term) {
        if (term.typeOfTerm === "Application") {
            return new Application(this.Convert(term.val1), this.Convert(term.val2))

        } else if (term.typeOfTerm === "Abstraction") {
            return new Abstraction(term.val1, this.Convert(term.val2))

        } else if (term.typeOfTerm === "Variable") {
            return new Variable(term.val)
        }
    }



    render() {

        return (
            <div class="Evaluate">
                <button
                    class="EvaluateButton"
                    onClick={() => this.postData().then(result => this.ConvertResult(result.expr))}>
                    Evaluate
                </button>
                <p></p>
            </div>
        )
    }

}

export default Evaluator;