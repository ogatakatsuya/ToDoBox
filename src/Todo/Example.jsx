import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import Todo from "./components/Todo";
import Auth from "./components/Auth";
import { auth } from "../Firebase";

const Example = () => {
    const [ user, setUser ] = useState("");
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                console.log(user)
            } else {
            }
        })
    },[])
    return (
        <>
        <ChakraProvider>
            { user ? <Todo setUser={setUser}/> : <Auth />}
        </ChakraProvider>
        </>
    );
};

export default Example;