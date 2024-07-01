import { Website } from "../models/websiteModel";

type FilterArgs = {
  name?: string;
  domain?: string;
  stars?: number;
  expiration?: string;
};

const resolvers = {
  getWebsites: async ({ name, domain, stars, expiration }: FilterArgs) => {
    const filter: FilterArgs = {};
    if (name) filter.name = name;
    if (domain) filter.domain = domain;
    if (stars) filter.stars = stars;
    if (expiration) filter.expiration = expiration;
    return await Website.find(filter);
  },
};

export default resolvers;
