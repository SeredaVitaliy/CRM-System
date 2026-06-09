import { getUserProfile, logoutUser } from "@/api/AuthApi";
import { Profile } from "@/types/profile";
import { useEffect, useState } from "react";
import { Button, Descriptions, DescriptionsProps } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearUser } from "@/slices/authSlice";
import { tokenManager } from "@/api/tokenStorage";

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
      tokenManager.clearAccessToken();
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

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "UserName",
      children: user?.username,
    },
    {
      key: "2",
      label: "Telephone",
      children: user?.phoneNumber || "-",
    },
    {
      key: "3",
      label: "E-mail",
      children: user?.email,
    },
  ];
  return (
    <>
      <Descriptions title="User Info" items={items} />
      <div>
        <Button type="primary" onClick={handleLogout}>
          Выход
        </Button>
      </div>
    </>
  );
}
