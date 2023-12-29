"use server"

import { handleError } from "@/lib/utils"
import { CreateCategoryParams } from "@/types"
import connectToDB from "../db"
import Category from "../models/Category.model"

export const createCategory = async ({categoryName}: CreateCategoryParams) =>{
    try {
        await connectToDB()
        const newCategory = await Category.create({
            name: categoryName
        })

        return JSON.parse(JSON.stringify(newCategory))
        
    } catch (error) {
        handleError(error)
    }
}
export const getAllCategory = async () =>{
    try {
        await connectToDB()
        const categories = await Category.find()

        return JSON.parse(JSON.stringify(categories))
        
    } catch (error) {
        handleError(error)
    }
}
