const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLString, GraphQLScalarType } = require('graphql');
const { UserType }  = require('./types');
const { RootQuery } = require('./queries');
const { Mutation } = require('./mutations');


const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

// Create server
const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));


app.listen(3000, () => {
  console.log('Server started')
})