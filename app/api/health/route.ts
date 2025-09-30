import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check API key availability
    const openaiKey = process.env.OPENAI_API_KEY;
    const firecrawlKey = process.env.FIRECRAWL_API_KEY;

    const health = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      services: {
        openai: {
          status: openaiKey ? "configured" : "not_configured",
          keyPrefix: openaiKey ? openaiKey.substring(0, 10) + "..." : null,
        },
        firecrawl: {
          status: firecrawlKey ? "configured" : "not_configured",
          keyPrefix: firecrawlKey
            ? firecrawlKey.substring(0, 10) + "..."
            : null,
        },
      },
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    };

    const statusCode = openaiKey && firecrawlKey ? 200 : 503;

    return NextResponse.json(health, { status: statusCode });
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
