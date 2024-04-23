import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import Todo from "./components/Todo";
import Auth from "./components/Auth";
import { auth } from "../Firebase";

const Example = () => {
    const [ user, setUser ] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (data) => {
            if (data) {
                setUser(data.uid);
            } else {
            }
        })
    },[])
    return (
        <>
        <ChakraProvider>
            { user ? <Todo setUser={setUser} user_id={user}/> : <Auth />}
        </ChakraProvider>
        </>
    );
};

export default Example;