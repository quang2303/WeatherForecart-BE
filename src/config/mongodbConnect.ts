import mongoose from 'mongoose'

const options = {
  autoIndex: true,
  connectTimeoutMS: 60000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
}

function setRunValidators(this: any) {
  this.setOptions({ runValidators: true })
}

mongoose.set('strictQuery', true)

const conn = async () => {
  try {
    const conn = await mongoose
      .set('strictQuery', true)
      .connect(
        'mongodb+srv://chungducquang2:s8pFF1MzJLy3xRqh@cluster0.8qgiymw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
        options
      )
    console.log('Successfully connected to database', process.env.HOST)
  } catch (error) {
    console.log(`Error: ${error}`)
    process.exit()
  }
}

export default conn
