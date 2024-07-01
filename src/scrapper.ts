import axios from "axios";
import cheerio from "cheerio";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { Website } from "./models/websiteModel";
dotenv.config()
const DB_URL = "mongodb://localhost:27017/enamad"; 
type Website = {
  name: string;
  stars: number;
  domain: string;
  expiration: string;
  city: string;
};
async function fetchWebsites() {
  let x: number;
  let websites: Website[] = [];
  for (x = 1; x <= 10; x++) {
    if(x==2){
      continue
    }
    try {
      const response = await axios.get(
        `https://enamad.ir/DomainListForMIMT/Index/${x}`
      );
      let i: number;
      const $ = cheerio.load(response.data);
      for (i = 1; i < 31; i++) {
        $(`#Div_Content > div:nth-child(${i})`).each((index, element) => {
          const name = $(element)
            .find(".col-sm-12.col-md-3")
            .first()
            .text()
            .trim();
          const domain = $(element)
            .find(".col-sm-12.col-md-2 a")
            .first()
            .text()
            .trim();
          const stars = $(element).find(
            ".col-sm-12.col-md-2 img[src*='star.png']"
          ).length;
          const expiration = $(element)
            .find(".col-sm-12.col-md-1")
            .last()
            .text()
            .trim();
          const city = $(element)
            .find(".col-sm-12.col-md-1")
            .eq(1) 
            .text()
            .trim();
          const website: Website = {
            name,
            domain,
            city,
            stars,
            expiration,
          };
          websites.push(website);
        });
      }
    } catch (error) {
      console.error("Error fetching websites:", error);
      return [];
    }
  }
  return websites;
}
async function main() {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to MongoDB");
    let x: number;
    const websites = await fetchWebsites();
    await Website.insertMany(websites)
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error:", error);
  }
}
main();