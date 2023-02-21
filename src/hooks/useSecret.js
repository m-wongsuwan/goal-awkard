import React from "react";
import { getSecret } from "../services/firebase";

function useSecret(uid, secretId) {
    const [secret, setSecret] = React.useState()

    React.useEffect(()=> {
        const unsubscribe = getSecret(uid, secretId, setSecret);
        return unsubscribe;
    }, [uid, secretId]);

    return secret

}

export { useSecret }