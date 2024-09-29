import { AppState, Auth0Provider } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import {domain,clientId, redirectUri, identifier} from '../utils/envConfig'

type props = {
    children: React.ReactNode
}

export default function Auth0ProviderWithNavigate(
    {children}: props
){
    
    const navigate = useNavigate()
    if (!domain || !clientId || !redirectUri){
        throw new Error("Unable to initialize auth")
    }
    const onRedirectCallback = (appState:AppState)=>{
        
         navigate(appState.returnTo ? appState.returnTo : '/auth-callback')
    } 
    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
                audience: identifier
        }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    )
}