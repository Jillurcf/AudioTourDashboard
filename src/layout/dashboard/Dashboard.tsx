import React from "react";
import { Avatar, Badge, Layout, Menu, Popover } from "antd";
import { Bell, Lock, LogOut, User, User2Icon } from "lucide-react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/Images/Logo.png";
import logoChoozy from "../../assets/Images/dashboard/pie-chart.svg";
import productListing from "../../assets/Images/dashboard/tag.png";
import productListing1 from "../../assets/Images/dashboard/productlisting1.svg";
import categoryManagement from "../../assets/Images/dashboard/categoryManagement.png";
import categoryManagement1 from "../../assets/Images/dashboard/categoryManagement1.svg";
import transaction1 from "../../assets/Images/dashboard/transactiopns1.svg";
import transaction from "../../assets/Images/dashboard/transaction.svg";
import {
  FaRegUserCircle,
  FaRegHeart,
  FaChartPie,
  FaUserCircle,
  FaLock,
  FaHeart,
} from "react-icons/fa";
import { BsCartXFill, BsCartX } from "react-icons/bs";

import { CiCreditCard1 } from "react-icons/ci";
import { TbPassword } from "react-icons/tb";
import settings from "../../assets/Images/dashboard/settings.png";
import SubMenu from "antd/es/menu/SubMenu";
import "./Styled_components.css";
import { BiPieChartAlt2 } from "react-icons/bi";
import { IoIosCard, } from "react-icons/io";
import { PiPasswordFill } from "react-icons/pi";
import { useGetProfileQuery } from "../../redux/features/getProfleApi";
import { useGetNotificationsQuery } from "../../redux/features/getNotificationApi";
import { usePostLogoutMutation } from "../../redux/features/postLoguout";
import Swal from "sweetalert2";
import { HiOutlineUserGroup, HiUserGroup } from "react-icons/hi2";

const { Header, Sider, Content } = Layout;

