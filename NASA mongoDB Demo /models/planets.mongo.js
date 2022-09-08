const mongoose = require('mongooes')


const planetSchema = new mongoose.Schema(
    {
        KelperName: {
            type:String,
             required:true,
             default:true,
        },

    }
)

module.exports = mongoose.module('planets',planetSchema)