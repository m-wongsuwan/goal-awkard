import React from "react";
import { getSecret } from "../services/firebase";

function useSecret(uid, docName) {
    const [secret, setSecret] = React.useState({})

    React.useEffect(()=> {
        const unsubscribe = getSecret(uid, docName, setSecret);
        return unsubscribe;
    }, [uid, docName]);

    return secret

}

export { useSecret }