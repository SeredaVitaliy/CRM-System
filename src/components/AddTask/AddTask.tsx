import styles from "./AddTask.module.css";
import { addTask } from "../../api/TodoApi.ts";
import titleValidation from "../../utils/validator.ts";
import { Form, Input, Button } from "antd";

interface Props {
  onUpdate: () => Promise<void>;
}

interface AddTaskFormValues {
  title: string;
}

export default function AddTask({ onUpdate }: Props) {
  const [form] = Form.useForm<AddTaskFormValues>();

  async function handleAddTask(values: AddTaskFormValues) {
    const normalizedTitle = values.title.trim();
    const newTask = { title: normalizedTitle, isDone: false };
    try {
      await addTask(newTask);
      await onUpdate();
      form.resetFields();
    } catch (error) {
      if (error instanceof Error) {
        form.setFields([
          {
            name: "title",
            errors: [error.message],
          },
        ]);
      }
    }
  }

  return (
    <Form
      form={form}
      className={styles.container}
      onFinish={handleAddTask}
      requiredMark={false}
    >
      <Form.Item
        name="title"
        validateTrigger={["onSubmit"]}
        rules={[
          {
            validator: (_, value: string | undefined) => {
              const errorMessage = titleValidation(value || "");
              if (errorMessage) {
                return Promise.reject(errorMessage);
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input
          className={`${styles.form} ${styles.formAdd}`}
          placeholder="Task To Be Done..."
          autoComplete="off"
          size="large"
        />
      </Form.Item>
      <Button htmlType="submit" size="large">
        Add
      </Button>
    </Form>
  );
}
