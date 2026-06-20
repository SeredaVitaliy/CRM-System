import { getUser, updateUser } from "@/api/AdminApi";
import { User, UserRequest } from "@/types/admin";
import { notification, Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  FIELD_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "../RegistrationForm/RegistrationForm";
import styles from "./UserProfile.module.css";
export default function UserProfile() {
  const { id } = useParams();

  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [form] = Form.useForm();

  const navigate = useNavigate();
  useEffect(
    function () {
      async function fetchUser() {
        try {
          const data = await getUser(Number(id));
          setUser(data);
          form.setFieldsValue({
            username: data.username,
            email: data.email,
            phoneNumber: data.phoneNumber,
          });
        } catch (error) {
          notification.error({
            message: "не удалось получить данные пользователя!",
          });
        }
      }
      fetchUser();
    },
    [id],
  );

  async function handleSaveClick(values: UserRequest) {
    const updatedData: UserRequest = {};
    if (values.username !== user?.username)
      updatedData.username = values.username;
    if (values.email !== user?.email) updatedData.email = values.email;
    if (values.phoneNumber !== user?.phoneNumber)
      updatedData.phoneNumber = values.phoneNumber;

    try {
      const update = await updateUser(Number(id), updatedData);
      setUser(update);
      setIsEditing(false);
    } catch (error) {
      notification.error({
        message: "не удалось обновить данные пользователя!",
      });
    }
  }

  return (
    <>
      <div className={styles.page}>
        <Button type="primary" onClick={() => navigate("/users")}>
          назад
        </Button>
        <h1>{user?.username}</h1>
        <Form form={form} layout="vertical" onFinish={handleSaveClick}>
          <Form.Item
            label="имя пользователя"
            name="username"
            rules={[
              {
                whitespace: true,
              },
              {
                pattern: /^[a-zA-Zа-яёА-ЯЁ\s]+$/,
                message: "Вводить можно только символы латиницы или кириллицы",
              },
              {
                min: USERNAME_MIN_LENGTH,
                message: `Минимальное количество символов: ${USERNAME_MIN_LENGTH}`,
              },
              {
                max: FIELD_MAX_LENGTH,
                message: `Максимальное количество символов: ${FIELD_MAX_LENGTH}`,
              },
            ]}
          >
            <Input disabled={!isEditing} />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "Введите верный E-mail!",
              },
            ]}
          >
            <Input disabled={!isEditing} />
          </Form.Item>
          <Form.Item
            label="номер телефона"
            name="phoneNumber"
            rules={[
              {
                pattern: /^(\+|7|8)\d{9,15}$/,
                message: "введите корректный номер телефона",
              },
            ]}
          >
            <Input disabled={!isEditing} />
          </Form.Item>
        </Form>
        <div className={styles.action}>
          {isEditing ? (
            <Button type="primary" onClick={() => form.submit()}>
              Сохранить
            </Button>
          ) : (
            <Button type="primary" onClick={() => setIsEditing(true)}>
              Редактировать
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
