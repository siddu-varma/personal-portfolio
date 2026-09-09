const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const Project = require('./models/Project')

const app = express()

// ================= MIDDLEWARE =================
app.use(cors())
app.use(express.json())

// ================= HOME ROUTE =================
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio API is running 🚀',
  })
})

// ================= GET ALL PROJECTS =================
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })

    res.status(200).json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)

    res.status(500).json({
      message: 'Failed to fetch projects',
    })
  }
})

// ================= CREATE PROJECT =================
app.post('/api/projects', async (req, res) => {
  try {
    const project = new Project(req.body)

    const savedProject = await project.save()

    res.status(201).json(savedProject)
  } catch (error) {
    console.error('Error creating project:', error)

    res.status(500).json({
      message: 'Failed to create project',
    })
  }
})

// ================= UPDATE PROJECT =================
app.put('/api/projects/:id', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!updatedProject) {
      return res.status(404).json({
        message: 'Project not found',
      })
    }

    res.status(200).json(updatedProject)
  } catch (error) {
    console.error('Error updating project:', error)

    res.status(500).json({
      message: 'Failed to update project',
    })
  }
})

// ================= CONNECT TO MONGODB =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully ✅')

    const PORT = process.env.PORT || 5001

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed ❌')
    console.error(error)
  })