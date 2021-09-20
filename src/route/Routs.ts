import GetById from "../components/GetById"
import { Main } from "../components/Main"


export enum paths{
   Main='/',
   uniq='/main/:id'
}

export const Routes=[
        {components:Main, path:paths.Main,exact:true },
        {components:GetById, path:paths.uniq,exact:true }
]

