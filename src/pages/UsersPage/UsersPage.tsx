import {
  blockUser,
  deleteUser,
  getUsers,
  unblockUser,
  updateUserRights,
} from "@/api/AdminApi";
import { RootState } from "@/store/store";
import { Roles, User, UserFilters } from "@/types/admin";
import {
  Input,
  notification,
  Select,
  Table,
  Tag,
  Button,
  Popconfirm,
  Modal,
  TablePaginationConfig,
} from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const roleColors: Record<string, string> = {
  ADMIN: "blue",
  MODERATOR: "orange",
  USER: "purple",
};

export default function UsersPage() {
  const currentUserRole = useSelector(
    (state: RootState) => state.auth.user?.roles,
  );
  const isAdmin = currentUserRole?.includes(Roles.ADMIN);

  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [filters, setFilters] = useState<UserFilters>({ page: 1, limit: 20 });

  const [userRole, setUserRole] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<Roles[]>([]);

  const [searchValue, setSearchValue] = useState<string>("");

  const navigate = useNavigate();

  useEffect(
    function () {
      async function fetchUsers() {
        try {
          const response = await getUsers({
            ...filters,
            page: filters.page - 1,
          });
          setUsers(response.data);
          setTotalUsers(response.meta.totalAmount);
        } catch (error) {
          notification.error({
            message: "не удалось обновить данные",
          });
        }
      }
      fetchUsers();
    },
    [filters],
  );

  useEffect(
    function () {
      const searchDebounce = setTimeout(() => {
        setFilters((prev) => ({ ...prev, search: searchValue, page: 1 }));
      }, 800);
      return () => clearTimeout(searchDebounce);
    },
    [searchValue],
  );

  const columns = [
    {
      title: "Имя пользователя",
      dataIndex: "username",
      key: "username",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Дата регистрации",
      dataIndex: "date",
      key: "date",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },

    {
      title: "Блокировка",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (isBlocked: boolean) => (isBlocked ? "Заблокирован" : "Активный"),
    },
    {
      title: "Роль",
      dataIndex: "roles",
      key: "roles",
      render: (roles: Roles[]) =>
        roles.map((role) => (
          <Tag key={role} color={roleColors[role]}>
            {role}
          </Tag>
        )),
    },
    { title: "Номер телефона", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      key: "status",
      render: (_, user: User) => (
        <Popconfirm
          title={
            user.isBlocked
              ? "разблокировать пользователя?"
              : "заблокировать пользователя?"
          }
          okText="да"
          cancelText="нет"
          onConfirm={() => handleBlockUser(user)}
        >
          <Button>{user.isBlocked ? "Разблокировать" : "Блокировать"}</Button>
        </Popconfirm>
      ),
    },
    {
      dataIndex: "editRoles",
      key: "edit-roles",
      render: (_, user: User) => (
        <Button
          onClick={() => {
            setSelectedRole(user.roles);
            setUserRole(user);
          }}
        >
          изменить роль
        </Button>
      ),
    },
    ...(isAdmin
      ? [
          {
            key: "delete",
            render: (_, user: User) => (
              <Popconfirm
                title="удалить пользователя?"
                okText="да"
                cancelText="нет"
                onConfirm={() => handleDeleteUser(user)}
              >
                <Button>Удалить</Button>
              </Popconfirm>
            ),
          },
        ]
      : []),
    {
      title: "",
      key: "profile",
      render: (_, user: User) => (
        <Button onClick={() => navigate(`/users/${user.id}`)}>профиль</Button>
      ),
    },
  ];

  async function handleChangeRoles() {
    if (!userRole) return;

    try {
      await updateUserRights(userRole.id, { roles: selectedRole });
      setUserRole(null);
      setFilters({ ...filters });
    } catch (error) {
      notification.error({ message: "не удалось изменить роль пользователя!" });
    }
  }

  async function handleDeleteUser(user: User) {
    try {
      await deleteUser(user.id);
      setFilters({ ...filters });
    } catch (error) {
      notification.error({ message: "не удалось удалить пользователя!" });
    }
  }

  async function handleBlockUser(user: User) {
    try {
      if (user.isBlocked) {
        await unblockUser(user.id);
      } else {
        await blockUser(user.id);
      }
      setFilters({ ...filters });
    } catch (error) {
      notification.error({ message: "не удалось изменить статус блокировки!" });
    }
  }

  function hadleFilterCange(value: string) {
    let isBlocked;

    if (value === "blocked") {
      isBlocked = true;
    }

    if (value === "active") {
      isBlocked = false;
    }

    setFilters({ ...filters, isBlocked: isBlocked, page: 1 });
  }

  function handleTableChange(
    pagination: TablePaginationConfig,
    _: unknown,
    sorter: SorterResult<User> | SorterResult<User>[],
  ) {
    const currentSorter = Array.isArray(sorter) ? sorter[0] : sorter;

    let sorterOrder: "asc" | "desc" | undefined;

    if (currentSorter.order === "ascend") {
      sorterOrder = "asc";
    }

    if (currentSorter.order === "descend") {
      sorterOrder = "desc";
    }

    setFilters({
      ...filters,
      page: pagination.current,
      sortBy: currentSorter.field,
      sortOrder: sorterOrder,
    });
  }

  return (
    <>
      {isAdmin && (
        <Select
          defaultValue="all"
          onChange={hadleFilterCange}
          options={[
            { value: "all", label: "все пользователи" },
            { value: "active", label: "только активные" },
            { value: "blocked", label: "только заблокированные" },
          ]}
        />
      )}
      <Input
        placeholder="Поиск по имени или email"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={{
          current: filters.page,
          pageSize: filters.limit,
          total: totalUsers,
          hideOnSinglePage: true,
        }}
        onChange={handleTableChange}
      />
      <Modal
        open={userRole !== null}
        title="смена роли"
        onOk={handleChangeRoles}
        onCancel={() => setUserRole(null)}
        okText="сохранить"
        cancelText="отмена"
        okButtonProps={{ disabled: selectedRole.length === 0 }}
      >
        <Select
          mode="multiple"
          value={selectedRole}
          onChange={setSelectedRole}
          options={Object.values(Roles).map((role) => ({
            value: role,
            label: role,
          }))}
        />
      </Modal>
    </>
  );
}
