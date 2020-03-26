import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import passport from 'passport'

import postsRoutes from './routes/posts.routes'
import usersRoutes from './routes/users.routes'
import specs from './swagger'
import passportMiddleware from './middlewares/passport'

const app = express()

// settings
app.set('port', process.env.PORT || 3003)

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(passport.initialize())
passport.use(passportMiddleware)


app.get('/', (req, res) => {
    return res.send(`The API is at http://localhost:${app.get('port')}`)
})

app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs)
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));

app.use('/posts', postsRoutes)
app.use('/users', usersRoutes)

export default app;
