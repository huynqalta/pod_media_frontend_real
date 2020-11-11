import { notification } from "antd";
import { ArgsProps } from "antd/lib/notification";

import { ServerTranslateKey } from "@shared/TranslateKey/ImportTranslateKey";
import { CURRENT_LANGUAGE, USA } from "@helper/variable";

export type notification = "success" | "info" | "error" | "warning";
interface Props {
  type?: notification;
  fileTranslateKey?: any;
  notificationProps?: ArgsProps;
}

export const NotificationComponent = (props: Props) => {
  const currentLangue = localStorage.getItem(CURRENT_LANGUAGE) || USA;
  const { notificationProps, type, fileTranslateKey } = props;

  notification.config({ placement: "bottomRight" });
  const __fileTranslateKey = fileTranslateKey || ServerTranslateKey;
  return notification[type || "info"]({
    ...notificationProps,
    message: MessageRespone(__fileTranslateKey, notificationProps["message"] || "", currentLangue),
  });
};

export default NotificationComponent;

export function MessageRespone(fileTranslateKey, keyTranslate, currentLangue) {
  const keyMess = fileTranslateKey[keyTranslate][currentLangue];
  return keyMess;
}
