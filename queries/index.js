const { GraphQLObjectType, GraphQLList } = require('graphql');
const { UserType } = require('../types');
const userData = require('../mock_data/users');

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

module.exports = {
  RootQuery,
}