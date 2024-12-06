import { Box, Heading, Flex } from "@radix-ui/themes";
import { CreateTaskForm } from "./components/CreateTaskForm";
import { TaskBoard } from "./components/TaskBoard";
import { TasksContextsProvider } from "./contexts/TasksContext";
function App() {
  return (
    <TasksContextsProvider>
      <Box maxWidth={"60rem"} mx={"auto"}>
        <Box height={"4rem"}>
          <Flex align={"center"} gap={"4"} height={"100%"}>
            <Heading as="h1" size={"8"}>
              Kanban
            </Heading>

            <CreateTaskForm />
          </Flex>
        </Box>
        <Box>
          <Heading as="h2" weight={"light"} size={"5"} mb={"4"}>
            Quadro de tarefas
          </Heading>
          <TaskBoard />
        </Box>
      </Box>
    </TasksContextsProvider>
  );
}

export default App;
