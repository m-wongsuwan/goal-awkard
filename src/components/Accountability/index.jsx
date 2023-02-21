import React from "react";
import { useParams } from "react-router-dom";
import { useSecret } from "../../hooks/useSecret";

import CryptoJS from "crypto-js";

function Accountability() {
    const { userId, secretId} = useParams();
    const encryptedSecret = useSecret('ysQMrka0omWRREgJXY5ac7o3Zyv1', 'df3836af-539a-437b-853f-c595a9c4e417')
    console.log(encryptedSecret)

    let bytes = CryptoJS.AES.decrypt(encryptedSecret, 'Encryption Test')
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    console.log(decryptedData)


    return (
        <>
            <h1>you've made it to a secret page { userId ? 'with params' : 'without params'} </h1>
            <h3>the secret id is {secretId}</h3>

        </>
    )
}

export { Accountability }