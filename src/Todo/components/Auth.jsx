import { VStack, Heading } from "@chakra-ui/react"
import Login from "./Login"
import Register from "./Register"

const Auth = () => {
    return (
        <VStack 
        p="10" 
        spacing="10"
        alignContent="center">
            <Heading color="blue.200" fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                Authentication
            </Heading>
            <Login />
            <Register />
        </VStack>
    )
}

export default Auth;