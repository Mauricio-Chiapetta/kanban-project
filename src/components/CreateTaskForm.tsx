import {
  Dialog,
  Button,
  Flex,
  Box,
  Text,
  TextField,
  TextArea,
  RadioGroup,
  Badge,
} from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import { FormEventHandler } from "react";
import { z } from "zod";
import { useTasks } from "../hooks/useTasks";

const CreateTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["todo", "doing", "done"]),
  priority: z.enum(["low", "medium", "high"]),
});

export const CreateTaskForm: React.FC = () => {
  const { createTask } = useTasks();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);

    const title = formData.get("title");
    const description = formData.get("description");
    const status = formData.get("status");
    const priority = formData.get("priority");

    ev.currentTarget.reset();

    const taskData = CreateTaskSchema.parse({
      title,
      description,
      status,
      priority,
    });

    await createTask(taskData);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color="lime" style={{ cursor: "pointer" }}>
          <PlusIcon />
          Nova tarefa
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth={"32rem"}>
        <Dialog.Title>Nova tarefa</Dialog.Title>
        <Dialog.Description size={"2"} mb={"4"} color="gray">
          Adicione novas tarefas no quadro.
        </Dialog.Description>

        <form onSubmit={handleSubmit}>
          <Flex direction={"column"} gap={"4"}>
            <Box maxWidth={"32rem"}>
              <Box mb={"2"}>
                <Text as="label" htmlFor="title">
                  Título
                </Text>
                <TextField.Root
                  placeholder="Defina um título"
                  name="title"
                  id="title"
                  autoFocus
                  required
                  color="lime"
                />
              </Box>
            </Box>

            <Box maxWidth={"32rem"}>
              <Box mb={"2"}>
                <Text as="label" htmlFor="description">
                  Descrição
                </Text>
                <TextArea
                  placeholder="Defina uma tarefa"
                  name="description"
                  id="description"
                  required
                  color="lime"
                />
              </Box>
            </Box>

            <Flex gap={"8"}>
              <Box>
                <Text as="div" mb={"2"}>
                  Situação
                </Text>
                <RadioGroup.Root name="status" defaultValue="todo" color="lime">
                  <RadioGroup.Item value="todo">
                    <Badge color="gray">Para fazer</Badge>
                  </RadioGroup.Item>
                  <RadioGroup.Item value="doing">
                    <Badge color="yellow">Em progresso</Badge>
                  </RadioGroup.Item>
                  <RadioGroup.Item value="done">
                    <Badge color="green">Concluída</Badge>
                  </RadioGroup.Item>
                </RadioGroup.Root>
              </Box>

              <Box>
                <Text as="div" mb={"2"}>
                  Prioridade
                </Text>
                <RadioGroup.Root
                  name="priority"
                  defaultValue="low"
                  color="lime"
                >
                  <RadioGroup.Item value="low">
                    <Badge color="sky">Baixa</Badge>
                  </RadioGroup.Item>
                  <RadioGroup.Item value="medium">
                    <Badge color="amber">Média</Badge>
                  </RadioGroup.Item>
                  <RadioGroup.Item value="high">
                    <Badge color="tomato">Alta</Badge>
                  </RadioGroup.Item>
                </RadioGroup.Root>
              </Box>
            </Flex>

            <Flex gap={"3"} justify={"end"}>
              <Dialog.Close>
                <Button
                  color="gray"
                  variant="soft"
                  style={{ cursor: "pointer" }}
                >
                  Cancelar
                </Button>
              </Dialog.Close>
              <Button type="submit" color="lime" style={{ cursor: "pointer" }}>
                Criar tarefa
              </Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
