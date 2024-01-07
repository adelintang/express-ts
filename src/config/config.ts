import mongoose from 'mongoose'

const connectToMongo = async (): Promise<void> => {
  try {
    const MONGO_URL: string = process.env.MONGO_URL as string
    await mongoose.connect(MONGO_URL)
    console.log('connect to mongodb successfully')
  } catch (error: any) {
    console.log(`${error.name}: ${error.message}`)
  }
}

export default connectToMongo
