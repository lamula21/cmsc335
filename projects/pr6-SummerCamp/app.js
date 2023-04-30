const express = require('express')
const path = require('path')
const { argv } = require('process')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb')

// ----------- Set up .env, Database and Collection Name -----------
require('dotenv').config()
const username = process.env.MONGO_DB_USERNAME
const password = process.env.MONGO_DB_PASSWORD
const dbName = process.env.MONGO_DB_NAME
const collectionName = process.env.MONGO_COLLECTION
const databaseAndCollection = {
	db: dbName,
	collection: collectionName,
}

// ----------- Connect to MongoDB -----------
const uri = `mongodb+srv://${username}:${password}@cluster0.xd8u9.mongodb.net/${dbName}?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
})

// ----------- Set up App -----------
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', '.ejs')

// App config
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // reading user input from form
app.use(express.static(path.join(__dirname, 'public')))

// ------------------ ROUTES ------------------

// GET - home page
app.get('/', (req, res) => {
	res.render('home')
})

// Get - apply page
app.get('/apply', (req, res) => {
	res.render('apply')
})
// POST - applyResult page - Insert applicant to DB
app.post('/applyResult', async (req, res) => {
	const { username, email, gpa, info } = req.body
	const now = new Date()

	try {
		await client.connect()

		const applicantsCollection = client
			.db(databaseAndCollection.db)
			.collection(databaseAndCollection.collection)

		// Insert applicant to DB
		await applicantsCollection.insertOne({
			username: username,
			email: email,
			gpa: parseInt(gpa),
			info: info,
			date: now,
		})

		await client.close()

		return res.render('applyResult', {
			username: username,
			email: email,
			gpa: parseInt(gpa),
			info: info,
			date: now,
		})
	} catch (error) {
		console.error(error)
	}
})

// GET - review page
app.get('/review', (req, res) => {
	res.render('review')
})
// POST - reviewResult page
app.post('/reviewResult', async (req, res) => {
	const { email } = req.body
	const filter = { email: email }
		
	try {
		await client.connect()

		const applicantCollection  = client
			.db(databaseAndCollection.db)
			.collection(databaseAndCollection.collection)

		const applicant = await applicantCollection.findOne( filter )

		if(!applicant) {
			return res.render('reviewResult', { 
				username: 'None',   
				email: 'None',
				gpa: 'None',
				info: 'None',
				date: 'None'
			})
		}

		await client.close()

		res.render('reviewResult', { 
			username: applicant.username,   
			email: applicant.email,
			gpa: applicant.gpa,
			info: applicant.info,
			date: applicant.date
		})

	} catch (error) {
		console.error(error)
	}
})

// GET - gpa page
app.get('/gpa', (req, res) => {
	res.render('gpa')
})
// POST - gpaResult page - table of users with >= gpa
app.post('/gpa', async (req, res) => {
	const { gpa } = req.body 
	const filter = { gpa: { $gte: parseInt(gpa) }}

	try {
		await client.connect()

		const applicantCollection = client
			.db(databaseAndCollection.db)
			.collection(databaseAndCollection.collection)

		const applicants = await applicantCollection.find(filter).toArray()

		await client.close()

		res.render('gpaResult', { applicants })

	} catch (error) {
		console.error(error)
	}

})

// GET - remove page
app.get('/remove', (req, res) => {
	res.render('remove')
})
// POST - removeResult page
app.post('/remove', async (req, res) => {
	try {
		await client.connect()

		const count = await client
			.db(databaseAndCollection.db)
			.collection(databaseAndCollection.collection)
			.deleteMany({})

		await client.close()

		return res.render('removeResult', { count: count.deletedCount })

	} catch (error) {
		console.error(error)
	}
})

const PORT = argv[2] || 3000
app.listen(PORT)

// ------------------ USER INTERFACE ------------------
let data = ''
console.log(`Web server started and running at http://localhost:${PORT}`)
process.stdin.setEncoding('utf8')
process.stdout.write('Stop to shutdown the server: ')
process.stdin.on('readable', () => {
	data = process.stdin.read()
	if (data !== null) {
		let command = data.trim()
		if (command === 'stop') {
			console.log('Shutting down server')
			process.exit(0)
		}
	}
	process.stdout.resume()
})

module.exports = app
