import React, {useContext} from "react";
import {Dropdown, Menu} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLanguage} from "@fortawesome/free-solid-svg-icons";
import {LanguageContext} from "@shared/Context/Language";

const MenuLanguage = () => {
    const {language, setLanguage} = useContext(LanguageContext);

    const menuLang = (
        <Menu>
            <Menu.Item>
                <a className={language == "USA" && "active"} onClick={() => setLanguage("USA")}>
                    English
                </a>
            </Menu.Item>
            <Menu.Item>
                <a className={language == "VNM" && "active"} onClick={() => setLanguage("VNM")}>
                    Việt Nam
                </a>
            </Menu.Item>
        </Menu>
    );

    return(
        <>
            <Dropdown trigger={["click"]} overlay={menuLang} placement="bottomCenter" arrow>
                <a>
                    {" "}
                    <FontAwesomeIcon color="#2581BC" style={{fontSize: "2rem", cursor: "pointer"}}
                                     icon={faLanguage}/>
                </a>
            </Dropdown>
        </>
    )
};

export default MenuLanguage