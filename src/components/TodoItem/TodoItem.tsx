import { memo, useState } from "react";
import styles from "./TodoItem.module.css";
import { deleteTodo, editTodo } from "../../api/TodoApi.ts";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { Todo, TodoRequest } from "@/types/todo.ts";

interface Props {
  todo: Todo;
  onUpdate: () => Promise<void>;
}

interface EditTodoFormValues {
  title: string;
}

function TodoItem({ todo, onUpdate }: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [form] = Form.useForm<EditTodoFormValues>();

  async function updateTodo(
    todoChanges: TodoRequest,
    id: number,
  ): Promise<void> {
    try {
      await editTodo(todoChanges, id);
      await onUpdate();
    } catch (error) {
      notification.error({ message: "не удалось обновить задачу" });
      throw error;
    }
  }

  async function handleEditFormSubmit(value: EditTodoFormValues) {
    try {
      await updateTodo(value, todo.id);
      form.resetFields();
      setIsEdit(false);
    } catch (error) {
      notification.error({ message: "не удалось обновить задачу" });
    }
  }

  function handleToggleEdit() {
    setIsEdit((editing) => !editing);
    form.setFieldsValue({ title: todo.title });
  }

  function handleReturnClick() {
    setIsEdit(false);
  }

  async function handleDeleteTodo(id: number) {
    try {
      await deleteTodo(id);
      await onUpdate();
    } catch (error) {
      notification.error({
        message: "не удалось обновить данные(удаление задачи)",
      });
    }
  }

  async function handleToggleTodo(isDone: boolean) {
    await updateTodo({ isDone }, todo.id);
  }
  return (
    <li className={styles.todoItem}>
      <div className={styles.todoMain}>
        <Checkbox
          checked={todo.isDone}
          onChange={(e) => handleToggleTodo(e.target.checked)}
        />

        {isEdit && (
          <Form
            form={form}
            onFinish={handleEditFormSubmit}
            className={styles.editInput}
          >
            <div className={styles.editTitle}>
              <Form.Item
                name="title"
                validateTrigger={["onSubmit"]}
                rules={[
                  { required: true, message: "Это поле не может быть пустым" },
                  {
                    whitespace: true,
                    message: "Это поле не может быть пустым",
                  },
                  { min: 2, message: "Минимальная длина текста 2 символа" },
                  { max: 64, message: "Максимальная длина текста 64 символа" },
                ]}
              >
                <Input className={styles.formEdit} />
              </Form.Item>
            </div>

            <div className={styles.editButtons}>
              <Button
                htmlType="submit"
                icon={<CheckOutlined />}
                size="large"
                type="primary"
              ></Button>
              <Button
                htmlType="button"
                onClick={handleReturnClick}
                icon={<CloseOutlined />}
                size="large"
                type="primary"
                danger
              ></Button>
            </div>
          </Form>
        )}

        {!isEdit && (
          <>
            <span
              className={todo.isDone ? styles.todoIsDone : styles.todoTitle}
            >
              {todo.title}
            </span>

            <div className={styles.initialButtons}>
              <Button
                onClick={handleToggleEdit}
                htmlType="button"
                icon={<EditOutlined />}
                size="large"
                type="primary"
              ></Button>

              <Button
                onClick={() => handleDeleteTodo(todo.id)}
                htmlType="button"
                icon={<DeleteOutlined />}
                size="large"
                type="primary"
                danger
              ></Button>
            </div>
          </>
        )}
      </div>
    </li>
  );
}

export default memo(TodoItem);
