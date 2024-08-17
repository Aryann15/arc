import { Hono } from 'hono'
import { cors } from 'hono/cors'
const app = new Hono()
app.use('/*', cors())
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/upload', async (c) => {
  const image = await c.req; 
  console.log("Received data : ", image)
  return c.json({ message: 'Data received successfully' });
})

export default app
