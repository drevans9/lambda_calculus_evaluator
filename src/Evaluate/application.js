class Application {
    constructor(t1, t2) {
        this.name = "Application";
        this.t1 = t1;
        this.t2 = t2;
    }

    print(output) {
        output = this.t1.print(output);
        output = this.t2.print(output);
        return output;
    }

}

export default Application;