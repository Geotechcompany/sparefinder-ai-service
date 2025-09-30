"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Loader2,
  Upload,
  Car,
  Phone,
  Globe,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  Target,
  Lightbulb,
  ExternalLink,
  Star,
  Clock,
  DollarSign,
  Shield,
  Award,
} from "lucide-react";
import { toast } from "sonner";

interface DeepResearchResult {
  analysis: {
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
  };
  suppliers: SupplierInfo[];
  marketData: MarketData;
  technicalSpecs: TechnicalSpecs;
  alternatives: AlternativePart[];
  partHistory: PartHistory[];
  researchSources: ResearchSource[];
  confidence: number;
}

interface TechnicalSpecs {
  dimensions?: string;
  material?: string;
  weight?: string;
  color?: string;
  finish?: string;
  specifications?: Record<string, string>;
  performanceMetrics?: Record<string, string>;
  testingStandards?: string[];
  environmentalImpact?: Record<string, string>;
}

interface AlternativePart {
  partNumber: string;
  manufacturer: string;
  compatibility: string;
  priceRange: string;
  qualityRating?: string;
  availability?: string;
  features?: string[];
  pros?: string[];
  cons?: string[];
}

interface SupplierInfo {
  name: string;
  website: string;
  phone: string;
  email: string;
  address: string;
  country: string;
  partAvailability: "In Stock" | "Limited" | "Out of Stock" | "Unknown";
  priceRange?: string;
  minimumOrder?: string;
  certifications: string[];
  shippingInfo?: string;
  leadTime?: string;
  rating?: number;
  reviews?: number;
  establishedYear?: number;
  specializations?: string[];
  qualityRating?: string;
  paymentTerms?: string;
  returnPolicy?: string;
}

interface MarketData {
  marketSize?: string;
  priceTrends?: string;
  demandLevel?: "High" | "Medium" | "Low";
  competitionLevel?: "High" | "Medium" | "Low";
  keyPlayers?: string[];
  marketGrowth?: string;
  regionalAvailability?: Record<string, string>;
  priceHistory?: Record<string, string>;
  supplyChainRisks?: string[];
  marketOpportunities?: string[];
}

interface ResearchSource {
  url: string;
  title: string;
  type: "supplier" | "technical" | "market" | "review" | "specification";
  relevanceScore: number;
  lastUpdated?: string;
  summary?: string;
}

interface PartHistory {
  year: number;
  event: string;
  description: string;
  significance: "major" | "minor" | "milestone";
  impact: string;
  source?: string;
}

