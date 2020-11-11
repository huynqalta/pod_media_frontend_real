
import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'
import {Row , Col , List} from "antd"
import   "./styles.scss"
interface Props {
    
}

const tempAvatar = require("@assets/images/logo.png")


const ListLocation = (props) => {
    return (
    
        <>
           <Col className="list-location" span={10}>
           <List
                header={ <div className="w-100">
                    <img style={{width:"100%"}} src={tempAvatar} alt=""/>
                </div>}
                //  footer={<div>Footer</div>}
                dataSource={[1 ,2 ,2,3,4]}
                renderItem={item => 
                <List.Item>{item + " "  + "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium vero ut voluptatum blanditiis excepturi sunt nostrum. Iure facilis est quas explicabo maxime, dicta, dolor aspernatur officiis excepturi ipsa praesentium ipsam!"}
                </List.Item>}
            />
           </Col>
           
        </>
    )
}

export default ListLocation
