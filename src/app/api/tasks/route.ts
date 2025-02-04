import axios from "axios";
import { NextResponse } from "next/server";

const baseUrl = process.env.BASE_URL;

export async function GET() {
  try {
    const response = await axios(`${baseUrl}/tasks`);
    const { data } = await response.data;
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching data" });
  }
}
