import {LanguageContext} from "@shared/Context/Language";
import {useTranslate} from "@shared/Hook";
import {DevicesTranslatekey} from "@shared/TranslateKey/ImportTranslateKey";
import React, {useContext} from "react";
import ListDevice from "./Components/ListDevice";
import {Tabs} from 'antd';

import "./styles.scss";
import NestedTable from "@modules/Devices/components/ListGroupDevice";

interface Props {
}

const {TabPane} = Tabs;

const Devices = (props: Props) => {
    const {language} = useContext(LanguageContext);
    const {TITLE, GROUP_DEVICE} = useTranslate(DevicesTranslatekey);
    return (
        <section className="Device-list">
            <Tabs defaultActiveKey="1">
                <TabPane tab={TITLE} key="1">
                    <ListDevice
                        useTranslate={useTranslate(DevicesTranslatekey)}
                        language={language}
                    />
                </TabPane>
                <TabPane tab={GROUP_DEVICE} key="2">
                   <NestedTable/>
                </TabPane>
            </Tabs>
        </section>
    );
};

export default Devices;
