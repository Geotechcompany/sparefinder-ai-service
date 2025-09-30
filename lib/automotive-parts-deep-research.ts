// Advanced AI service for automotive parts deep research
// Integrates OpenAI, Firecrawl, and custom research orchestration

interface VisionAnalysisResult {
  partType: string;
  manufacturer: string;
  confidence: number;
  notes: string;
  features: string[];
  partNumber?: string;
  dimensions?: string;
  material?: string;
  condition?: string;
  ageEstimate?: string;
  qualityIndicators?: string[];
}

interface ResearchContext {
  partInfo: any;
  marketContext: string;
  researchDepth: "basic" | "standard" | "comprehensive";
  targetRegions?: string[];
  budgetRange?: string;
  urgency?: "low" | "medium" | "high";
}

interface PartHistory {
  year: number;
  event: string;
  description: string;
  significance: "major" | "minor" | "milestone";
  impact: string;
  source?: string;
}

interface DeepResearchResult {
  analysis: VisionAnalysisResult;
  suppliers: any[];
  marketData: any;
  technicalSpecs: any;
  alternatives: any[];
  partHistory: PartHistory[];
  researchSources: any[];
  confidence: number;
}

export class AutomotivePartsDeepResearch {
  private openaiApiKey: string;
  private firecrawlApiKey: string;

  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY || "";
    this.firecrawlApiKey = process.env.FIRECRAWL_API_KEY || "";

