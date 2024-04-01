import { Box, Button, Center, Flex, Heading, Input, Select, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getTasks } from '../action/taskAction';
import { DELETE_TASK_RESET, NEW_TASK_RESET, UPDATE_TASK_RESET } from '../constants/taskConstants';
import AddTaskModal from './AddTaskModal';
import { TaskItem } from './TaskItem';

export const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error, count } = useSelector(state => state.task);
  const { error: deleteError, isDeleted, isUpdated } = useSelector(
    (state) => state.tasks
  );
  const { token } = useSelector(state => state.user);
  const [searchedText, setSearchedText] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priorities, setPriorities] = useState('');
  const [size, setSize] = useState(3);
  const [sort, setSort] = useState('');
  const { success } = useSelector(state => state.newTask);
  const params = {
    search,
    status,
    priorities, size, sort
  }





  useEffect(() => {
    if (error) {
      window.alert(error);
      dispatch(clearError())
    }
    if (success) {
      window.alert("Task Created Successfully");
      // navigate("/admin/dashboard");
      dispatch({ type: NEW_TASK_RESET });
    }
    if (deleteError) {
      window.alert(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {

      window.alert("Task Deleted Successfully");

      dispatch({ type: DELETE_TASK_RESET });
    }
    if (isUpdated) {
      window.alert("Task Updated Successfully");
      dispatch({ type: UPDATE_TASK_RESET });
    }
    dispatch(getTasks(token, params));
  }, [dispatch, token, error, search, status, priorities, size, sort, deleteError, isDeleted, success, isUpdated]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      {tasks.length > 0 ?
        <Box mt={10} mb={5}><Center><Button colorScheme="green" size="lg" onClick={onOpen}>
          Create Task
        </Button>
        </Center>
          <Center >
            <Flex justifyContent="space-around" gap={5} margin={"auto"} m={5} direction={{ base: 'column', md: 'row' }}>

              <Input placeholder='Search' onChange={(e) => setSearchedText(e.target.value)} />
              <Button onClick={() => setSearch(searchedText)} ml={5} mr={5}>Search</Button>
              <Select id="status" onChange={(e) => setStatus(e.target.value)}>
                <option value=" ">Status</option>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Select>



              <Select id="priorities" onChange={(e) => setPriorities(e.target.value)}>
                <option value=" ">Priorities</option>
                <option value="Low">Low</option>
                <option value="High">High</option>
              </Select>
              <Select id="dates" onChange={(e) => setSort(e.target.value)}>
                <option value="">Filter By Date</option>
                <option value="asc">Ascending Order</option>
                <option value="desc">Descending Order</option>
              </Select>

            </Flex>
          </Center>
          <Flex flexWrap="wrap" flexDirection={'row'} justifyContent="space-around" gap={5} margin={"auto"} m={10}>
            {tasks.map((task, index) => (
              <TaskItem key={index} task={task} />
            ))}
          </Flex>
          <Center><Button onClick={() => setSize(size + 3)} isDisabled={count <= size}>Show More</Button></Center>
        </Box>
        :
        <Box p={8} textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            Welcome to Task Manager
          </Heading>
          <Text fontSize="xl" mb={8}>
            Currently, you don't have any tasks. Create a new one.
          </Text>
          <Button colorScheme="green" size="lg" onClick={onOpen} >
            Create Task
          </Button>
        </Box>


      }
      <AddTaskModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};
