import { Button, Form, Input } from "antd";
import { FormProps } from "antd";
import styles from "./RegistrationForm.module.css";
import { useState } from "react";
import { Link } from "react-router";
import { registerUser } from "@/api/AuthApi";

type FieldType = {
  login?: string;
  username?: string;
  password?: string;
  confirm?: string;
  email?: string;
  phoneNumber?: string;
};

export default function RegistrationForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await registerUser({
        username: values.username!,
        login: values.login!,
        password: values.password!,
        phoneNumber: values.phoneNumber || "",
        email: values.email!,
      });

      setIsSuccess(true);
    } catch (error) {
      setErrorMessage("данный логин уже занят");
    }
  };

  if (isSuccess) {
    return (
      <div>
        <span>Вы успешно зарегистрировались! </span>
        <Link to="/login"> Войти в аккаунт</Link>
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className={styles.RegistrationForm}>
        <Form
          name="basic"
          className={styles.antForm}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
                whitespace: true,
              },
              {
                pattern: /^[a-zA-Zа-яёА-ЯЁ\s]+$/,
                message: "Вводить можно только символы латиницы или кириллицы",
              },
              { min: 1, message: "Минимальное количество символов: 1" },
              { max: 60, message: "Максимальное количество символов: 60" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="login"
            name="login"
            rules={[
              { required: true, message: "Please input your username!" },
              {
                pattern: /^[a-zA-Z]+$/,
                message: "Вводить можно только символы латиницы",
              },
              { min: 2, message: "Минимальное количество символов: 2" },
              { max: 60, message: "Максимальное количество символов: 60" },
            ]}
            validateStatus={errorMessage ? "error" : undefined}
            help={errorMessage || undefined}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              { min: 6, message: "Минимальное количество символов: 6" },
              { max: 60, message: "Максимальное количество символов: 60" },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("пароли должны совпадать!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              {
                pattern: /^(\+|7|8)\d{9,15}$/,
                message: "введите корректный номер телефона",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={null} className={styles.antFormItem}>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
