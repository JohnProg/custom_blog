import {
  GraphQLString
} from 'graphql';

const HelloQuery = {
  type: GraphQLString,
  description: 'The mandatory hello field',
  resolve: () => 'Public Blog API'
};

export default HelloQuery;
