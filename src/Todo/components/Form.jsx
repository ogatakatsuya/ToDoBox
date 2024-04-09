import { useState } from 'react';
import { HStack, Input, Button, useToast} from '@chakra-ui/react';

const Form = ({ createTodo }) => {
    const [enteredTodo, setEnteredTodo] = useState("");
    const [enteredDate, setEnteredDate] = useState("");

    const toast = useToast();

    const addTodo = async (e) => {
    e.preventDefault();

    if (!enteredTodo) {
        toast({
        title: "新しいタスクを入力してください",
        status: "error",
        duration: 2000,
        isClosable: true,
        });
        return;
    }
    if (!enteredDate) {
        toast({
        title: "期限を入力してください",
        status: "error",
        duration: 2000,
        isClosable: true,
        });
        return;
    }

    const todo = enteredTodo;
    const date = enteredDate;

    createTodo( todo, date )

    setEnteredTodo("");
    toast({
        title: "新しいタスクを追加しました！",
        description: enteredTodo,
        status: "info",
        duration: 3000,
        isClosable: true,
    });  
    }
    return (
        <form onSubmit={addTodo} width="100%">
            <HStack
            width="100%" >
                <Input
                placeholder="新しいタスク"
                _placeholder={{ opacity: "0.3", color: "gray.500" }}
                size="lg"
                p={3}
                bgColor="white"
                variant="flushed"
                value={enteredTodo}
                onChange={(e) => setEnteredTodo(e.target.value)}
                />
                <Input
                placeholder="Select Date and Time"
                bgColor="white"
                variant="flushed"
                size="lg"
                type="date"
                value={enteredDate}
                onChange={(e) => setEnteredDate(e.target.value)}
                />
                <Button
                colorScheme="blue"
                size="md"
                bgColor="white"
                variant="outline"
                px={7}
                type="submit"
                >
                追加
                </Button>
            </HStack>
        </form>
    )
}

export default Form;