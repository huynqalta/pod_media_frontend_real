import {
  CHANGE_PASS,
  CUSTOMERS,
  CUSTOMER_CREATE,
  CUSTOMER_DETAIL,
  DEVICES,
  DEVICE_CREATE,
  DEVICE_DETAIL,
  USERS,
  USER_CREATE,
  USER_DETAIL,
  SURVEY,
  SESSION,
  QUESTION,
  LOCATION,
  LOCATION_EDIT,
  LOCATION_DETAIL,
  SURVEY_QUESTION,
  CAMPAIGN_MANAGER, CAMPAIGN_DETAIL, CAMPAIGN_UPDATE, CAMPAIGN_CREATE, DEVICES_ADD, LOCATION_MAP
  , EDIT_ADD
} from "@modules/router-paths";
import {
  faTachometerAlt,
  faUsersCog,
  faUserFriends,
  faLaptopMedical,
  faPencilAlt,
  faQuestion,
  faNewspaper,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem } from "./interface";



export const routerSidebar: Array<NavItem> = [
  {
    name: {
      USA: "Dashboard",
      VNM: "Trang Chủ",
    },
    flgAwesome: true,
    icon: faTachometerAlt,
    path: "/dashboard",
    permissionCode: "ALLOW",
    activePath: ["/dashboard", "/"],
    children: [],
    exact: true,
  },
  {
    name: {
      USA: "Devices",
      VNM: "Thiết bị",
    },
    flgAwesome: true,
    icon: faLaptopMedical,
    path: DEVICES,
    permissionCode: "ALLOW",
    activePath: [DEVICES, DEVICE_DETAIL, DEVICES_ADD, EDIT_ADD],
    exact: true,
    children: [
      {
        name: {
          USA: "Device Detail",
          VNM: "Chi tiết thiết bị",
        },
        flgAwesome: true,
        icon: faLaptopMedical,
        path: DEVICE_DETAIL,
        permissionCode: "ALLOW",
        ishidden: true,
        activePath: [DEVICE_DETAIL],
        exact: true,
        children: [],
      },
    ],
  },
  {
    name: {
      USA: "Customers",
      VNM: "Khách hàng",
    },
    flgAwesome: true,
    icon: faUserFriends,
    path: CUSTOMERS,
    permissionCode: "ALLOW",
    activePath: [CUSTOMERS, CUSTOMER_CREATE, CUSTOMER_DETAIL],
    children: [],
  },
  {
    name: {
      USA: "Campaign Code",
      VNM: "Mã chiến dịch",
    },
    flgAwesome: true,
    icon: faUserFriends,
    path: CAMPAIGN_MANAGER,
    permissionCode: "ALLOW",
    activePath: [CAMPAIGN_MANAGER, CAMPAIGN_DETAIL, CAMPAIGN_CREATE, CAMPAIGN_UPDATE],
    children: [
      {
        name: {
          USA: "Campaign Code Detail",
          VNM: "Chi Tiết Mã Chiến Dịch",
        },
        path: CAMPAIGN_DETAIL,
        permissionCode: "ALLOW",
        ishidden: true,
        activePath: [CAMPAIGN_DETAIL],
        children: []
      },

      {
        name: {
          USA: "Campaign Create",
          VNM: "Tạo Chiến Dịch",
        },
        path: CAMPAIGN_CREATE,
        permissionCode: "ALLOW",
        ishidden: true,
        activePath: [CAMPAIGN_CREATE],
        children: []
      },
      {
        name: {
          USA: "Campaign Update",
          VNM: "Cập nhật Chiến Dịch",
        },
        path: CAMPAIGN_UPDATE,
        permissionCode: "ALLOW",
        ishidden: true,
        activePath: [CAMPAIGN_UPDATE],
        children: []
      },
    ],
  },
  {
    name: {
      USA: "Users",
      VNM: "Người dùng",
    },
    flgAwesome: true,
    icon: faUsersCog,
    path: USERS,
    permissionCode: "ALLOW",
    activePath: [USERS, USER_CREATE, USER_DETAIL],
    children: [],
  },
  {
    name: {
      USA: "Survey",
      VNM: "Khảo sát",
    },
    flgAwesome: true,
    icon: faPencilAlt,
    path: SURVEY,
    permissionCode: "ALLOW",
    activePath: [SURVEY, SESSION, SURVEY_QUESTION, QUESTION],
    children: [
      {
        name: {
          USA: "Session",
          VNM: "Phần",
        },
        flgAwesome: true,
        icon: faNewspaper,
        path: SESSION,
        permissionCode: "ALLOW",
        // ishidden: true,
        activePath: [SESSION],
        exact: true,
        children: [],
      },
      {
        name: {
          USA: "Question",
          VNM: "Câu hỏi",
        },
        flgAwesome: true,
        icon: faQuestion,
        path: QUESTION,
        permissionCode: "ALLOW",
        // ishidden: true,
        activePath: [QUESTION],
        exact: true,
        children: [],
      },
    ],
  },
  {
    name: {
      USA: "Location",
      VNM: "Địa điểm",
    },
    flgAwesome: true,
    icon: faLocationArrow,
    path: LOCATION,
    permissionCode: "ALLOW",
    activePath: [LOCATION, LOCATION_MAP, LOCATION_DETAIL, LOCATION_EDIT],
    children: [
      {
        name: {
          USA: "Location Edit",
          VNM: "Thêm Địa điểm",
        },
        flgAwesome: true,
        icon: faNewspaper,
        path: LOCATION_EDIT,
        permissionCode: "ALLOW",
        ishidden: true,
        activePath: [LOCATION_EDIT],
        children: [],
      },
      {
        name: {
          USA: "Location Detail",
          VNM: "chi tiết địa điểm",
        },
        flgAwesome: true,
        icon: faQuestion,
        path: LOCATION_DETAIL,
        permissionCode: "ALLOW",
        ishidden: true,
        activePath: [LOCATION_DETAIL],
        children: [],
      },
      {
        name: {
          USA: "Location Map",
          VNM: "Bản đồ vị trí",
        },
        flgAwesome: true,
        icon: faQuestion,
        path: LOCATION_MAP,
        permissionCode: "ALLOW",
        ishidden: true,
        activePath: [LOCATION_MAP],
        children: [],
      },
    ]
  },
  {
    name: {
      USA: "Change Password",
      VNM: "Đổi Mật Khẩu",
    },
    ishidden: true,
    path: CHANGE_PASS,
    permissionCode: "ALLOW",
    activePath: [CHANGE_PASS],
    children: [],
  },
  {
    name: {
      USA: "New Device",
      VNM: "Thêm thiết bị",
    },
    flgAwesome: true,
    icon: faUsersCog,
    path: DEVICES_ADD,
    permissionCode: "ALLOW",
    activePath: [DEVICES_ADD],
    children: [],
    ishidden: true,
  },
  {
    name: {
      USA: "Edit Device",
      VNM: "Cập nhật thiết bị",
    },
    flgAwesome: true,
    icon: faUsersCog,
    path: EDIT_ADD,
    permissionCode: "ALLOW",
    activePath: [EDIT_ADD ],
    children: [],
    ishidden: true,
  },
  {
    name: {
      USA: "Add Device",
      VNM: "Thêm mới thiết bị",
    },
    flgAwesome: true,
    icon: faUsersCog,
    path: DEVICES_ADD,
    permissionCode: "ALLOW",
    activePath: [DEVICES_ADD ],
    children: [],
    ishidden: true,
  },
];
