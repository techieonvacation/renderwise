import { NextResponse } from "next/server";

// In-memory storage for demonstration (replace with a database in production)
let counters = [
  {
    id: "1",
    icon: "BarChart3",
    end: 10,
    prefix: "$",
    suffix: " million",
    title: "Revenue Growth",
    description:
      "Generated over $10 million in additional revenue for our clients through innovative IT solutions",
    color: "primary",
  },
  {
    id: "2",
    icon: "Users2",
    end: 95,
    suffix: "%",
    title: "Client Satisfaction",
    description:
      "95% client satisfaction rate across all IT solutions and services we provide",
    color: "info",
  },
  {
    id: "3",
    icon: "Zap",
    end: 350,
    suffix: "+",
    title: "Completed Projects",
    description:
      "Our team successfully managed and executed 350+ projects with excellence",
    color: "success",
  },
];

export async function GET() {
  return NextResponse.json(counters);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newCounter = {
    id: String(Date.now()), // Simple ID generation; use UUID in production
    ...body,
  };
  counters.push(newCounter);
  return NextResponse.json(newCounter, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const index = counters.findIndex((c) => c.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: "Counter not found" }, { status: 404 });
  }
  counters[index] = { ...counters[index], ...body };
  return NextResponse.json(counters[index]);
}
