import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.BASE_URL;

export async function GET() {
  const response = await axios(`${baseUrl}/tasks`);
  const { data } = await response.data;
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const task = await request.json();
  const response = await axios.post(`${baseUrl}/tasks`, task);
  const { data } = await response.data;
  return NextResponse.json(data);
}
