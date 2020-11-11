import { IconComponentProps } from "@ant-design/icons/lib/components/AntdIcon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
export interface NavItem {
  name: TranslateLanguage;
  flgAwesome?: boolean;
  icon?: IconProp;
  iconAnt?: any;
  path: string;
  permissionCode: string;
  activePath: Array<string>;
  children: Array<NavItem>;
  
  exact?: boolean;
  ishidden?: boolean;
}
export interface TranslateLanguage {
  USA: string;
  VNM: string;
}
