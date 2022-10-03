import { Mock } from 'jest-mock'

export type ApiCallParameters = { body: { variables: any } }

export const apiCallsMatching = (
  mockFetch: Mock<any>,
  callIdentifier: string
): ApiCallParameters[] => {
  const calls = (mockFetch.mock.calls as unknown) as [string, { body: string }][]
  const matchingQueries = calls.filter((kall) => {
    if (kall[0] !== '/api/') {
      return false
    }

    const query: string = JSON.parse(kall[1].body).query
    return query.includes(callIdentifier)
  })

  return matchingQueries.map((matchingQuery) => {
    const parsedBody = JSON.parse(matchingQuery[1].body)
    return { body: { variables: parsedBody.variables } }
  })
}

export type MockEndpoint = { build: () => any }
export type MockEndpoints = [RegExp, MockEndpoint][]
type MockRouter = {
  request: (query: string) => any
  reroute: (newEndpoints: MockEndpoints) => void
}

const createMockRouter = (originalMockEndpoints: MockEndpoints): MockRouter => {
  let endpoints = originalMockEndpoints

  const request = (query: string) => {
    const match = endpoints.find(([path, _value]) => query.match(path))
    if (match === undefined) {
      throw `stubbed BaseQuery got unexpected URL "${query}"`
    }
    return match[1].build()
  }

  const reroute = (newEndpoints: MockEndpoints) => {
    endpoints = newEndpoints
  }

  return { request, reroute }
}

export const stubQueries = (originalMockEndpoints: MockEndpoints) => {
  const router = createMockRouter(originalMockEndpoints)

  jest.mock('../../browser/src/Query', () => ({
    BaseQuery: ({ children, query }: any) => {
      const response = router.request(query)
      const mockGraphqlResponse = { data: response }
      return children(mockGraphqlResponse)
    },
  }))

  return router
}

export const staticResponse = (data: any) => ({ build: () => data })
