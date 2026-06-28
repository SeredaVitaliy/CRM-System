import { Button, Checkbox, Form, Input, notification } from "antd";
import { FormProps } from "antd";
import styles from "./LoginForm.module.css";
import { Link, useNavigate } from "react-router";
import { authUser, getUserProfile } from "@/api/AuthApi";
import { setUser } from "@/slices/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { tokenManager } from "@/api/tokenStorage";

type FieldType = {
  login?: string;
  password?: string;
  remember?: boolean;
};

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (!values.login || !values.password) return;

    try {
      const token = await authUser({
        login: values.login,
        password: values.password,
      });
      tokenManager.setAccessToken(token.accessToken);
      localStorage.setItem("refreshToken", token.refreshToken);
      const profile = await getUserProfile();
      dispatch(setUser(profile));
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setErrorMessage("неверный логин или пароль");
        return;
      }
      notification.error({ message: "Ошибка! попробуйте повторить позже" });
    }
  };

  return (
    <div className={styles.loginForm}>
      <Form
        name="basic"
        className={styles.antForm}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          label="Логин"
          name="login"
          rules={[
            { required: true, message: "Пожалуйста, введите свой никнейм!" },
          ]}
          validateStatus={errorMessage ? "error" : undefined}
          help={errorMessage || undefined}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Пароль"
          name="password"
          rules={[
            { required: true, message: "Пожалуйста, введите свой пароль!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          label={null}
        >
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>

        <Form.Item label={null} className={styles.antFormItem}>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
        <Form.Item className={styles.antFormItem}>
          <span>Вы не зарегистрированы? </span>
          <Link to="/registration"> Создайте свой аккаунт</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
