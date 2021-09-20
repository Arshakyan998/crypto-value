import React, { ReactElement } from 'react'
import { Redirect, Route, Switch } from 'react-router'


import {Routes} from './Routs'


export default function Routing(): ReactElement {
        
        
        return (
                <div>
                        <Switch>

                        {
                             Routes.map(el=>{
      return <Route path={el.path} component={el.components} exact={el.exact} key={el.path}/>
                             })   
                        }
                        <Redirect to={'/'}/>
                        </Switch>
                </div>
        )
}
