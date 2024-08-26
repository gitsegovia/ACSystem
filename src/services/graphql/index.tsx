// ** React imports
import type { ReactNode } from "react"

// ** Apollo imports
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

// ** Config imports
import Uris from "src/configs/uris"

type Props = {
    children: ReactNode
}

const IS_DEV = process.env.NODE_ENV !== "production"

const GraphqlClient = ({ children }: Props) => {
    const cache = new InMemoryCache()

    const client = new ApolloClient({
        connectToDevTools: IS_DEV,
        ssrMode: true,
        cache,
        uri: Uris.genesys,
    })

    return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default GraphqlClient
