import { Input, Button, Modal, ModalOverlay, 
    ModalContent, ModalHeader, ModalCloseButton, ModalFooter} from '@chakra-ui/react';

const MakeMordal = ({ isOpen, onClose, updatedTodo, setUpdatedTodo, editTasks, selectedTodoId }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>編集する</ModalHeader>
            <ModalCloseButton />
            <ModalFooter>
            <Input
            placeholder="タスクを編集する"
            _placeholder={{ opacity: "0.3", color: "gray.500" }}
            size="lg"
            p={3}
            bgColor="white"
            variant="flushed"
            value={updatedTodo}
            onChange={(e) => setUpdatedTodo(e.target.value)}
            />
            <Button
            colorScheme="blue"
            size="md"
            bgColor="white"
            variant="outline"
            px={7}
            type="submit"
            onClick={() => editTasks(selectedTodoId)}
            >更新</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default MakeMordal;