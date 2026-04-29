import { useState } from "react";
import styles from "./TaskItem.module.css";
import titleValidation from "../../utils/validator.ts";
import { deleteTask, fetchEditTask } from "../../api/TodoApi.ts";
import { Todo, TodoRequest } from "../../types/types.ts";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, Checkbox } from "antd";

interface Props {
  task: Todo;
  onUpdate: () => Promise<void>;
}

interface EditTaskFormValues {
  title: string;
}

export default function TaskItem({ task, onUpdate }: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [form] = Form.useForm<EditTaskFormValues>();

  async function updateTodo(
    taskChanges: TodoRequest,
    id: number,
  ): Promise<void> {
    try {
      await fetchEditTask(taskChanges, id);
      await onUpdate();
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      throw error;
    }
  }

  async function handleEditFormSubmit(value: EditTaskFormValues) {
    try {
      await updateTodo(value, task.id);
      form.resetFields();
      setIsEdit(false);
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

  function handleToggleEdit() {
    setIsEdit((editing) => !editing);
    form.setFieldsValue({ title: task.title });
  }

  function handleReturnClick() {
    setIsEdit(false);
  }

  async function handleDeleteTask(id: number) {
    try {
      await deleteTask(id);
      await onUpdate();
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  }

  async function handleToggleTask(isDone: boolean, id: number) {
    await updateTodo({ isDone }, id);
  }
  return (
    <li className={styles.tasksItem}>
      <div className={styles.taskMain}>
        <Checkbox
          checked={task.isDone}
          onChange={(e) => handleToggleTask(e.target.checked, task.id)}
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
                <Input className={styles.formEdit} />
              </Form.Item>
            </div>

            <div className={styles.editButtons}>
              <Button
                htmlType="submit"
                icon={<CheckOutlined />}
                size="large"
              ></Button>
              <Button
                htmlType="button"
                onClick={handleReturnClick}
                icon={<CloseOutlined />}
                size="large"
              ></Button>
            </div>
          </Form>
        )}

        {!isEdit && (
          <>
            <span
              className={task.isDone ? styles.taskIsDone : styles.taskTitle}
            >
              {task.title}
            </span>

            <div className={styles.initialButtons}>
              <Button
                onClick={handleToggleEdit}
                htmlType="button"
                icon={<EditOutlined />}
                size="large"
              ></Button>

              <Button
                onClick={() => handleDeleteTask(task.id)}
                htmlType="button"
                icon={<DeleteOutlined />}
                size="large"
              ></Button>
            </div>
          </>
        )}
      </div>
    </li>
  );
}
