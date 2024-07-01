import { Request, Response } from "express";
import { Website } from "../models/websiteModel";
export const numOfCity = async (req:Request, res:Response) => {
    try{
        const data=await Website.aggregate([
            {
                $match:{city:req.params.city}
            },{
                $group:{
                    _id:"$city",
                    sum:{$sum:1},
                } 

            },
            {
                $addFields: { city: '$_id' },
              },
        ])
        res.status(200).json({
            status:"success",
            data,
        })
    }catch(error){
        res.status(200).json({
            status:"failed",
            error,
        })
    }
};