/**
 * Demonstrates how exported typescript functions can be used in the browser
 */
export class Example {
    /**
     * Constructor for Example class
     * @hidden
     */
    constructor() {}
    /**
     * Returns the string 'Example'
     * @returns the name of the class to demo in the h1 element
     */
    getName(): string {
        return 'Example';
    }
}