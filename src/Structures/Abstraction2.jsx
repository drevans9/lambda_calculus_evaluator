const abstraction2 = {
    value: "B",
    type: "abstraction",
    size: 100,
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
    },
    properties: {
        custom: "new prop"
    }
};

export default abstraction2;