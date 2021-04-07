import Application from './application.js';
import Abstraction from './abstraction.js';
import Variable from './variable.js';


function BuildTerm(nodes, links, node) {

    if (node.type === "application") {
        //Find the two links for application node
        let link1 = links.filter(link => (node.id === link.to.nodeId && link.to.portId === "portB") || (node.id === link.from.nodeId && link.from.portId === "portB"))[0]
        let link2 = links.filter(link => (node.id === link.to.nodeId && link.to.portId === "portC") || (node.id === link.from.nodeId && link.from.portId === "portC"))[0]

        // Find the children associated with those links
        let child1 = nodes.filter(n => ((((n.id === link1.from.nodeId) || (n.id === link1.to.nodeId)) && n.id !== node.id)))[0]
        let child2 = nodes.filter(n => ((((n.id === link2.from.nodeId) || (n.id === link2.to.nodeId)) && n.id !== node.id)))[0]

        return new Application(BuildTerm(nodes, links, child1), BuildTerm(nodes, links, child2));

    } else if (node.type === "abstraction") {
        let link1 = links.filter(link => (node.id === link.to.nodeId && link.to.portId === "portB") || (node.id === link.from.nodeId && link.from.portId === "portB"))[0]
        let child1 = nodes.filter(n => ((((n.id === link1.from.nodeId) || (n.id === link1.to.nodeId)) && n.id !== node.id)))[0]

        return new Abstraction(node.value, BuildTerm(nodes, links, child1));

    } else if (node.type === "variable") {

        return new Variable(node.value)

    } else {
        //Error
    }
}

export default BuildTerm;