export function AutomotivePartsDeepResearch() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] =
    useState<DeepResearchResult | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [researchProgress, setResearchProgress] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper function to safely render values
  const safeRenderValue = (value: any): string => {
    if (value === null || value === undefined) {
      return "N/A";
    }
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return String(value);
    }
    if (typeof value === "object") {
      try {
        return JSON.stringify(value, null, 2);
      } catch (error) {
        return "[Object]";
      }
    }
    return String(value);
  };

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const analyzePart = async () => {
    if (!fileInputRef.current?.files?.[0]) {
      toast.error("Please select an image first");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setResearchProgress("Initializing deep research analysis...");

    try {
      const formData = new FormData();
      formData.append("file", fileInputRef.current.files[0]);

      // Simulate progress updates
      const progressSteps = [
        "Analyzing part image with AI...",
        "Researching suppliers worldwide...",
        "Gathering market data and trends...",
        "Analyzing technical specifications...",
        "Finding alternative parts...",
        "Generating recommendations...",
        "Compiling research sources...",
      ];

      let currentStep = 0;
      const progressInterval = setInterval(() => {
        if (currentStep < progressSteps.length) {
          setResearchProgress(progressSteps[currentStep]);
          currentStep++;
        }
      }, 2000);

      const response = await fetch("/api/parts/analyze-deep-research", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setResearchProgress("Analysis complete!");

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Analysis failed");
      }

      const data = await response.json();
      setAnalysisResult(data.analysis);
      toast.success("Deep research analysis completed successfully!");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error(error instanceof Error ? error.message : "Analysis failed");
    } finally {
      setIsAnalyzing(false);
      setResearchProgress("");
    }
  };

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case "In Stock":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Limited":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "Out of Stock":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Limited":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!isClient) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
            <Car className="h-10 w-10" />
            Automotive Parts Deep Research
          </h1>
          <p className="text-muted-foreground text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
          <Car className="h-10 w-10" />
          Automotive Parts Deep Research
        </h1>
        <p className="text-muted-foreground text-lg">
          Advanced AI-powered analysis with comprehensive market research and
          supplier intelligence
        </p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Part Image
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Select Image
            </Button>
            {selectedImage && (
              <div className="flex items-center gap-2">
                <img
                  src={selectedImage}
                  alt="Selected part"
                  className="h-16 w-16 object-cover rounded border"
                />
                <span className="text-sm text-muted-foreground">
                  Image selected
                </span>
              </div>
            )}
          </div>

          {researchProgress && (
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              {researchProgress}
            </div>
          )}

          <Button
            onClick={analyzePart}
            disabled={!selectedImage || isAnalyzing}
            className="w-full"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Deep Research Analysis...
              </>
            ) : (
              <>
                <Target className="h-5 w-5 mr-2" />
                Start Deep Research
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Part Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Part Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysisResult.analysis.partNumber && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Part Number
                    </label>
                    <p className="text-lg font-semibold">
                      {analysisResult.analysis.partNumber}
                    </p>
                  </div>
                )}
                {analysisResult.analysis.manufacturer && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Manufacturer
                    </label>
                    <p className="text-lg font-semibold">
                      {analysisResult.analysis.manufacturer}
                    </p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Confidence
                  </label>
                  <p className="text-lg font-semibold">
                    {Math.round(analysisResult.confidence * 100)}%
                  </p>
                </div>
                {analysisResult.analysis.condition && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Condition
                    </label>
                    <p className="text-lg font-semibold">
                      {analysisResult.analysis.condition}
                    </p>
                  </div>
                )}
                {analysisResult.analysis.ageEstimate && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Age Estimate
                    </label>
                    <p className="text-lg font-semibold">
                      {analysisResult.analysis.ageEstimate}
                    </p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Part Type
                  </label>
                  <p className="text-lg font-semibold">
                    {analysisResult.analysis.partType}
                  </p>
                </div>
              </div>

              {analysisResult.analysis.features.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Key Features
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {analysisResult.analysis.features.map((feature, index) => (
                      <Badge key={index} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {analysisResult.analysis.qualityIndicators &&
                analysisResult.analysis.qualityIndicators.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Quality Indicators
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {analysisResult.analysis.qualityIndicators.map(
                        (indicator, index) => (
                          <Badge key={index} variant="outline">
                            {indicator}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                )}

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Analysis Notes
                </label>
                <p className="text-sm mt-1">
                  {safeRenderValue(analysisResult.analysis.notes)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Market Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Market Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysisResult.marketData.marketSize && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Market Size
                    </label>
                    <p className="text-lg font-semibold">
                      {safeRenderValue(analysisResult.marketData.marketSize)}
                    </p>
                  </div>
                )}
                {analysisResult.marketData.demandLevel && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Demand Level
                    </label>
                    <Badge
                      className={getDemandColor(
                        analysisResult.marketData.demandLevel
                      )}
                    >
                      {analysisResult.marketData.demandLevel}
                    </Badge>
                  </div>
                )}
                {analysisResult.marketData.competitionLevel && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Competition
                    </label>
                    <Badge
                      className={getDemandColor(
                        analysisResult.marketData.competitionLevel
                      )}
                    >
                      {analysisResult.marketData.competitionLevel}
                    </Badge>
                  </div>
                )}
                {analysisResult.marketData.marketGrowth && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Market Growth
                    </label>
                    <p className="text-sm">
                      {safeRenderValue(analysisResult.marketData.marketGrowth)}
                    </p>
                  </div>
                )}
                {analysisResult.marketData.priceTrends && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Price Trends
                    </label>
                    <p className="text-sm">
                      {safeRenderValue(analysisResult.marketData.priceTrends)}
                    </p>
                  </div>
                )}
              </div>

              {analysisResult.marketData.keyPlayers && (
                <div className="mt-4">
                  <label className="text-sm font-medium text-muted-foreground">
                    Key Players
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {analysisResult.marketData.keyPlayers.map(
                      (player, index) => (
                        <Badge key={index} variant="outline">
                          {player}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Technical Specifications */}
          {analysisResult.technicalSpecs && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Technical Specifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(analysisResult.technicalSpecs).map(
                    ([key, value]) => (
                      <div key={key}>
                        <label className="text-sm font-medium text-muted-foreground">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </label>
                        <div className="text-sm">
                          {typeof value === "object" && value !== null ? (
                            <div className="space-y-1">
                              {Object.entries(value).map(
                                ([subKey, subValue]) => (
                                  <div
                                    key={subKey}
                                    className="flex justify-between"
                                  >
                                    <span className="font-medium">
                                      {subKey}:
                                    </span>
                                    <span>{safeRenderValue(subValue)}</span>
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <p>{safeRenderValue(value)}</p>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Part History */}
          {analysisResult.partHistory &&
            analysisResult.partHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Part History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResult.partHistory
                      .sort((a, b) => b.year - a.year)
                      .map((history, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                                <span className="text-lg font-bold text-blue-600">
                                  {history.year}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-semibold text-lg">
                                  {history.event}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {history.description}
                                </p>
                              </div>
                            </div>
                            <Badge
                              className={
                                history.significance === "milestone"
                                  ? "bg-purple-100 text-purple-800"
                                  : history.significance === "major"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                            >
                              {history.significance}
                            </Badge>
                          </div>
                          <div className="ml-15">
                            <p className="text-sm mb-2">
                              <strong>Impact:</strong> {history.impact}
                            </p>
                            {history.source && (
                              <p className="text-xs text-muted-foreground">
                                <strong>Source:</strong> {history.source}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}

          {/* Enhanced Suppliers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Global Suppliers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysisResult.suppliers.map((supplier, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {supplier.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {supplier.country} • Est. {supplier.establishedYear}
                        </p>
                        {supplier.rating &&
                          typeof supplier.rating === "number" && (
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">
                                {supplier.rating.toFixed(1)}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                ({supplier.reviews} reviews)
                              </span>
                            </div>
                          )}
                      </div>
                      <div className="flex items-center gap-2">
                        {getAvailabilityIcon(supplier.partAvailability)}
                        <Badge
                          className={getAvailabilityColor(
                            supplier.partAvailability
                          )}
                        >
                          {supplier.partAvailability}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <a
                            href={supplier.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-1"
                          >
                            {supplier.website}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{supplier.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{supplier.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{supplier.address}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {supplier.priceRange && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">
                              Price Range
                            </label>
                            <p className="text-sm font-semibold">
                              {supplier.priceRange}
                            </p>
                          </div>
                        )}
                        {supplier.leadTime && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">
                              Lead Time
                            </label>
                            <p className="text-sm">{supplier.leadTime}</p>
                          </div>
                        )}
                        {supplier.qualityRating && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">
                              Quality Rating
                            </label>
                            <Badge variant="outline">
                              {supplier.qualityRating}
                            </Badge>
                          </div>
                        )}
                        {supplier.paymentTerms && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">
                              Payment Terms
                            </label>
                            <p className="text-sm">{supplier.paymentTerms}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {supplier.specializations &&
                      supplier.specializations.length > 0 && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">
                            Specializations
                          </label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {Array.isArray(supplier.specializations) &&
                              supplier.specializations.map(
                                (spec, specIndex) => (
                                  <Badge
                                    key={specIndex}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {spec}
                                  </Badge>
                                )
                              )}
                          </div>
                        </div>
                      )}

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Certifications
                      </label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {Array.isArray(supplier.certifications) &&
                          supplier.certifications.map((cert, certIndex) => (
                            <Badge
                              key={certIndex}
                              variant="outline"
                              className="text-xs"
                            >
                              {cert}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Research Sources */}
          {analysisResult.researchSources &&
            analysisResult.researchSources.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5" />
                    Research Sources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.researchSources.map((source, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline font-medium flex items-center gap-1"
                            >
                              {source.title}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                            <p className="text-sm text-muted-foreground mt-1">
                              {source.summary}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Badge variant="outline">{source.type}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {Math.round(source.relevanceScore * 100)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
        </div>
      )}
    </div>
  );
}
