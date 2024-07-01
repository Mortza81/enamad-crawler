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
  type Query {
    getWebsites(name: String, domain: String, stars: Int, expiration: String): [Website]
  }
`);

export default schema;
