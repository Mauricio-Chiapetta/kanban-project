import { Task } from "../entities/Task";
import { Grid, Flex, Badge, ScrollArea } from "@radix-ui/themes";
import { TaskCard } from "./TaskCard";
import { useTasks } from "../hooks/useTasks";
export const TaskBoard: React.FC = () => {
  const { tasks } = useTasks();

  const tasksTodo: Task[] =
    tasks?.filter((task) => task.status === "todo") ?? [];
  const tasksInProgress: Task[] =
    tasks?.filter((task) => task.status === "doing") ?? [];
  const tasksDone: Task[] =
    tasks?.filter((task) => task.status === "done") ?? [];

  return (
    <ScrollArea scrollbars="horizontal">
      <Grid columns={"3"} gap={"4"} minWidth={"60rem"}>
        <Flex direction={"column"} gap={"4"}>
          <Badge size={"3"} color="gray">
            Para fazer ({tasksTodo.length})
          </Badge>
          {tasksTodo.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Flex>
        <Flex direction={"column"} gap={"4"}>
          <Badge size={"3"} color="yellow">
            Em Progresso ({tasksInProgress.length})
          </Badge>
          {tasksInProgress.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Flex>
        <Flex direction={"column"} gap={"4"}>
          <Badge size={"3"} color="green">
            Concluídas ({tasksDone.length})
          </Badge>
          {tasksDone.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Flex>
      </Grid>
    </ScrollArea>
  );
};