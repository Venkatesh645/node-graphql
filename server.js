const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLString, GraphQLScalarType } = require('graphql');
const userData = require('./mock_data.json');


const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return userData
      }
    },
    getUserById: {
      type: UserType,
      resolve(parent, args) {
        debugger
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const userObj = {
          id: userData.length + 1,
          name: args.name,
          age: args.age
        }
        userData.push(userObj)
        return userObj;
      }
    },
    updateNameById:{
      type: UserType,
      args: {
        name: { type: GraphQLString },
        id: { type: GraphQLInt }
      },
      resolve(parent, args){
        userData.forEach(u => {
          if(u.id === args.id){
            u.name = args.name
          }
        })
        return userData.find(u => u.id === args.id);
      }
    }
  }
});

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