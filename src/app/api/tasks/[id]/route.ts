import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.BASE_URL;

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const body = await request.json();

  const response = await axios.put(`${baseUrl}/tasks/${id}`, body);
  const { data } = await response.data;
  return NextResponse.json(data);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  await axios.delete(`${baseUrl}/tasks/${id}`);

  return NextResponse;
}
