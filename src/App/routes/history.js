import { createBrowserHistory } from 'history';

function capsule() {
    if (typeof document === "undefined") {
        return
    }
    else {
        return (createBrowserHistory())
    }
}
export default capsule();