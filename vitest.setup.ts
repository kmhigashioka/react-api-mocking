import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './src/mocks/node'
import 'vitest-dom/extend-expect'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