interface MenuItem {
  path: string;
  title: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    path: "/",
    title: "Dashboard",
    icon: <BiPieChartAlt2 size={18} color="#4964C6" />,
    activeIcon: <FaChartPie size={18} color="#4964C6" />,
  },
  {
    path: "/manage-users",
    title: "Users",
    icon: <FaRegUserCircle size={18} color="#4964C6" />,
    activeIcon: <FaUserCircle size={18} color="#4964C6" />,
  },
  {
    path: "/category_management",
    title: "Categories",
    icon: <img src={categoryManagement} alt="Logo" width={18} height={18} />,
    activeIcon: (
      <img src={categoryManagement1} alt="Logo" width={18} height={18} />
    ),
  },
  {
    path: "/audioMother",
    title: "Audios",
    icon: (
      <svg
        width="20"
        height="18"
        viewBox="0 0 20 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.55555 17.7778C5.24074 17.7778 4.97703 17.6711 4.76444 17.4578C4.55185 17.2444 4.44518 16.9807 4.44444 16.6667V1.11111C4.44444 0.796296 4.55111 0.532592 4.76444 0.32C4.97777 0.107407 5.24148 0.00074074 5.55555 0H14.4444C14.7592 0 15.0233 0.106667 15.2367 0.32C15.45 0.533333 15.5563 0.797036 15.5555 1.11111V16.6667C15.5555 16.9815 15.4489 17.2455 15.2355 17.4589C15.0222 17.6722 14.7585 17.7785 14.4444 17.7778H5.55555ZM0 14.4444V3.30555C0 2.99074 0.106667 2.73148 0.32 2.52778C0.533333 2.32407 0.797036 2.22222 1.11111 2.22222C1.42518 2.22222 1.68926 2.32889 1.90333 2.54222C2.11741 2.75555 2.2237 3.01926 2.22222 3.33333V14.4722C2.22222 14.787 2.11555 15.0463 1.90222 15.25C1.68889 15.4537 1.42518 15.5555 1.11111 15.5555C0.797036 15.5555 0.533333 15.4489 0.32 15.2355C0.106667 15.0222 0 14.7585 0 14.4444ZM17.7778 14.4444V3.30555C17.7778 2.99074 17.8844 2.73148 18.0978 2.52778C18.3111 2.32407 18.5748 2.22222 18.8889 2.22222C19.2029 2.22222 19.467 2.32889 19.6811 2.54222C19.8952 2.75555 20.0015 3.01926 20 3.33333V14.4722C20 14.787 19.8933 15.0463 19.68 15.25C19.4667 15.4537 19.2029 15.5555 18.8889 15.5555C18.5748 15.5555 18.3111 15.4489 18.0978 15.2355C17.8844 15.0222 17.7778 14.7585 17.7778 14.4444ZM6.66666 15.5555H13.3333V2.22222H6.66666V15.5555Z"
          fill="black"
        />
      </svg>
    ),
    activeIcon: (
      <svg
        width="23"
        height="20"
        viewBox="0 0 23 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.25 20C5.89583 20 5.59917 19.88 5.36 19.64C5.12083 19.4 5.00083 19.1033 5 18.75V1.25C5 0.895833 5.12 0.599167 5.36 0.36C5.6 0.120833 5.89667 0.000833333 6.25 0H16.25C16.6042 0 16.9012 0.12 17.1412 0.36C17.3812 0.6 17.5008 0.896667 17.5 1.25V18.75C17.5 19.1042 17.38 19.4012 17.14 19.6412C16.9 19.8812 16.6033 20.0008 16.25 20H6.25ZM0 16.25V3.71875C0 3.36458 0.12 3.07292 0.36 2.84375C0.6 2.61458 0.896667 2.5 1.25 2.5C1.60333 2.5 1.90042 2.62 2.14125 2.86C2.38208 3.1 2.50167 3.39667 2.5 3.75V16.2812C2.5 16.6354 2.38 16.9271 2.14 17.1562C1.9 17.3854 1.60333 17.5 1.25 17.5C0.896667 17.5 0.6 17.38 0.36 17.14C0.12 16.9 0 16.6033 0 16.25ZM20 16.25V3.71875C20 3.36458 20.12 3.07292 20.36 2.84375C20.6 2.61458 20.8967 2.5 21.25 2.5C21.6033 2.5 21.9004 2.62 22.1412 2.86C22.3821 3.1 22.5017 3.39667 22.5 3.75V16.2812C22.5 16.6354 22.38 16.9271 22.14 17.1562C21.9 17.3854 21.6033 17.5 21.25 17.5C20.8967 17.5 20.6 17.38 20.36 17.14C20.12 16.9 20 16.6033 20 16.25Z"
          fill="#043249"
        />
      </svg>
    ),
  },
  {
    path: "/subscription",
    title: "Subscription",
    icon: <img src={transaction} alt="Logo" width={18} height={18} />,
    activeIcon: <img src={transaction1} alt="Logo" width={18} height={18} />,
  },

  {
    path: "/settings",
    title: "Settings",
    icon: <img src={settings} alt="Logo" width={18} height={18} />,
    activeIcon: (
      <img
        src={settings}
        alt="Logo"
        width={18}
        height={18}
        style={{ filter: "invert(1)" }}
      />
    ),
    children: [
      {
        path: "/settings/aboutus",
        title: "About us",
        icon: <HiOutlineUserGroup size={18} color="#4964C6" />,
        activeIcon: <HiUserGroup size={18} color="#4964C6" />,
      },
      {
        path: "/settings/personalInformation",
        title: "Personal information",
        icon: <FaRegUserCircle size={18} color="#4964C6" />,
        activeIcon: <FaUserCircle size={18} color="#4964C6" />,
      },
      {
        path: "/settings/faq",
        title: "FAQ",
        icon: <Lock size={18} color="#4964C6" />,
        activeIcon: <FaLock size={18} color="#4964C6" />,
      },
      {
        path: "/settings/termsAndCondition",
        title: "Terms & Conditions",
        icon: <CiCreditCard1 color="#4964C6" size={18} />,
        activeIcon: <IoIosCard color="#4964C6" size={18} />,
      },
      {
        path: "/settings/changePassword",
        title: "ChangePassword",
        icon: <TbPassword color="#4964C6" size={18} />,
        activeIcon: <PiPasswordFill color="#4964C6" size={18} />,
      },
    ],
  },
];

const content = (
  <div className="w-40">
    <p className="mb-2">
      <Link
        to="/settings/personalInformation"
        className="flex items-center gap-2"
      >
        <User2Icon size={18} /> <span className="text-md">Profile</span>
      </Link>
    </p>
    <p className="mb-3">
      <Link to="/auth/set-new-password" className="flex items-center gap-2">
        <Lock size={18} /> <span className="text-md">Change password</span>
      </Link>
    </p>
  </div>
);

