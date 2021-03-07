const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
})


module.exports = {
  UserType,
}