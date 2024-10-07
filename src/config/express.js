import express from 'express'
import cors from 'cors'
import router from '../api/v1/routes/index.js'
import {} from 'dotenv/config'
import db from './mongoDB.js'
const port = process.env.PORT || 8080

const configExpressApp = async (app) => {
	db.connect()
	app.set('port', port)
	app.use(cors())
	app.use(express.json())
	app.use(express.urlencoded({extended: true}))
	app.use(router)
	//error handler middleware
	app.use((error, req, res, next) => {
		return res.json({
			status:"error",
			message:error.message,
			stack:error.stack,   
			code:error.status||500
		})
	})
	app.get('/', async function (req, res) {
		try {
			res.status(200).json({message: 'The server is waiting for you, my KING !!!'})
		} catch (err) {
			res.status(500).json({message: err.message})
		}
	})

	app.listen(app.get('port'), async () => {
		try {
			console.log(`start server at port: ${app.get('port')}`)
		} catch (err) {
			console.log(err)
		}
	})
	return app
}

export default configExpressApp
