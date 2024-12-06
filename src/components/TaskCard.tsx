import { Badge, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Task, TaskPriority, TaskStatus } from "../entities/Task";
import { useTasks } from "../hooks/useTasks";

interface TaskCardsProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardsProps> = ({ task }) => {
  const { deleteTask, updateTasks } = useTasks();

  const getActionText = (status: TaskStatus) => {
    const actionTexts = {
      todo: "iniciar",
      doing: "Concluir",
      done: "Arquivar",
    };

    return actionTexts[status];
  };

  const getActionColor = (status: TaskStatus) => {
    const actionColors: { [key: string]: "indigo" | "green" | "bronze" } = {
      todo: "indigo",
      doing: "green",
      done: "bronze",
    };

    return actionColors[status];
  };

  const getPriorityColor = (priority: TaskPriority) => {
    const priorityColors: { [key: string]: "sky" | "amber" | "tomato" } = {
      low: "sky",
      medium: "amber",
      high: "tomato",
    };

    return priorityColors[priority];
  };

  const handleDelete = (id: string) => {
    const confirmation = confirm("Tem certeza que deseja exluir a tarefa?");
    if (confirmation) {
      deleteTask(id);
    }
  };

  const handleUpdate = () => {
    if (task.status === "todo") {
      updateTasks(task.id, { status: "doing" });
    } else if (task.status === "doing") {
      updateTasks(task.id, { status: "done" });
    }
  };

  return (
    <Card>
      <Flex align={"center"} gap={"4"}>
        <Heading as="h3" size={"3"} weight={"bold"}>
          {task.title}
        </Heading>
        <Badge color={getPriorityColor(task.priority)}>{task.priority}</Badge>
      </Flex>

      <Text as="p" my={"4"}>
        {task.description}
      </Text>

      <Flex gap={"2"}>
        {task.status !== "done" && (
          <Button
            color={getActionColor(task.status)}
            style={{ cursor: "pointer" }}
            onClick={() => handleUpdate()}
          >
            {getActionText(task.status)}
          </Button>
        )}
        <Button
          color="red"
          onClick={() => handleDelete(task.id)}
          style={{ cursor: "pointer" }}
        >
          Excluir
        </Button>
      </Flex>
    </Card>
  );
};