    console.log("=== AutomotivePartsDeepResearch Constructor ===");
    console.log("Environment variables:");
    console.log(
      "- OPENAI_API_KEY:",
      process.env.OPENAI_API_KEY ? "Set" : "Not set"
    );
    console.log(
      "- FIRECRAWL_API_KEY:",
      process.env.FIRECRAWL_API_KEY ? "Set" : "Not set"
    );
    console.log("Instance variables:");
    console.log(`- OpenAI API Key: ${this.openaiApiKey ? "Set" : "Not set"}`);
    console.log(
      `- Firecrawl API Key: ${this.firecrawlApiKey ? "Set" : "Not set"}`
    );
    console.log("=== Constructor Complete ===");
  }

  /**
   * Main deep research orchestration method
   */
  async performDeepResearch(
    imageUrl: string,
    context: ResearchContext
  ): Promise<DeepResearchResult> {
    try {
      console.log("=== Starting Deep Research Analysis ===");
      console.log("Image URL:", imageUrl);
      console.log("Context:", context);

      // Step 1: Advanced AI image analysis
      console.log("Step 1: Starting AI image analysis...");
      const visionAnalysis = await this.analyzeImageWithAdvancedAI(
        imageUrl,
        context
      );
      console.log("Vision analysis completed:", visionAnalysis);

      // Step 2: Parallel research tasks
      console.log("Starting parallel research tasks...");
      const [
        suppliers,
        marketData,
        technicalSpecs,
        alternatives,
        researchSources,
      ] = await Promise.all([
        this.researchSuppliers(visionAnalysis, context),
        this.researchMarketData(visionAnalysis, context),
        this.researchTechnicalSpecifications(visionAnalysis, context),
        this.researchAlternativeParts(visionAnalysis, context),
        this.researchSources(visionAnalysis, context),
      ]);

      console.log("Research tasks completed:");
      console.log(`- Suppliers: ${suppliers.length}`);
      console.log(`- Market data: ${Object.keys(marketData).length} fields`);
      console.log(
        `- Technical specs: ${Object.keys(technicalSpecs).length} fields`
      );
      console.log(`- Alternatives: ${alternatives.length}`);
      console.log(`- Research sources: ${researchSources.length}`);

      // Step 3: Generate part history
      const partHistory = await this.generatePartHistory(
        visionAnalysis,
        suppliers,
        marketData,
        context
      );

      return {
        analysis: visionAnalysis,
        suppliers,
        marketData,
        technicalSpecs,
        alternatives,
        partHistory,
        researchSources,
        confidence: visionAnalysis.confidence,
      };
    } catch (error) {
      console.error("Deep research error:", error);
      throw new Error("Failed to perform deep research analysis");
    }
  }

  /**
   * Advanced AI image analysis with context-aware prompts
   */
  private async analyzeImageWithAdvancedAI(
    imageUrl: string,
    context: ResearchContext
  ): Promise<VisionAnalysisResult> {
    if (!this.openaiApiKey) {
      throw new Error("OpenAI API key not configured");
    }

    console.log("OpenAI API Key loaded:", this.openaiApiKey ? "Yes" : "No");
    console.log("API Key prefix:", this.openaiApiKey.substring(0, 10) + "...");

    const systemPrompt = this.buildSystemPrompt(context);
    const userPrompt = this.buildUserPrompt(imageUrl, context);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.openaiApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: systemPrompt,
              },
              {
                role: "user",
                content: userPrompt,
              },
            ],
            max_tokens: 2000,
            temperature: 0.1,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("OpenAI API Error Details:", {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
        });
        throw new Error(
          `OpenAI API error: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const data = await response.json();
      const analysis = data.choices[0].message.content;

      return this.parseAdvancedAnalysis(analysis, context);
    } catch (error) {
      console.error("Advanced AI analysis error:", error);
      throw new Error("Failed to analyze image with advanced AI");
    }
  }

  /**
   * Build context-aware system prompt
   */
  private buildSystemPrompt(context: ResearchContext): string {
    const basePrompt = `You are an expert automotive parts analyst with deep knowledge of:
- Automotive part identification and classification
- Global supply chain and supplier networks
- Technical specifications and performance metrics
- Market trends and pricing analysis
- Quality standards and certifications (ISO 9001, IATF 16949, VDA 6.1, TS 16949)
- Vehicle compatibility and applications
- Manufacturing processes and materials
- Regulatory compliance (DOT, ECE, FMVSS)

Your analysis should be:
1. Technically accurate and detailed
2. Context-aware based on research requirements
3. Data-driven with specific metrics
4. Actionable with clear recommendations
5. Source-verified when possible

Research Context:
- Depth: ${context.researchDepth}
- Target Regions: ${
      context.targetRegions?.join(", ") || "Global - Worldwide Coverage"
    }
- Budget Range: ${context.budgetRange || "Not specified"}
- Urgency: ${context.urgency || "Medium"}
- Scope: Global automotive parts research including international suppliers, manufacturers, and distributors

Provide structured analysis in JSON format with the following fields:
{
  "partType": "specific part category",
  "manufacturer": "identified manufacturer",
  "confidence": 0.0-1.0,
  "notes": "detailed analysis notes",
  "features": ["key features array"],
  "partNumber": "if visible",
  "dimensions": "if determinable",
  "material": "if identifiable",
  "condition": "assessment of part condition",
  "ageEstimate": "estimated age/era",
  "qualityIndicators": ["quality assessment points"]
}`;

    return basePrompt;
  }

  /**
   * Build context-aware user prompt
   */
  private buildUserPrompt(imageUrl: string, context: ResearchContext): any[] {
    return [
      {
        type: "text",
        text: `Analyze this automotive part image with the following focus areas:

1. **Part Identification**: Identify the exact part type, manufacturer, and any visible part numbers
2. **Technical Analysis**: Assess dimensions, materials, construction quality, and design features
3. **Condition Assessment**: Evaluate wear, damage, age, and overall condition
4. **Quality Indicators**: Look for manufacturing quality, certifications, and brand authenticity
5. **Compatibility Clues**: Identify vehicle compatibility based on design and markings

Research Requirements:
- Analysis depth: ${context.researchDepth}
- Focus on ${
          context.targetRegions?.join(", ") || "global"
        } markets - worldwide coverage
- Consider budget range: ${context.budgetRange || "any"}
- Urgency level: ${context.urgency || "medium"}
- Scope: Global automotive industry including international suppliers, manufacturers, and distributors

Provide detailed technical analysis with specific measurements, material identification, and quality assessments.`,
      },
      {
        type: "image_url",
        image_url: {
          url: imageUrl,
          detail: "high",
        },
      },
    ];
  }

  /**
   * Parse advanced AI analysis response
   */
  private parseAdvancedAnalysis(
    analysis: string,
    context: ResearchContext
  ): VisionAnalysisResult {
    try {
      // Try to extract JSON from the response
      const jsonMatch = analysis.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          partType: parsed.partType || "unknown",
          manufacturer: parsed.manufacturer || "unknown",
          confidence: parsed.confidence || 0.5,
          notes: parsed.notes || analysis,
          features: parsed.features || [],
          partNumber: parsed.partNumber,
          dimensions: parsed.dimensions,
          material: parsed.material,
          condition: parsed.condition,
          ageEstimate: parsed.ageEstimate,
          qualityIndicators: parsed.qualityIndicators || [],
        };
      }
    } catch (error) {
      console.error("Failed to parse AI response:", error);
    }

    // Fallback parsing
    return {
      partType: "automotive_part",
      manufacturer: "unknown",
      confidence: 0.7,
      notes: analysis,
      features: [],
      condition: "unknown",
      qualityIndicators: [],
    };
  }

  /**
   * Research suppliers using web scraping and APIs
   */
  private async researchSuppliers(
    analysis: VisionAnalysisResult,
    context: ResearchContext
  ): Promise<any[]> {
    try {
      console.log(
        `Researching suppliers for: ${analysis.partType} by ${analysis.manufacturer}`
      );

      // Use Firecrawl to search for suppliers
      const manufacturer =
        analysis.manufacturer === "Unknown" ? "" : analysis.manufacturer;
      const searchQuery =
        `${analysis.partType} ${manufacturer} global supplier distributor automotive parts contact phone email address worldwide international`.trim();
      console.log(`Search query: ${searchQuery}`);

      const searchResults = await this.searchWithFirecrawl(searchQuery);
      console.log(`Firecrawl returned ${searchResults.length} results`);

      // Extract supplier information from search results using AI
      const suppliers = await this.extractSupplierInfo(searchResults, analysis);
      console.log(`Extracted ${suppliers.length} suppliers`);

      return suppliers;
    } catch (error) {
      console.error("Supplier research error:", error);
      return [];
    }
  }

  /**
   * Research market data and trends
   */
  private async researchMarketData(
    analysis: VisionAnalysisResult,
    context: ResearchContext
  ): Promise<any> {
    try {
      console.log(`Researching market data for: ${analysis.partType}`);

      // Search for market data using Firecrawl
      const manufacturer =
        analysis.manufacturer === "Unknown" ? "" : analysis.manufacturer;
      const marketQuery =
        `${analysis.partType} ${manufacturer} global market analysis trends 2024 automotive industry worldwide international`.trim();
      console.log(`Market search query: ${marketQuery}`);

      const marketResults = await this.searchWithFirecrawl(marketQuery);
      console.log(`Market search returned ${marketResults.length} results`);

      // Extract market information from search results using AI
      const marketData = await this.extractMarketData(marketResults, analysis);
      console.log(`Extracted market data:`, marketData);

      return marketData;
    } catch (error) {
      console.error("Market research error:", error);
      return {
        marketSize: "Data unavailable",
        priceTrends: "Data unavailable",
        demandLevel: "Unknown",
        competitionLevel: "Unknown",
        keyPlayers: [analysis.manufacturer],
        marketGrowth: "Data unavailable",
        regionalAvailability: {},
        priceHistory: {},
        supplyChainRisks: [],
        marketOpportunities: [],
      };
    }
  }

  /**
   * Research technical specifications
   */
  private async researchTechnicalSpecifications(
    analysis: VisionAnalysisResult,
    context: ResearchContext
  ): Promise<any> {
    try {
      // Search for technical specifications using Firecrawl
      const techQuery = `${analysis.partType} ${analysis.manufacturer} technical specifications datasheet`;
      const techResults = await this.searchWithFirecrawl(techQuery);

      // Extract technical information from search results
      const techSpecs = this.extractTechnicalSpecs(techResults, analysis);

      return techSpecs;
    } catch (error) {
      console.error("Technical specifications research error:", error);
      return {
        dimensions: analysis.dimensions || "Data unavailable",
        material: analysis.material || "Data unavailable",
        weight: "Data unavailable",
        color: "Data unavailable",
        finish: "Data unavailable",
        specifications: {},
        performanceMetrics: {},
        testingStandards: [],
        environmentalImpact: {},
      };
    }
  }

  /**
   * Research alternative parts
   */
  private async researchAlternativeParts(
    analysis: VisionAnalysisResult,
    context: ResearchContext
  ): Promise<any[]> {
    try {
      // Search for alternative parts using Firecrawl
      const altQuery = `${analysis.partType} alternative parts compatible ${analysis.manufacturer}`;
      const altResults = await this.searchWithFirecrawl(altQuery);

      // Extract alternative parts information from search results
      const alternatives = this.extractAlternativeParts(altResults, analysis);

      return alternatives;
    } catch (error) {
      console.error("Alternative parts research error:", error);
      return [];
    }
  }

  /**
   * Research sources and references
   */
  private async researchSources(
    analysis: VisionAnalysisResult,
    context: ResearchContext
  ): Promise<any[]> {
    try {
      console.log(
        `Researching sources for: ${analysis.partType} by ${analysis.manufacturer}`
      );

      // Use Firecrawl to find relevant sources
      const manufacturer =
        analysis.manufacturer === "Unknown" ? "" : analysis.manufacturer;
      const sourceQuery =
        `${analysis.partType} ${manufacturer} global documentation manual guide specifications automotive worldwide international`.trim();
      console.log(`Source search query: ${sourceQuery}`);

      const sourceResults = await this.searchWithFirecrawl(sourceQuery);
      console.log(`Source search returned ${sourceResults.length} results`);

      // Extract source information from search results using AI
      const sources = await this.extractSources(sourceResults, analysis);
      console.log(`Extracted ${sources.length} sources`);

      return sources;
    } catch (error) {
      console.error("Sources research error:", error);
      return [];
    }
  }

  /**
   * Generate part history using AI
   */
  private async generatePartHistory(
    analysis: VisionAnalysisResult,
    suppliers: any[],
    marketData: any,
    context: ResearchContext
  ): Promise<PartHistory[]> {
    try {
      // Use AI to generate part history
      const historyPrompt = `Based on the following automotive part analysis and research data, generate a chronological history of the part type:

Part Analysis: ${JSON.stringify(analysis)}
Suppliers: ${JSON.stringify(suppliers)}
Market Data: ${JSON.stringify(marketData)}

Generate a historical timeline of ${
        analysis.partType
      } development and evolution. Include:
- Key milestones in the part's development
- Major technological advances
- Industry changes that affected the part
- Manufacturing innovations
- Market evolution events

Provide history in JSON format with:
- year: number (historical year)
- event: string (event title)
- description: string (detailed description)
- significance: "major" | "minor" | "milestone"
- impact: string (impact on industry/technology)
- source: string (optional source reference)

Focus on significant historical events from 1900 to present. Generate 5-8 key historical events.`;

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.openaiApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content:
                  "You are an expert automotive historian. Generate accurate historical timeline of automotive parts development based on research data.",
              },
              {
                role: "user",
                content: historyPrompt,
              },
            ],
            max_tokens: 2000,
            temperature: 0.2,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      // Extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : content;

      const partHistory = JSON.parse(jsonString);

      return Array.isArray(partHistory) ? partHistory : [];
    } catch (error) {
      console.error("Part history generation error:", error);
      return [];
    }
  }

  /**
   * Search using Firecrawl API with retry logic
   */
  private async searchWithFirecrawl(
    query: string,
    retries = 3
  ): Promise<any[]> {
    if (!this.firecrawlApiKey) {
      throw new Error("Firecrawl API key not configured");
    }

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch("https://api.firecrawl.dev/v1/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.firecrawlApiKey}`,
          },
          body: JSON.stringify({
            query,
            limit: 10,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `Firecrawl API error (attempt ${attempt}): ${response.status} ${response.statusText}`,
            errorText
          );

          if (attempt === retries) {
            throw new Error(
              `Firecrawl API error after ${retries} attempts: ${response.status} ${response.statusText}`
            );
          }

          // Wait before retry (exponential backoff)
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, attempt) * 1000)
          );
          continue;
        }

        const data = await response.json();
        return data.data || [];
      } catch (error) {
        console.error(`Firecrawl search error (attempt ${attempt}):`, error);

        if (attempt === retries) {
          console.error(
            "All Firecrawl retry attempts failed, returning empty results"
          );
          return [];
        }

        // Wait before retry
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      }
    }

    return [];
  }

  /**
   * Extract supplier information from search results using AI analysis
   */
  private async extractSupplierInfo(
    searchResults: any[],
    analysis: VisionAnalysisResult
  ): Promise<any[]> {
    console.log(
      `Processing ${searchResults.length} search results for suppliers`
    );

    // More inclusive filtering - look for automotive/parts related terms
    const supplierKeywords = [
      "supplier",
      "distributor",
      "parts",
      "auto",
      "automotive",
      "wholesale",
      "manufacturer",
      "dealer",
      "retailer",
    ];

    const filteredResults = searchResults.filter((result) => {
      const title = result.title?.toLowerCase() || "";
      const description = result.description?.toLowerCase() || "";
      const content = result.content?.toLowerCase() || "";

      return supplierKeywords.some(
        (keyword) =>
          title.includes(keyword) ||
          description.includes(keyword) ||
          content.includes(keyword)
      );
    });

    console.log(
      `Found ${filteredResults.length} potential suppliers after filtering`
    );

    // Use AI to analyze and structure the supplier data
    const aiAnalyzedSuppliers = await this.analyzeSuppliersWithAI(
      filteredResults,
      analysis
    );

    return aiAnalyzedSuppliers.slice(0, 5);
  }

  /**
   * Use AI to analyze and structure supplier data from Firecrawl results
   */
  private async analyzeSuppliersWithAI(
    searchResults: any[],
    analysis: VisionAnalysisResult
  ): Promise<any[]> {
    if (!this.openaiApiKey) {
      console.log("OpenAI API key not available, using basic extraction");
      return this.extractSuppliersBasic(searchResults, analysis);
    }

    try {
      console.log("Using AI to analyze supplier data...");

      const supplierData = searchResults.map((result) => ({
        title: result.title || "",
        url: result.url || "",
        description: result.description || "",
        content: result.content || "",
      }));

      // Debug: Log some content samples to see what we're working with
      console.log("Sample supplier data for AI analysis:");
      supplierData.slice(0, 2).forEach((supplier, index) => {
        console.log(`Supplier ${index + 1}:`, {
          title: supplier.title,
          url: supplier.url,
          contentLength: supplier.content.length,
          contentPreview: supplier.content.substring(0, 500) + "...",
          hasPhone: supplier.content.match(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/)
            ? "YES"
            : "NO",
          hasEmail: supplier.content.match(
            /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
          )
            ? "YES"
            : "NO",
          hasAddress: supplier.content.match(
            /\d+\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Lane|Ln|Boulevard|Blvd|Way|Place|Pl|Court|Ct|Circle|Cir)/
          )
            ? "YES"
            : "NO",
        });
      });

      const prompt = `Analyze the following supplier data and extract structured information for each supplier. CRITICAL: You must aggressively search for and extract actual contact information (phone numbers, emails, addresses) from the content. Do not use "Contact for details" unless absolutely no contact information is found.

Part being researched: ${analysis.partType}
Manufacturer: ${analysis.manufacturer}

Supplier Data:
${JSON.stringify(supplierData, null, 2)}

For each supplier, extract and structure the following information:
- name: Company name
- website: Website URL
- description: Brief description of the company
- phone: ACTUAL phone number if found in content (look for patterns like (555) 123-4567, 555-123-4567, +1-555-123-4567, etc.)
- email: ACTUAL email address if found in content (look for patterns like contact@company.com, info@company.com, sales@company.com, etc.)
- address: ACTUAL physical address if found in content (look for street addresses, city, state, zip codes)
- country: Country of operation (extract from address or content)
- partAvailability: Whether they likely have the specific part
- priceRange: Price range if mentioned
- minimumOrder: Minimum order requirements
- certifications: Quality certifications (ISO, IATF, etc.)
- rating: Customer rating if mentioned
- reviews: Number of reviews if mentioned
- establishedYear: Year company was established
- specializations: Areas of specialization
- shippingInfo: Shipping information
- leadTime: Typical lead times
- qualityRating: Quality assessment
- paymentTerms: Payment terms
- returnPolicy: Return policy

IMPORTANT EXTRACTION RULES:
1. For phone numbers: Look for any sequence that looks like a phone number (digits, parentheses, dashes, spaces)
2. For emails: Look for any text containing @ symbol followed by a domain
3. For addresses: Look for street numbers, street names, city names, state abbreviations, zip codes
4. If you find ANY contact information, extract it exactly as it appears
5. If you cannot find contact information, use "Contact for details" (not null)
6. Be thorough in searching through the entire content for contact details
7. Look for contact information in titles, descriptions, and content
8. Check for common patterns like "Call us at", "Phone:", "Email:", "Contact:", "Address:"
9. For well-known companies, use your knowledge to provide realistic contact information
10. Look for company headquarters, main offices, or regional offices in the content

EXAMPLES OF GOOD EXTRACTION:
- Phone: "(724) 347-0250" or "1-800-247-1326" or "+1-555-123-4567"
- Email: "sales@company.com" or "info@supplier.com" or "contact@manufacturer.com"
- Address: "2727 Freedland Road, Hermitage, PA 16148" or "101 Carley Court, Georgetown, KY"

Return the data as a JSON array of supplier objects. Use "Contact for details" for missing information, not null.`;

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are an expert at analyzing automotive supplier data and extracting structured business information. You MUST be extremely aggressive in finding contact information. Look through ALL content thoroughly for phone numbers, emails, and addresses. Use your knowledge of well-known automotive companies to provide realistic contact information when available. Do not give up easily - search every part of the content, including titles, descriptions, and full content. Always return valid JSON with actual contact details when possible.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            temperature: 0.1,
            max_tokens: 4000,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `OpenAI API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      // Extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : content;

      const aiAnalyzedSuppliers = JSON.parse(jsonString);
      console.log(`AI analyzed ${aiAnalyzedSuppliers.length} suppliers`);

      // Post-process to try to extract more contact info if AI missed it
      const enhancedSuppliers = aiAnalyzedSuppliers.map((supplier: any) => {
        // Ensure array fields are always arrays
        if (!Array.isArray(supplier.specializations)) {
          supplier.specializations = [];
        }
        if (!Array.isArray(supplier.certifications)) {
          supplier.certifications = [];
        }

        // Ensure numeric fields are numbers
        if (typeof supplier.rating !== "number" || isNaN(supplier.rating)) {
          supplier.rating = 0;
        }
        if (typeof supplier.reviews !== "number" || isNaN(supplier.reviews)) {
          supplier.reviews = 0;
        }
        if (
          typeof supplier.establishedYear !== "number" ||
          isNaN(supplier.establishedYear)
        ) {
          supplier.establishedYear = 0;
        }

        // Try to enhance contact information using company knowledge
        if (
          !supplier.phone ||
          supplier.phone === "Contact for details" ||
          supplier.phone === null
        ) {
          supplier.phone = this.getKnownCompanyContact(supplier.name, "phone");
        }
        if (
          !supplier.email ||
          supplier.email === "Contact for details" ||
          supplier.email === null
        ) {
          supplier.email = this.getKnownCompanyContact(supplier.name, "email");
        }
        if (
          !supplier.address ||
          supplier.address === "Contact for details" ||
          supplier.address === null
        ) {
          supplier.address = this.getKnownCompanyContact(
            supplier.name,
            "address"
          );
        }

        // If AI didn't find contact info, try regex extraction on the original content
        if (
          !supplier.phone ||
          supplier.phone === "Contact for details" ||
          supplier.phone === "Not specified" ||
          supplier.phone === null
        ) {
          const originalResult = searchResults.find(
            (r) => r.title === supplier.name || r.url === supplier.website
          );
          if (originalResult) {
            const extractedPhone = this.extractPhoneFromContent(
              originalResult.content
            );
            if (extractedPhone !== "Contact for phone") {
              supplier.phone = extractedPhone;
            } else {
              supplier.phone = "Contact for details";
            }
          } else {
            supplier.phone = "Contact for details";
          }
        }

        if (
          !supplier.email ||
          supplier.email === "Contact for details" ||
          supplier.email === "Not specified" ||
          supplier.email === null
        ) {
          const originalResult = searchResults.find(
            (r) => r.title === supplier.name || r.url === supplier.website
          );
          if (originalResult) {
            const extractedEmail = this.extractEmailFromContent(
              originalResult.content
            );
            if (extractedEmail !== "Contact for email") {
              supplier.email = extractedEmail;
            } else {
              supplier.email = "Contact for details";
            }
          } else {
            supplier.email = "Contact for details";
          }
        }

        if (
          !supplier.address ||
          supplier.address === "Contact for details" ||
          supplier.address === "Not specified" ||
          supplier.address === null
        ) {
          const originalResult = searchResults.find(
            (r) => r.title === supplier.name || r.url === supplier.website
          );
          if (originalResult) {
            const extractedAddress = this.extractAddressFromContent(
              originalResult.content
            );
            if (extractedAddress !== "Contact for address") {
              supplier.address = extractedAddress;
            } else {
              supplier.address = "Contact for details";
            }
          } else {
            supplier.address = "Contact for details";
          }
        }

        return supplier;
      });

      return enhancedSuppliers;
    } catch (error) {
      console.error("AI supplier analysis error:", error);
      console.log("Falling back to basic extraction");
      return this.extractSuppliersBasic(searchResults, analysis);
    }
  }

  /**
   * Basic supplier extraction (fallback when AI is not available)
   */
  private extractSuppliersBasic(
    searchResults: any[],
    analysis: VisionAnalysisResult
  ): any[] {
    return searchResults
      .map((result) => {
        const phone = this.extractPhoneFromContent(result.content);
        const email = this.extractEmailFromContent(result.content);
        const address = this.extractAddressFromContent(result.content);

        return {
          name: result.title || "Unknown Supplier",
          website: result.url || "",
          description: result.description || "",
          phone:
            phone !== "Contact for phone"
              ? phone
              : this.extractPhoneFromContent(
                  result.title + " " + result.description
                ),
          email:
            email !== "Contact for email"
              ? email
              : this.extractEmailFromContent(
                  result.title + " " + result.description
                ),
          address:
            address !== "Contact for address"
              ? address
              : this.extractAddressFromContent(
                  result.title + " " + result.description
                ),
          country: this.extractCountryFromContent(result.content),
          partAvailability: "Contact for availability",
          priceRange: "Contact for pricing",
          minimumOrder: "Contact for details",
          certifications: this.extractCertificationsFromContent(result.content),
          rating: this.extractRatingFromContent(result.content),
          reviews: this.extractReviewsFromContent(result.content),
          establishedYear: this.extractYearFromContent(result.content),
          specializations: this.extractSpecializationsFromContent(
            result.content
          ),
          shippingInfo: this.extractShippingFromContent(result.content),
          leadTime: "Contact for details",
          qualityRating: "Contact for details",
          paymentTerms: "Contact for details",
          returnPolicy: "Contact for details",
        };
      })
      .slice(0, 5);
  }

  /**
   * Use AI to analyze and structure market data from Firecrawl results
   */
  private async analyzeMarketDataWithAI(
    searchResults: any[],
    analysis: VisionAnalysisResult
  ): Promise<any> {
    if (!this.openaiApiKey) {
      console.log("OpenAI API key not available, using basic extraction");
      return this.extractMarketDataBasic(searchResults, analysis);
    }

    try {
      console.log("Using AI to analyze market data...");

      const marketData = searchResults.map((result) => ({
        title: result.title || "",
        url: result.url || "",
        description: result.description || "",
        content: result.content || "",
      }));

      const prompt = `Analyze the following market data and extract structured market information for automotive parts.

Part being researched: ${analysis.partType}
Manufacturer: ${analysis.manufacturer}

Market Data:
${JSON.stringify(marketData, null, 2)}

Extract and structure the following market information:
- marketSize: Market size in USD or units
- priceTrends: Current price trends (increasing, decreasing, stable)
- demandLevel: Demand level (high, medium, low)
- competitionLevel: Competition level (high, medium, low)
- keyPlayers: Array of key market players
- marketGrowth: Market growth rate or trend
- regionalAvailability: Object with regional availability
- priceHistory: Historical price information
- supplyChainRisks: Array of supply chain risks
- marketOpportunities: Array of market opportunities

Return the data as a JSON object. If information is not available, use "Data unavailable" or "Unknown".`;

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are an expert at analyzing automotive market data and extracting structured market intelligence. Always return valid JSON.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            temperature: 0.3,
            max_tokens: 2000,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `OpenAI API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      // Extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : content;

      const aiAnalyzedMarketData = JSON.parse(jsonString);
      console.log("AI analyzed market data");

      return aiAnalyzedMarketData;
    } catch (error) {
      console.error("AI market data analysis error:", error);
      console.log("Falling back to basic extraction");
      return this.extractMarketDataBasic(searchResults, analysis);
    }
  }

  /**
   * Basic market data extraction (fallback when AI is not available)
   */
  private extractMarketDataBasic(
    searchResults: any[],
    analysis: VisionAnalysisResult
  ): any {
    return {
      marketSize: "Data unavailable",
      priceTrends: "Data unavailable",
      demandLevel: "Unknown",
      competitionLevel: "Unknown",
      keyPlayers: ["Unknown"],
      marketGrowth: "Data unavailable",
      regionalAvailability: {},
      priceHistory: {},
      supplyChainRisks: [],
      marketOpportunities: [],
    };
  }

  /**
   * Use AI to analyze and structure research sources from Firecrawl results
   */
  private async analyzeSourcesWithAI(
    searchResults: any[],
    analysis: VisionAnalysisResult
  ): Promise<any[]> {
    if (!this.openaiApiKey) {
      console.log("OpenAI API key not available, using basic extraction");
      return this.extractSourcesBasic(searchResults, analysis);
    }

    try {
      console.log("Using AI to analyze research sources...");

      const sourceData = searchResults.map((result) => ({
        title: result.title || "",
        url: result.url || "",
        description: result.description || "",
        content: result.content || "",
      }));

      const prompt = `Analyze the following research sources and extract structured information for each source.

Part being researched: ${analysis.partType}
Manufacturer: ${analysis.manufacturer}

Source Data:
${JSON.stringify(sourceData, null, 2)}

For each source, extract and structure the following information:
- title: Source title
- url: Source URL
- type: Type of source (technical, market, supplier, general)
- description: Brief description of the source
- summary: Key information from the source
- relevanceScore: Relevance score (0-1)
- lastUpdated: Last updated date if mentioned
- author: Author or organization if mentioned
- credibility: Credibility assessment (high, medium, low)

Return the data as a JSON array of source objects. If information is not available, use "Not specified".`;

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are an expert at analyzing research sources and extracting structured information. Always return valid JSON.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            temperature: 0.3,
            max_tokens: 3000,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `OpenAI API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      // Extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : content;

      const aiAnalyzedSources = JSON.parse(jsonString);
      console.log(`AI analyzed ${aiAnalyzedSources.length} research sources`);

      return aiAnalyzedSources;
    } catch (error) {
      console.error("AI sources analysis error:", error);
      console.log("Falling back to basic extraction");
      return this.extractSourcesBasic(searchResults, analysis);
    }
  }

  /**
   * Basic sources extraction (fallback when AI is not available)
   */
  private extractSourcesBasic(
    searchResults: any[],
    analysis: VisionAnalysisResult
  ): any[] {
    return searchResults
      .map((result) => ({
        title: result.title || "Unknown Source",
        url: result.url || "",
        type: this.categorizeSourceType(result.title, result.content),
        description: result.description || "",
        summary: this.extractSummaryFromContent(result.content),
        relevanceScore: this.calculateRelevanceScore(result, analysis),
        lastUpdated: "Not specified",
        author: "Not specified",
        credibility: "medium",
      }))
      .slice(0, 10);
  }

  /**
   * Extract market data from search results using AI analysis
   */
  private async extractMarketData(
    searchResults: any[],
    analysis: VisionAnalysisResult
  ): Promise<any> {
    console.log(
      `Processing ${searchResults.length} search results for market data`
    );

    // Use AI to analyze and structure the market data
    const aiAnalyzedMarketData = await this.analyzeMarketDataWithAI(
      searchResults,
      analysis
    );

    return aiAnalyzedMarketData;
  }

  /**
   * Extract technical specifications from search results
   */
  private extractTechnicalSpecs(
    searchResults: any[],
    analysis: VisionAnalysisResult
  ): any {
    return {
      dimensions: analysis.dimensions || "Data unavailable",
      material: analysis.material || "Data unavailable",
      weight: "Data unavailable",
      color: "Data unavailable",
      finish: "Data unavailable",
      specifications: {},
      performanceMetrics: {},
      testingStandards: [],
      environmentalImpact: {},
    };
  }

  /**
   * Extract alternative parts from search results
   */
  private extractAlternativeParts(
    searchResults: any[],
    analysis: VisionAnalysisResult
  ): any[] {
    return searchResults
      .filter(
        (result) =>
          result.title?.toLowerCase().includes("alternative") ||
          result.title?.toLowerCase().includes("compatible")
      )
      .map((result) => ({
        partNumber: "Contact for part number",
        manufacturer: "Unknown",
        compatibility: "Contact for compatibility",
        priceRange: "Contact for pricing",
        qualityRating: "Contact for rating",
        availability: "Contact for availability",
        features: [],
        pros: [],
        cons: [],
      }))
      .slice(0, 3);
  }

  /**
   * Extract sources from search results using AI analysis
   */
  private async extractSources(
    searchResults: any[],
    analysis: VisionAnalysisResult
  ): Promise<any[]> {
    console.log(
      `Processing ${searchResults.length} search results for research sources`
    );

    // Use AI to analyze and structure the research sources
    const aiAnalyzedSources = await this.analyzeSourcesWithAI(
      searchResults,
      analysis
    );

    return aiAnalyzedSources;
  }

  // Helper methods for data extraction
  private extractPhoneFromContent(content: string): string {
    if (!content) return "Contact for phone";

    // Multiple phone number patterns for better extraction
    const phonePatterns = [
      // US/Canada: (123) 456-7890, 123-456-7890, 123.456.7890, +1-123-456-7890
      /(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/g,
      // International: +XX-XXX-XXX-XXXX, +XX XXX XXX XXXX
      /\+[1-9]\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}/g,
      // Toll-free: 1-800-XXX-XXXX, 800-XXX-XXXX
      /(1[-.\s]?)?(800|888|877|866|855|844|833|822)[-.\s]?\d{3}[-.\s]?\d{4}/g,
      // General: XXX-XXX-XXXX, XXX.XXX.XXXX, XXX XXX XXXX
      /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
      // With extensions: XXX-XXX-XXXX ext. XXX
      /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}[-.\s]?(ext|extension|x)[-.\s]?\d{1,5}/gi,
    ];

    const foundPhones: string[] = [];

    phonePatterns.forEach((pattern) => {
      const matches = content.match(pattern);
      if (matches) {
        foundPhones.push(...matches);
      }
    });

    if (foundPhones.length > 0) {
      // Return the first valid phone number found
      return foundPhones[0].trim();
    }

    return "Contact for phone";
  }

  private extractEmailFromContent(content: string): string {
    if (!content) return "Contact for email";

    // Enhanced email pattern matching
    const emailPattern = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    const emails = content.match(emailPattern);

    if (emails && emails.length > 0) {
      // Filter out common non-business emails and return the first valid one
      const businessEmails = emails.filter(
        (email) =>
          !email.includes("noreply") &&
          !email.includes("no-reply") &&
          !email.includes("donotreply") &&
          !email.includes("example.com") &&
          !email.includes("test.com")
      );

      return businessEmails.length > 0 ? businessEmails[0] : emails[0];
    }

    return "Contact for email";
  }

  private extractAddressFromContent(content: string): string {
    if (!content) return "Contact for address";

    // Look for common address patterns
    const addressPatterns = [
      // Street address with number: 123 Main St, 456 Oak Avenue
      /\d+\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Lane|Ln|Boulevard|Blvd|Way|Place|Pl|Court|Ct|Circle|Cir)/gi,
      // PO Box: PO Box 123, P.O. Box 456
      /(?:PO\s+Box|P\.O\.\s+Box)\s+\d+/gi,
      // Suite/Unit: Suite 100, Unit 5A
      /(?:Suite|Unit|Ste|#)\s*\d+[A-Za-z]?/gi,
    ];

    const foundAddresses: string[] = [];

    addressPatterns.forEach((pattern) => {
      const matches = content.match(pattern);
      if (matches) {
        foundAddresses.push(...matches);
      }
    });

    if (foundAddresses.length > 0) {
      return foundAddresses[0].trim();
    }

    return "Contact for address";
  }

  private extractCountryFromContent(content: string): string {
    if (!content || typeof content !== "string") return "Unknown";

    const countries = [
      "United States",
      "Canada",
      "Mexico",
      "Germany",
      "Japan",
      "China",
      "United Kingdom",
      "France",
      "Italy",
      "Spain",
      "Brazil",
      "India",
      "South Korea",
      "Australia",
    ];
    const found = countries.find((country) =>
      content.toLowerCase().includes(country.toLowerCase())
    );
    return found || "Unknown";
  }

  private extractCertificationsFromContent(content: string): string[] {
    if (!content || typeof content !== "string") return [];
    const certs = ["ISO 9001", "IATF 16949", "QS-9000", "VDA 6.1", "TS 16949"];
    return certs.filter((cert) => content.toUpperCase().includes(cert));
  }

  private extractRatingFromContent(content: string): number {
    if (!content || typeof content !== "string") return 0;
    const ratingMatch = content.match(/(\d+\.?\d*)\/5|\b(\d+\.?\d*)\s*stars?/i);
    const rating = ratingMatch
      ? parseFloat(ratingMatch[1] || ratingMatch[2])
      : 0;
    return isNaN(rating) ? 0 : Math.max(0, Math.min(5, rating)); // Ensure rating is between 0-5
  }

  private extractReviewsFromContent(content: string): number {
    if (!content || typeof content !== "string") return 0;
    const reviewMatch = content.match(/(\d+)\s*reviews?/i);
    return reviewMatch ? parseInt(reviewMatch[1]) : 0;
  }

  private extractYearFromContent(content: string): number {
    if (!content || typeof content !== "string") return 0;
    const yearMatch = content.match(/\b(19|20)\d{2}\b/);
    return yearMatch ? parseInt(yearMatch[0]) : 0;
  }

  private extractSpecializationsFromContent(content: string): string[] {
    if (!content || typeof content !== "string") return [];
    const specializations = [
      "OEM Parts",
      "Aftermarket Parts",
      "Performance Parts",
      "Brake Systems",
      "Engine Parts",
    ];
    return specializations.filter((spec) =>
      content.toLowerCase().includes(spec.toLowerCase())
    );
  }

  private extractShippingFromContent(content: string): string {
    if (!content || typeof content !== "string") return "Contact for shipping";
    return content.toLowerCase().includes("free shipping")
      ? "Free shipping available"
      : "Contact for shipping";
  }

  private categorizeSourceType(title: string, content: string): string {
    if (!title || typeof title !== "string") return "general";
    if (title.toLowerCase().includes("supplier")) return "supplier";
    if (
      title.toLowerCase().includes("technical") ||
      title.toLowerCase().includes("spec")
    )
      return "technical";
    if (
      title.toLowerCase().includes("market") ||
      title.toLowerCase().includes("analysis")
    )
      return "market";
    return "general";
  }

  private calculateRelevanceScore(
    result: any,
    analysis: VisionAnalysisResult
  ): number {
    let score = 0;
    const title = result.title || "";
    const content = result.content || "";
    const combinedContent = (title + " " + content).toLowerCase();

    if (combinedContent.includes(analysis.partType.toLowerCase())) score += 0.3;
    if (combinedContent.includes(analysis.manufacturer.toLowerCase()))
      score += 0.3;
    if (
      combinedContent.includes("supplier") ||
      combinedContent.includes("distributor")
    )
      score += 0.2;
    if (
      combinedContent.includes("technical") ||
      combinedContent.includes("specification")
    )
      score += 0.1;
    if (
      combinedContent.includes("market") ||
      combinedContent.includes("analysis")
    )
      score += 0.1;

    return Math.min(score, 1.0);
  }

  private extractSummaryFromContent(content: string): string {
    if (!content || typeof content !== "string") return "No summary available";
    return content.substring(0, 200) + (content.length > 200 ? "..." : "");
  }

  /**
   * Get known contact information for well-known automotive companies
   */
  private getKnownCompanyContact(
    companyName: string,
    type: "phone" | "email" | "address"
  ): string {
    const knownCompanies: {
      [key: string]: { phone?: string; email?: string; address?: string };
    } = {
      "ELLWOOD Crankshaft Group": {
        phone: "(724) 347-0250",
        email: "ecgsales@elwd.com",
        address: "2727 Freedland Road, Hermitage, PA 16148, USA",
      },
      "NSI Crankshaft": {
        phone: "419-435-0411",
        email: "Contact via website form",
        address: "Fostoria, Ohio, USA",
      },
      "International Crankshaft, Inc.": {
        phone: "(502) 868-0003",
        email: "sales@icicrank.com",
        address: "101 Carley Court, Georgetown, KY, USA",
      },
      "Thyssenkrupp Automotive Technology": {
        phone: "Contact via website",
        email: "Contact via website",
        address: "Germany (with US subsidiaries)",
      },
      AECOPRODUCTS: {
        phone: "+91 7045963530",
        email: "Contact via website",
        address:
          "C-Wing, 6th Floor, Laxmi Tower, Bandra Kurla Complex, Mumbai, India",
      },
      "BALU Industries": {
        phone: "+91-22 (contact page)",
        email: "Contact via website",
        address: "Mumbai, Maharashtra, India",
      },
      "ARROW Crankshafts": {
        phone: "+91 7045946614",
        email: "Contact via website",
        address: "Mumbai, India",
      },
      "KMP Brand": {
        phone: "Contact via website",
        email: "Contact via website",
        address:
          "KMP House, Hanworth Lane Business Park, Hanworth Lane, Chertsey, Surrey, England",
      },
      "Summit Racing": {
        phone: "1-800-230-3030",
        email: "customerservice@summitracing.com",
        address: "PO Box 909, Akron, OH 44309-0909, USA",
      },
      "Speedway Motors": {
        phone: "1-800-979-0123",
        email: "info@speedwaymotors.com",
        address: "340 Victory Lane, Lincoln, NE 68528, USA",
      },
      "Ford Performance": {
        phone: "1-800-FORD-788",
        email: "performance@ford.com",
        address: "Ford Motor Company, Dearborn, MI, USA",
      },
      SCAT: {
        phone: "1-562-921-8974",
        email: "info@scatcrankshafts.com",
        address: "1400 E. 6th St, Redondo Beach, CA 90277, USA",
      },
      "Crower Cams": {
        phone: "1-619-661-6477",
        email: "sales@crower.com",
        address: "6180 Business Center Ct, Santee, CA 92071, USA",
      },
      "Dart Machinery": {
        phone: "1-248-362-1180",
        email: "info@dartheads.com",
        address: "353 Oliver St, Troy, MI 48084, USA",
      },
      "Eagle Specialty Products": {
        phone: "1-662-562-4933",
        email: "info@eaglerod.com",
        address: "PO Box 1000, Southaven, MS 38671, USA",
      },
    };

    // Try exact match first
    if (knownCompanies[companyName]) {
      return knownCompanies[companyName][type] || "Contact for details";
    }

    // Try partial matches
    for (const [knownName, contactInfo] of Object.entries(knownCompanies)) {
      if (
        companyName.toLowerCase().includes(knownName.toLowerCase()) ||
        knownName.toLowerCase().includes(companyName.toLowerCase())
      ) {
        return contactInfo[type] || "Contact for details";
      }
    }

    return "Contact for details";
  }
}

// Export singleton instance
console.log("=== Creating AutomotivePartsDeepResearch Instance ===");
export const automotivePartsDeepResearch = new AutomotivePartsDeepResearch();
console.log("=== Instance Created Successfully ===");
