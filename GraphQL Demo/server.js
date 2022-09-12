const express = require('express')

const port = 9000
const path = require('path')
const { buildSchema } = require('graphql')
// const { graphqlHTTP } = require('express-graphql')
const {ApolloServer}= require('apollo-server-express')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { loadFilesSync } = require('@graphql-tools/load-files')
const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'))
const typesResolver = loadFilesSync(path.join(__dirname, '**/*.resolver.js'))
const schemText = buildSchema(`

    type Query{
        product:[Product]
        orders: [Order]
    }
    
    type Product{
        id:Int!
        description : String!
        price : Float!
        review:[Review!]!
    }

    type Review{
        rating: Int!
        comment: String!
    }

    type Order{
        date: String!
        subtotal: Float!
        items: [ItemOrder]
    }
    type ItemOrder{
        product:Product!
        qty:Int!
    }

    `)


async function startApolloServer(){
    const app = express()
    const schema = makeExecutableSchema({
        typeDefs: typesArray,
        resolvers: typesResolver
    })
    const server=new ApolloServer({
        schema: schema
    });
    await server.start();
    server.applyMiddleware({ app, path:'/graphql'})
    app.listen(port,
        () => console.log(`GraphQL app listening on port ${port}!`)
    )
}

startApolloServer();

const root = {
    product: require('./products/product.model'),
    orders: require('./orders/order.model')

}

// app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true
// })

