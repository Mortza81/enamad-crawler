import { Request, Response } from "express";
import schema from "../data/schema";
import resolvers from "../data/resolvers";
import { graphql } from "graphql";
import { Website } from "../models/websiteModel";
import ObjectsToCsv from "objects-to-csv";

export const websitesByStars = async (req: Request, res: Response) => {
  const query = `
    query {
    websitesByStars{
      count
      star
      websites{
        name
        city
        domain
        expiration
      }
    }
  }
    `;
  try {
    const data = await graphql({
      source: query,
      rootValue: resolvers,
      schema,
    });
    res.status(200).json({
      status: "success",
      data: [data],
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};
export const webPercity = async (req: Request, res: Response) => {
  const query = `
    query {
    perCity{
      city
      count
    }
  }
    `;
  try {
    const data = await graphql({
      source: query,
      rootValue: resolvers,
      schema,
    });
    res.status(200).json({
      status: "success",
      data: [data],
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};
export const exportCsv = async (req: Request, res: Response) => {
  const fields = req.query.fields
    ? (req.query.fields as string).split(",")
    : [];
  try {
    let result = await Website.find({}, { _id: 0 }).select(fields);
    if (!result) {
      return res.status(404).json({
        status: "failed",
        error: "No data found",
      });
    }
    const csv = new ObjectsToCsv(result.map((obj) => obj.toObject()));
    const csvString = await csv.toString();

    res.header("Content-Type", "text/csv");
    res.attachment("websites.csv");
    res.status(200).send(csvString);
  } catch (err) {
    res.status(500).json({ status: "failed", error: err });
  }
};
