import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";  // ✅ Fix the import
import Registration from "@/models/Registration";

export async function POST(req: Request) {
  try {
    await connectDB(); // ✅ Use the correct function

    const body = await req.json();
    console.log("Received Data:", body); // Debugging

    if (!body.team || !body.event || !body.participants?.length) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newRegistration = new Registration(body);
    await newRegistration.save();

    return NextResponse.json(
      { message: "Registration successful!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error registering:", error);
    return NextResponse.json(
      { message: "Registration failed. Try again." },
      { status: 500 }
    );
  }
}
