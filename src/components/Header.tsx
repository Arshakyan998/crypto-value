import React from 'react'
import servicWorker from '../servicWorker/servicWorker'
import useFetching from '../userHooks/useFetching'
import { useHistory } from 'react-router'

import {value} from './Main'

import './header.scss'

export const Header:React.FC = ():React.ReactElement => {
        const history=useHistory()
        const [date,setDate]=React.useState<value[]>()
        const [cloneDate,setCloneDate]=React.useState<value[]>()

        const [value,setValue]=React.useState<string>('')

       const {getDate,loading,error}= useFetching(async()=>{
               const date= await servicWorker.searchQuery()
               setDate(date)

       })

       React.useEffect(()=>{
        getDate()
       },[])
      
       const serchValue:React.ChangeEventHandler<HTMLInputElement> =(e):void=>{
        setValue(e.target.value.toLowerCase())
       }

       React.useMemo(()=>{
        const result=date&&[...date].filter(el=>el.name.toLowerCase().includes(value))
        setCloneDate(result)
       },[value])
       
        
        return (
                <header className="header_main">     
                   <input type="text" onChange={serchValue}/>

                        {value &&
                        <div className='header_main_search_result'>
                                {
                                        cloneDate?.length?cloneDate.map(el=>{
         return <div key={el.id}
          className='header_main_search_result_query' 
          onClick={()=>history.push(`/main/${el.id}`)}>
                                        <img src={el.image} alt="" /> <span>{el.name}</span></div>
                                        }):<p className='header_main_search_result_query'>По вашему запросу нечего не найденно </p>
                                }

                        </div>
                         }  
                </header>
        )
}
