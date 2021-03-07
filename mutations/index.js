
const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');
const { UserType } = require('../types');
const userData = require('../mock_data/users');

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
    updateNameById: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        userData.forEach(u => {
          if (u.id === args.id) {
            u.name = args.name
          }
        })
        return userData.find(u => u.id === args.id);
      }
    }
  }
});

module.exports = {
  Mutation,
}