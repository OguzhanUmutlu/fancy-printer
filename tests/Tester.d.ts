declare class Tester {
    static set(fn): typeof Tester;

    static test(expected, ...args): boolean;
}

export = Tester;