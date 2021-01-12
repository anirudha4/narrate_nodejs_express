const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminPreviewSchema = Schema({
    title: {
        type:String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    markdown: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        required: true,
    }
}, {timestamps: true})
const AdminPreview = mongoose.model('adminpreview', AdminPreviewSchema)
module.exports = AdminPreview
