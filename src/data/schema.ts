import { buildSchema } from "graphql";

const schema = buildSchema(`
  type Website {
    id: ID
    name: String
    expiration: String
    stars: Int
    domain: String
    city: String
  }
  type CountCity {
  city: String!
  count: Int!
  }
  type ByStar{
  websites:[Website]!
  star:Int!
  count:Int!
  }
  type Query {
    perCity:[CountCity]
    getWebsites(name: String, domain: String, stars: Int, expiration: String): [Website]
    websitesByStars: [ByStar]
  }
`);

export default schema;
