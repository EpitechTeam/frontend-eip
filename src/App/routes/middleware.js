import store  from "../../store";

export function freelanceAuthenticate() {
    let authenticate = store.getState().authenticate.authenticate
    return authenticate === "false" ? false : true
}