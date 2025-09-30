import { NextResponse } from "next/server";
import { z } from "zod";

import { automotivePartsDeepResearch } from "@/lib/automotive-parts-deep-research";

// Schema for automotive part image validation
const AutomotiveImageSchema = z.object({
  file: z
    .instanceof(Blob)
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: "File size should be less than 10MB",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(
          file.type
        ),
      {
        message: "File type should be JPEG, PNG, or WebP",
      }
    ),
});

export async function POST(request: Request) {
  if (request.body === null) {
    return NextResponse.json(
      { error: "Request body is empty" },
      { status: 400 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as Blob;

    if (!file) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }

    const validatedFile = AutomotiveImageSchema.safeParse({ file });

    if (!validatedFile.success) {
      const errorMessage = validatedFile.error.errors
        .map((error) => error.message)
        .join(", ");

      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    // Convert image to base64 for direct processing
    const fileBuffer = await file.arrayBuffer();
    const base64Image = Buffer.from(fileBuffer).toString("base64");
    const imageDataUrl = `data:${file.type};base64,${base64Image}`;

    try {
      console.log("=== API Route Called ===");
      console.log("Image data URL length:", imageDataUrl.length);
      
      // Perform deep research analysis
      const researchContext = {
        partInfo: {},
        marketContext: "automotive_parts",
        researchDepth: "comprehensive" as const,
        targetRegions: ["North America", "Europe", "Asia-Pacific"],
        budgetRange: "any",
        urgency: "medium" as const,
      };

      console.log("Calling performDeepResearch with context:", researchContext);
      
      const analysisResult =
        await automotivePartsDeepResearch.performDeepResearch(
          imageDataUrl,
          researchContext
        );
        
      console.log("performDeepResearch completed, result:", analysisResult);

      return NextResponse.json({
        success: true,
        analysis: analysisResult,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Deep research analysis error:", error);
      return NextResponse.json(
        {
          error:
            "Analysis failed. Please check your configuration and try again.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Request processing error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
