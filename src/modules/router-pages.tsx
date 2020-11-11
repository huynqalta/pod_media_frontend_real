import React from "react";
import Loadable from "react-loadable";
import LoadingComponent from "../components/commons/LoadingComponent/loadingComponent";
import {
  CUSTOMERS,
  CUSTOMER_DETAIL,
  DEVICES,
  DEVICE_DETAIL,
  USERS,
  CHANGE_PASS,
  SESSION,
  QUESTION, DEVICES_ADD,
  SURVEY_QUESTION,
  CAMPAIGN_MANAGER,
  CAMPAIGN_DETAIL,

  CAMPAIGN_CREATE,
  CAMPAIGN_UPDATE,
  LOCATION,
  LOCATION_EDIT,
  LOCATION_DETAIL,
  LOCATION_MAP,
  DEVICE_DASHBOARD, EDIT_ADD, DEVICE_MAP,
} from "./router-paths";
import ChangePassword from "@modules/Auth/ChangePassword";


const UserPage = Loadable({
  loader: () => import("./User"),
  loading: LoadingComponent,
});
const Devices = Loadable({
  loader: () => import("./Devices"),
  loading: LoadingComponent,
});
const DetailDevice = Loadable({
  loader: () => import("./DetailDevice"),
  loading: LoadingComponent,
});

const Dashboard = Loadable({
  loader: () => import("./Dashboard"),
  loading: LoadingComponent,
});

const PageNotFound = Loadable({
  loader: () => import("./PageNotFound"),
  loading: LoadingComponent,
});

const CustomersPage = Loadable({
  loader: () => import("./Customers/index"),
  loading: LoadingComponent,
});
const LocationPage = Loadable({
  loader: () => import("./Location"),
  loading: LoadingComponent,
});
const LocationEditPage = Loadable({
  loader: () => import("./Location/Edit"),
  loading: LoadingComponent,
});
const LocationDetailPage = Loadable({
  loader: () => import("./Location/Details"),
  loading: LoadingComponent,
});
const LocationMapPage = Loadable({
  loader: () => import("./Location/Map"),
  loading: LoadingComponent,
});
const DevicesMapPage = Loadable({
  loader: () => import("./Location/Details/Map"),
  loading: LoadingComponent,
});
const DetailCustomersPage = Loadable({
  loader: () => import("./Customers/component/DetailCustomer/index"),
  loading: LoadingComponent,
});

const Session = Loadable({
  loader: () => import("./Survey/pages/Session"),
  loading: LoadingComponent,
});
const Question = Loadable({
  loader: () => import("./Survey/pages/Question"),
  loading: LoadingComponent,
});
const SurveyQuestion = Loadable({
  loader: () => import("./Survey/pages/SurveyQuestion"),
  loading: LoadingComponent,
});
const CampaignManager = Loadable({
  loader: () => import("./CampaignManager"),
  loading: LoadingComponent,
});
const CampaignDetail = Loadable({
  loader: () => import("./CampaignManager/CampaignDetail"),
  loading: LoadingComponent,
});
const CampaignCode = Loadable({
  loader: () => import("./CampaignManager/CampaignCode"),
  loading: LoadingComponent,
});
const AddNewDevice = Loadable({
  loader: () => import("./Devices/PageAddDevice/index"),
  loading: LoadingComponent,
});
const DeviceDashboard = Loadable({
  loader: () => import("./Dashboard/pages/DeviceDashboard"),
  loading: LoadingComponent,
});
// const DetailCustomersPage = Loadable({
//     loader: () => import("./Customers/component/DetailCustomer/index"),
//     loading: LoadingComponent,
// });
// const DetailCustomersPage = Loadable({
//     loader: () => import("./Customers/component/DetailCustomer/index"),
//     loading: LoadingComponent,
// });

export const router: Array<object> = [

  {
    path: ["/", "/dashboard", "/dashboard/:id", "/dashboard/:id/:type"],
    exact: true,
    permissionCode: "ALLOW",
    main: () => <Dashboard />,
  },
  {
    path: DEVICES,
    exact: true,
    permissionCode: "ALLOW",
    main: () => <Devices />,
  },
  {
    path: DEVICES_ADD,
    exact: true,
    permissionCode: "ALLOW",
    main: () => <AddNewDevice />,
  },
  {
    path: EDIT_ADD,
    exact: true,
    permissionCode: "ALLOW",
    main: () => <AddNewDevice />,
  },
  {
    path: `${DEVICE_DETAIL}/:deviceId`,
    exact: true,
    permissionCode: "ALLOW",
    main: () => <DetailDevice />,
  },
  {
    path: CUSTOMERS,
    exact: true,
    permissionCode: "ALLOW",
    main: () => <CustomersPage />,
  },
  {
    path: LOCATION,
    exact: true,
    permissionCode: "ALLOW",
    main: () => <LocationPage />,
  },
  {
    path: `${DEVICE_MAP}/:locationId/:deviceId`,
    exact: true,
    permissionCode: "ALLOW",
    main: () => <DevicesMapPage />,
  },
  {
    path: [LOCATION_EDIT, `${LOCATION_EDIT}/:id`],
    exact: true,
    permissionCode: "ALLOW",
    main: () => <LocationEditPage />,
  },
  {
    path: `${LOCATION_DETAIL}/:id`,
    exact: true,
    permissionCode: "ALLOW",
    main: () => <LocationDetailPage />,
  },
  {
    path: `${LOCATION_MAP}/:id`,
    exact: true,
    permissionCode: "ALLOW",
    main: () => <LocationMapPage />,
  },
  {
    path: CUSTOMER_DETAIL,
    exact: true,
    permissionCode: "ALLOW",
    main: () => <DetailCustomersPage />,
  },
  {
    path: USERS,
    exact: true,
    permissionCode: "ALLOW",
    main: () => <UserPage />,
  },
  {
    path: CHANGE_PASS,
    exact: true,
    main: () => <ChangePassword />,
  },
  {
    path: SESSION,
    exact: true,
    permissionCode: "ALLOW",
    main: () => <Session />,
  },
  {
    path: QUESTION,
    exact: true,
    permissionCode: "ALLOW",
    main: () => <Question />,
  },
  {
    path: SURVEY_QUESTION,
    exact: true,
    permissionCode: "ALLOW",
    main: () => <SurveyQuestion />,
  },
  {
    path: CAMPAIGN_MANAGER,
    exact: true,
    permissionCode: "ALLOW",
    main: () => <CampaignManager />,
  },
  {
    path: CAMPAIGN_DETAIL + "/:id",
    exact: true,
    permissionCode: "ALLOW",
    main: () => <CampaignDetail />,
  },
  {
    path: [CAMPAIGN_CREATE, `${CAMPAIGN_UPDATE}/:id`],
    exact: true,
    permissionCode: "ALLOW",
    main: () => <CampaignCode />,
  },
  {
    path: DEVICE_DASHBOARD,
    exact: true,
    permissionCode: "ALLOW",
    main: () => <DeviceDashboard />,
  },
  {
    path: "",
    exact: true,
    permissionCode: "ALLOW",
    main: () => <PageNotFound />,
  },
];