const Dashboard: React.FC = () => {
  const { data, isLoading, isError } = useGetProfileQuery({});
  console.log("data", data)
  // const { data: notification } = useGetNotificationsQuery();
  // const [postLogout] = usePostLogoutMutation();
  // console.log(data?.data?.full_name);
  const navigate = useNavigate();
  const location = useLocation();
  // const allNotify = notification?.data?.map((item) => item?.read_at) || [];
  // const nullCount = allNotify.filter((nullCont) => nullCont === null).length;
  // console.log("184", nullCount);

  const handleLogout = async () => {
    navigate("/auth/login");
    const gettoken = localStorage.getItem("token");
    console.log("136", gettoken);
    // const response= await postLogout();
    localStorage.removeItem("token");
    // if (response) {
    Swal.fire({
      icon: "success",
      title: "LOGGED OUT",
      text: "Logout Success",
      timer: 3000,
      toast: true,
      position: "center",
      showConfirmButton: false,
    });
    // } else {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Error',
    //     text: 'Failed to update the image.',
    //   });
    // }
    // console.log("138",response)
  };

  const handleNotifications = () => {
    navigate("/notifications");
  };

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return (
          <h1 className="text-[#333333] font-bold text-[24px]">
            <span className="text-[#B0B0B0]">Hello</span> 👋
          </h1>
        );
      case "/audioMother":
        return (
          <h1 className="text-[#333333] font-bold text-[24px]">
            All Audios
          </h1>
        );
      case "/category_management":
        return (
          <h1 className="text-[#333333] font-bold text-[24px]">
            Manage Category
          </h1>
        );
      case "/manage-users":
        return (
          <h1 className="text-[#333333] font-bold text-[24px]">User List</h1>
        );
      case "/subscription":
        return <h1 className="text-[#333333] font-bold text-[24px]">Subscriptions</h1>;
      case "/transactions":
        return (
          <h1 className="text-[#333333] font-bold text-[24px]">Transactions</h1>
        );
      case "/settings":
        return (
          <h1 className="text-[#333333] font-bold text-[24px]">Settings</h1>
        );
      default:
        return (
          <h1 className="text-[#333333] font-bold text-[24px]">
            <span className="text-[#B0B0B0]">Hello</span> 👋
          </h1>
        );
    }
  };
  const getMenuIcon = (
    icon: React.ReactNode,
    activeIcon: React.ReactNode,
    isActive: boolean
  ) => {
    return isActive ? activeIcon : icon;
  };

  return (
    <Layout>
      <Sider
        width={300}
        className="sidebar-menu"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          overflow: "auto",
          zIndex: 2,
        }}
        trigger={null}
      >
        <img src={logo} alt="Logo" className="mx-auto py-6 w-[264px]" />
        <Menu
          mode="inline"
          style={{ background: "#1E1E1E", color: "white" }}
          // defaultSelectedKeys={["1"]}
          selectedKeys={[location.pathname]}
        >
          <div className="flex h-[80vh] flex-col justify-between px-4">
            <div>
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                if (item.children) {
                  return (
                    <SubMenu
                      key={`submenu-${index}`}
                      title={item.title}
                      icon={getMenuIcon(item.icon, item.activeIcon, isActive)}
                      style={{
                        color: isActive ? "red" : "#fff",
                        fontWeight: isActive ? "bold" : "normal",
                        fontSize: "16px",
                        marginBottom: "10px",
                        backgroundColor: isActive ? "#F2F5FC" : "transparent",
                      }}
                    >
                      {item.children.map((child, childIndex) => (
                        <Menu.Item
                          key={`child-${childIndex}`}
                          icon={getMenuIcon(
                            child.icon,
                            child.activeIcon,
                            location.pathname === child.path
                          )}
                          style={{
                            color:
                              location.pathname === child.path ? "red" : "#fff",
                            fontWeight:
                              location.pathname === child.path
                                ? "bold"
                                : "normal",
                            fontSize: "16px",
                          }}
                        >
                          <Link to={child.path}>{child.title}</Link>
                        </Menu.Item>
                      ))}
                    </SubMenu>
                  );
                } else {
                  return (
                    <Menu.Item
                      key={`item-${index}`}
                      icon={getMenuIcon(item.icon, item.activeIcon, isActive)}
                      style={{
                        color: isActive ? "red" : "#fff",
                        fontWeight: isActive ? "bold" : "normal",
                        fontSize: "16px",
                        marginBottom: "10px",
                        backgroundColor: isActive ? "#F2F5FC" : "transparent",
                      }}
                    >
                      <Link to={item.path}>{item.title}</Link>
                    </Menu.Item>
                  );
                }
              })}
            </div>
            <div className="flex gap-8 w-full">
              <div className="flex gap-2 items-center">
                <Popover
                  className="cursor-pointer"
                  placement="top"
                  content={content}
                >
                  <Avatar
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "gray",
                    }}
                    icon={<User size={20} />}
                  />
                </Popover>
                <div className="space-y-4">
                  <h1 className="text-black">{data?.data?.name.slice(0, 18)}</h1>
                  <h1 className="text-black">{data?.data?.email}</h1>
                </div>
              </div>
              <Menu.Item
                key="500"
                icon={<LogOut size={20} />}
                style={{ color: "red", fontSize: "16px" }}
                onClick={handleLogout}
              />
            </div>
          </div>
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: 300 }}>
        <Header
          style={{
            position: "fixed",
            width: "calc(100% - 300px)",
            top: 0,
            left: 300,
            background: "#F6F6F6",
            height: "80px",
            paddingTop: "20px",
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="w-full flex justify-between">
            <div>{getTitle()}</div>
            {/* <div
              onClick={handleNotifications}
              className="cursor-pointer"
              style={{ zIndex: 11 }}
            >
              <Badge count={nullCount}>
                <Bell size={30} color="gray" />
              </Badge>
            </div> */}
          </div>
        </Header>

        <Content
          style={{
            marginTop: 80,
            padding: "20px",
            overflowY: "auto",
            height: `calc(100vh - 80px)`,
            background: "#1e1e1ef7",
          }}
        >
          <div className="h-full m-2 rounded p-3">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
