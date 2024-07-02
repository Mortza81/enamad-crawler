import { Website } from "../models/websiteModel";

export type FilterArgs = {
  name?: string;
  domain?: string;
  stars?: number;
  expiration?: string;
};

const resolvers = {
  getWebsites: async ({ name, domain, stars, expiration }: FilterArgs) => {
    try {
      const filter: FilterArgs = {};
      if (name) filter.name = name;
      if (domain) filter.domain = domain;
      if (stars) filter.stars = stars;
      if (expiration) filter.expiration = expiration;
      return await Website.find(filter);
    } catch (error) {
      console.log(error);
    }
  },
  perCity: async () => {
    try{
    return await Website.aggregate([
      { $group: { _id: "$city", count: { $sum: 1 } } },
      { $project: { _id: 0, city: '$_id', count: 1 } }
    ]);
  }
  catch (error) {
    console.log(error);
  }
  },
  websitesByStars: async () => {
    try{
      const result = await Website.aggregate([
        { $group: { _id: "$stars", count: { $sum: 1 }, websites: { $push: "$$ROOT" } } },
        { $project: { star: "$_id", count: 1, websites: 1, _id: 0 } }
      ]);
      return result; 
    }catch(error){
      console.log(error);
    }
  }
  
};

export default resolvers;
