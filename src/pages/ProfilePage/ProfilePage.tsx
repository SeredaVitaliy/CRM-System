import { getUserProfile, logoutUser } from "@/api/AuthApi";
import { Profile } from "@/types/profile";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearUser } from "@/slices/authSlice";
import { clearAccessToken } from "@/api/tokenStorage";

export default function ProfilePage() {
  const [user, setUser] = useState<Profile | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logoutUser();
    } catch (error) {
    } finally {
      setUser(null);
      dispatch(clearUser());
      clearAccessToken();
      localStorage.removeItem("refreshToken");
      navigate("/login");
    }
  }

  useEffect(function () {
    async function viewUser() {
      const response = await getUserProfile();
      setUser(response);
    }
    viewUser();
  }, []);
  return (
    <>
      <div>Имя пользователя: {user?.username}</div>
      <div>Почтовый адрес: {user?.email}</div>
      <div>Телефон: {user?.phoneNumber}</div>

      <Button type="primary" onClick={handleLogout}>
        Выход
      </Button>
    </>
  );
}
