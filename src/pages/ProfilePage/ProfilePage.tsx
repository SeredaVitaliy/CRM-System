import { getUserProfile } from "@/api/AuthApi";
import { Profile } from "@/types/types";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<Profile | null>(null);

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
    </>
  );
}
