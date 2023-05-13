/** @type {import('next').NextConfig} */
const nextConfig = {}
const path = require('path')
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') })

module.exports = nextConfig
