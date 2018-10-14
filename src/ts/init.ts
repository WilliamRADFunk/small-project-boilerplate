import { Example } from './example';
/**
 * Placeholder function typically used to initiate the applications loop.
 */
export default () => {
    const example = new Example();
    const h1El = document.getElementsByTagName('h1');
    h1El[0].innerHTML = `${example.getName()} Boilerplate for Small Projects`;
}