import { Button, Checkbox, Form, Input } from "antd";
import { FormProps } from "antd";
import styles from "./LoginForm.module.css";
import { Link, useNavigate } from "react-router";
import { authUser } from "@/api/AuthApi";
import { setUser } from "@/slices/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

type FieldType = {
  login?: string;
  password?: string;
  remember?: boolean;
};

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const token = await authUser({
        login: values.login!,
        password: values.password!,
      });
      localStorage.setItem("refreshToken", token.refreshToken);
      dispatch(
        setUser({
          user: null,
          token,
          isAuthenticated: true,
          refreshToken: token.refreshToken,
          isInitialized: true,
        }),
      );
      navigate("/");
    } catch (error) {
      setErrorMessage("неверный логин или пароль");
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
          label="login"
          name="login"
          rules={[{ required: true, message: "Please input your username!" }]}
          validateStatus={errorMessage ? "error" : undefined}
          help={errorMessage || undefined}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          label={null}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item label={null} className={styles.antFormItem}>
          <Button type="primary" htmlType="submit">
            Sign in
          </Button>
        </Form.Item>
        <Form.Item className={styles.antFormItem}>
          <span>Not Registered Yet? </span>
          <Link to="/registration"> Create an account</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
