import styles from "./AddTodo.module.css";
import { addTodo } from "../../api/TodoApi.ts";
import { Form, Input, Button, notification } from "antd";

interface Props {
  onUpdate: () => Promise<void>;
}

interface AddTodoFormValues {
  title: string;
}

export default function AddTodo({ onUpdate }: Props) {
  const [form] = Form.useForm<AddTodoFormValues>();

  async function handleAddTodo(values: AddTodoFormValues) {
    const newTodo = { title: values.title.trim(), isDone: false };
    try {
      await addTodo(newTodo);
      await onUpdate();
      form.resetFields();
    } catch (error) {
      notification.error({ message: "не удалось добавить задачу" });
    }
  }

  return (
    <Form
      form={form}
      className={styles.container}
      onFinish={handleAddTodo}
      requiredMark={false}
    >
      <Form.Item
        name="title"
        validateTrigger={["onSubmit"]}
        rules={[
          { required: true, message: "Это поле не может быть пустым" },
          { whitespace: true, message: "Это поле не может быть пустым" },
          { min: 2, message: "Минимальная длина текста 2 символа" },
          { max: 64, message: "Максимальная длина текста 64 символа" },
        ]}
      >
        <Input
          className={`${styles.form} ${styles.formAdd}`}
          placeholder="Task To Be Done..."
          autoComplete="off"
          size="large"
        />
      </Form.Item>
      <Button htmlType="submit" size="large" type="primary">
        Add
      </Button>
    </Form>
  );
}
