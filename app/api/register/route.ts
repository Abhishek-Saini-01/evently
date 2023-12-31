import connectToDB from "@/db/db";
import User from "@/db/models/User.model";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    const { fullName, email, password } = await request.json();
  
    await connectToDB();
  
    const existingUser = await User.findOne({ email });
  
    if (existingUser) {
      return new NextResponse("Email is already in use", { status: 400 });
    }
  
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
  
    try {
      await newUser.save();
      return new NextResponse("user is registered", { status: 200 });
    } catch (err: any) {
      return new NextResponse(err, {
        status: 500,
      });
    }
  };