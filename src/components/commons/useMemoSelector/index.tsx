import React from 'react'
import { useSelector } from 'react-redux'

interface IUseMemoSelector {
  Reducer: string
  ListValue: Array<string>
}

const useMemoSelector = (Reducer: string, ListValue: Array<string>) => {
  const object: any = {}
  for (let i = 0; i < ListValue.length; i++) {
    object[ListValue[i]] = useSelector((state: any) => state[Reducer][ListValue[i]])
  }
  return object
}
export default useMemoSelector
