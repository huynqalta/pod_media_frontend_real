import ButtonComponent from '@components/commons/ButtonComponent/Button.Component'
import React, { useRef, useState } from 'react'
import ExcelJS from "exceljs"

import "./styles.scss";
import { useTranslate } from '@shared/Hook';
import { CommonTranslateKey } from '@shared/TranslateKey/ImportTranslateKey';

interface Props {
    isLoading?:(loading)=>boolean
    onFinish?:(value:{data:any[] , fileName:any})=>void,
    text?:string
}

const ImportCodeComponent = (props: Props) => {
   const {CHOOSE_FILE} =  useTranslate(CommonTranslateKey)
    const [isLoading, setIsLoading] = useState(false)
    const onFinish = (response) =>{
        resetImport()
        props.onFinish(response)
        setIsLoading(false);
    }
    const inputUpload: any = useRef("");
    const Upload = async event => {
        setIsLoading(true);
  
      const fileName = event.target.files[0].name
        let regex = /^([a-zA-Z0-9\s_\\.\-:()])+(.xls|.xlsx|.csv)$/;
        if (regex.test(event.target.value.toLowerCase())) {
          if (typeof FileReader != "undefined") {
            let reader = new FileReader();
            reader.readAsBinaryString(event.target.files[0]);
            if (reader.readAsBinaryString) {
              reader.onload = function (e: any) {
                ProcessExcel(e.target.result , fileName);
              };
            }
          } else {
            console.log("This browser does not support HTML5.");
            setIsLoading(false);
          }
        } else {
          console.log("Please upload a valid Excel file.");
          setIsLoading(false);
        }
    
        // let formData = new FormData();
        // const rawData = [];
        // formData.append("FileImport", event.target.files[0]);
      };
      const key = {
        PromoCode: ["mã khuyến mãi", "promocode", "PromoCode"],
        PhoneNumber: ["người sở hữu", "phone number", "owner", "PhoneNumber"],
        Status: ["trạng thái", "status", "Status"],
        Note: ["ghi chú", "note", "Note"],
      };
      const keyArray = ["promo code"];
      const ProcessExcel = (data: any , fileName:any) => {
        const wb = new ExcelJS.Workbook();
        wb.xlsx.load(data).then(workbook => {
          const dataRequest = [];
          const ObjRequest =  {}
          let header = [];
          workbook.eachSheet((sheet, id) => {
            sheet.eachRow((row, rowIndex) => {
              
              if(rowIndex != 1){
                let currentStatus = 0
                if(ObjRequest[row.values[1]]){
                  //process duplicate
                  currentStatus = 2
                  //prev valueDupplicate
                  dataRequest.map(item => {
                    if(item.codeValue === row.values[1]){
                      item.statusResult = 2
                      return item
                    }
                    return item
                  })
                }else{
                  ObjRequest[row.values[1]] = row.values[1]
                }
                dataRequest.push({codeValue:row.values[1] , statusResult:currentStatus , codeId:rowIndex , stt:dataRequest.length+1})
              }
            });
          });
          
          onFinish({data:dataRequest , fileName:fileName} )
        });
      };

      const resetImport = () => {
        inputUpload.current.value = "";
      };
      
    return (
        <div className="wrap-import">
           <ButtonComponent
            style={{ padding: 0 }}
            disabled={isLoading}
            classNames="btn button-upload bg-general mx-auto text-white text-center"
            text={
              <>
                <label htmlFor={"upload-file"} className="text-white lbl ">
                  <i className="fa fa-upload mr-1"> </i>{props.text || CHOOSE_FILE}
                </label>
                <input
                  type="file"
                  id={"upload-file"}
                  className="upload-file-input"
                  ref={inputUpload}
                  disabled={isLoading}
                  onChange={Upload}
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
              </>
            }
          />
       <div className={`lds-ellipsis ${isLoading ? "d-inline-block" : "d-none"} `}><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default ImportCodeComponent
