
const domain = import.meta.env.VITE_AUTH0_DOMAIN as string
const clientId = import.meta.env.VITE_CLIENT_ID as string
const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL as string
const identifier = import.meta.env.VITE_IDENTIFIER as string

export {
    domain,
    clientId,
    redirectUri,
    identifier
}