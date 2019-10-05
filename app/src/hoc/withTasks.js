import { graphql } from "react-apollo";
import { gql } from "apollo-boost";

const GET_PHOTOS = gql`
  {
    getTasks {
      _id
      name
      done
      createdAt
      updatedAt
    }
  }
`;
export const withTasks = graphql(GET_PHOTOS);
