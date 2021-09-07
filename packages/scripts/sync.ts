import dotenv from 'dotenv'

// read the environment variables from the ".env" file
dotenv.config()

const sayhi: string = `Hello World! This is your Figma file ID: ${process.env.FLIGHT_FILE_ID}`;

console.log(sayhi)