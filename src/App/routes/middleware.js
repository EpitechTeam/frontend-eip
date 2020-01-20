import store  from "../../store";

export function freelanceAuthenticate() {
    let authenticate = store.getState().authenticate.authenticate
    return authenticate === "false" ? false : true
}

export function adminAndProprioAuthenticate() {
    return true
    // let authenticate = store.getState().authenticate.authenticate
    // if (authenticate === "true") {
    //     let role = store.getState().authenticate.role
    //     if (role === "proprietaire" || role === "admin") {
    //         return true
    //     }
    //     else {
    //         return false
    //     }
    // }
    // return false
}