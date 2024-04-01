import { Button, Center, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../action/taskAction';

const EditTaskModal = ({ isOpen, onClose,task }) => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.user);

  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [priorities, setPriorities] = useState(task.priorities);

  const taskData = {
    name,
    description,
    status,
    priorities
  };

  const createSubmit = (e) => {
    e.preventDefault(); 
    console.log(taskData);
    dispatch(updateTask(task._id,taskData, token));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={createSubmit}>
            <FormControl isRequired>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="status">Status</FormLabel>
              <Select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="priorities">Priorities</FormLabel>
              <Select id="priorities" value={priorities} onChange={(e) => setPriorities(e.target.value)}>
                <option value="Low">Low</option>
                <option value="High">High</option>
              </Select>
            </FormControl>
            <Center><Button type="submit" mt={4} colorScheme="yellow">Edit</Button></Center>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTaskModal;
