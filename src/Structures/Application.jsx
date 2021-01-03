const application = {
    type: "application",
    ports: {
        portA: {
            id: "portA",
            type: "top",
            properties: {
                custom: "property"
            }
        },
        portB: {
            id: "portB",
            type: "bottom",
            properties: {
                custom: "property"
            }
        },
        portC: {
            id: "portC",
            type: "bottom",
            properties: {
                custom: "property"
            }
        }
    },
    properties: {
        custom: "new prop"
    }
};

export default application;