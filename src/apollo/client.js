import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

let apolloClient = null

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent, { ssr = false } = {}) {
	const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
		const client = apolloClient || initApolloClient(apolloState)
		return (
			<ApolloProvider client={client}>
				<PageComponent {...pageProps} />
			</ApolloProvider>
		)
	}

	// Set the correct displayName in development
	if (process.env.NODE_ENV !== 'production') {
		const displayName = PageComponent.displayName || PageComponent.name || 'Component'

		if (displayName === 'App') {
			console.warn('This withApollo HOC only works with PageComponents.')
		}

		WithApollo.displayName = `withApollo(${displayName})`
	}

	if (ssr || PageComponent.getInitialProps) {
		WithApollo.getInitialProps = async ctx => {
			const { AppTree } = ctx

			// Initialize ApolloClient, add it to the ctx object so
			// we can use it in `PageComponent.getInitialProp`.
			const apolloClient = (ctx.apolloClient = initApolloClient())

			// Run wrapped getInitialProps methods
			let pageProps = {}
			if (PageComponent.getInitialProps) {
				pageProps = await PageComponent.getInitialProps(ctx)
			}

			// Only on the server:
			if (typeof window === 'undefined') {
				// When redirecting, the response is finished.
				// No point in continuing to render
				if (ctx.res && ctx.res.finished) {
					return pageProps
				}
			}

			// Extract query data from the Apollo store
			const apolloState = apolloClient.cache.extract()
			return {
				...pageProps,
				apolloState,
			}
		}
	}

	return WithApollo
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState) {
	// Make sure to create a new client for every server-side request so that data
	// isn't shared between connections (which would be bad)
	if (typeof window === 'undefined') {
		return createApolloClient(initialState)
	}

	// Reuse client on the client-side
	if (!apolloClient) {
		apolloClient = createApolloClient(initialState)
	}

	return apolloClient
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
export function createApolloClient(initialState = {}, link = undefined) {
	const ssrMode = typeof window === 'undefined'
	const cache = new InMemoryCache().restore(initialState)

	return new ApolloClient({
		ssrMode,
		link: link ? link : createIsomorphLink(),
		cache,
	})
}

function createIsomorphLink() {
	const { HttpLink } = require('apollo-link-http')
	return new HttpLink({
		uri: 'https://api.thegraph.com/subgraphs/name/graphprotocol/graph-network-mainnet',
	})
}
