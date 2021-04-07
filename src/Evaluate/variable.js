class Variable {
    constructor(t) {
        this.name = "Variable";
        this.t = t;
    }

    print(output) {
        output += this.t;
        return output;
    }
}

export default Variable;