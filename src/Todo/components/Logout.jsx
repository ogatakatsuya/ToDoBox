import { Button } from "@chakra-ui/react";
import { signOut } from "firebase/auth";

import { auth } from "../../Firebase";

const Logout = ({setUser}) => {
    const submitHandler = () => {
        signOut(auth).then(() => {
            console.log("signout success");
            setUser("");
        }).catch((error) => {
            console.log(error.message);
        });
    }
    return (
        <Button onClick={submitHandler}>
            ログアウト
        </Button>
    )
}

export default Logout;