class Abstraction {
    constructor(t1, t2) {
        this.name = "Abstraction";
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

export default Abstraction;