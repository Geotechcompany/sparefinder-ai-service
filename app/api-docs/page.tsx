import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Code,
  Zap,
  Shield,
  Globe,
  FileText,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Copy,
  Play,
} from "lucide-react";

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Code className="h-8 w-8 text-blue-600" />
            API Reference
          </h1>
          <p className="text-lg text-gray-600">
            Complete technical documentation for developers
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Base URL</CardTitle>
              </CardHeader>
              <CardContent>
                <code className="text-lg font-mono bg-gray-100 px-4 py-2 rounded">
                  https://your-domain.com/api
                </code>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  This API uses API keys for authentication. Include your API
                  key in the request headers.
                </p>
                <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
                  <div>Authorization: Bearer YOUR_API_KEY</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rate Limits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">60</div>
                    <div className="text-sm text-gray-600">
                      Requests per minute
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      10MB
                    </div>
                    <div className="text-sm text-gray-600">Max file size</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">3</div>
                    <div className="text-sm text-gray-600">
                      Supported formats
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Endpoints Tab */}
          <TabsContent value="endpoints" className="space-y-6">
            {/* Deep Research Endpoint */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800"
                    >
                      POST
                    </Badge>
                    <span>/parts/analyze-deep-research</span>
                  </CardTitle>
                  <Badge variant="secondary">Production</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Performs comprehensive analysis of automotive parts using AI
                    vision, supplier research, market data, and technical
                    specifications.
                  </p>

                  <div>
                    <h4 className="font-semibold mb-2">Request Parameters</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="font-mono text-blue-600">file</div>
                          <div className="text-gray-600">
                            Image file (required)
                          </div>
                          <div className="text-xs text-gray-500">
                            JPEG, PNG, WebP
                          </div>
                        </div>
                        <div>
                          <div className="font-mono text-blue-600">
                            max_size
                          </div>
                          <div className="text-gray-600">10MB limit</div>
                          <div className="text-xs text-gray-500">Optional</div>
                        </div>
                        <div>
                          <div className="font-mono text-blue-600">format</div>
                          <div className="text-gray-600">
                            multipart/form-data
                          </div>
                          <div className="text-xs text-gray-500">Required</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Response Schema</h4>
                    <div className="bg-gray-900 rounded-lg p-4 text-blue-400 font-mono text-sm overflow-x-auto">
                      <div>{"{"}</div>
                      <div> "success": boolean,</div>
                      <div> "analysis": {"{"}</div>
                      <div> "partType": string,</div>
                      <div> "manufacturer": string,</div>
                      <div> "confidence": number,</div>
                      <div> "features": string[],</div>
                      <div> "partNumber": string,</div>
                      <div> "dimensions": string,</div>
                      <div> "material": string,</div>
                      <div> "condition": string,</div>
                      <div> "ageEstimate": string,</div>
                      <div> "qualityIndicators": string[]</div>
                      <div> {"}"},</div>
                      <div> "suppliers": SupplierInfo[],</div>
                      <div> "marketData": MarketData,</div>
                      <div> "technicalSpecs": TechnicalSpecs,</div>
                      <div> "alternatives": AlternativePart[],</div>
                      <div> "recommendations": Recommendation[],</div>
                      <div> "researchSources": ResearchSource[],</div>
                      <div> "confidence": number,</div>
                      <div> "timestamp": string</div>
                      <div>{"}"}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Check Endpoint */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-800"
                    >
                      GET
                    </Badge>
                    <span>/health</span>
                  </CardTitle>
                  <Badge variant="secondary">Monitoring</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Returns the current status of the API and its dependencies.
                  </p>

                  <div>
                    <h4 className="font-semibold mb-2">Response Schema</h4>
                    <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
                      <div>{"{"}</div>
                      <div> "status": "healthy" | "unhealthy",</div>
                      <div> "timestamp": string,</div>
                      <div> "version": string,</div>
                      <div> "services": {"{"}</div>
                      <div> "openai": {"{"}</div>
                      <div> "status": string,</div>
                      <div> "keyPrefix": string</div>
                      <div> {"}"},</div>
                      <div> "firecrawl": {"{"}</div>
                      <div> "status": string,</div>
                      <div> "keyPrefix": string</div>
                      <div> {"}"}</div>
                      <div> {"}"},</div>
                      <div> "uptime": number,</div>
                      <div> "memory": {"{"}</div>
                      <div> "rss": number,</div>
                      <div> "heapTotal": number,</div>
                      <div> "heapUsed": number</div>
                      <div> {"}"}</div>
                      <div>{"}"}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Examples Tab */}
          <TabsContent value="examples" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>cURL Example</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
                  <div>
                    curl -X POST
                    https://your-domain.com/api/parts/analyze-deep-research \
                  </div>
                  <div> -H "Content-Type: multipart/form-data" \</div>
                  <div> -F "file=@brake-pad.jpg"</div>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>JavaScript Example</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 text-yellow-400 font-mono text-sm overflow-x-auto">
                  <div>const formData = new FormData();</div>
                  <div>formData.append('file', imageFile);</div>
                  <div></div>
                  <div>
                    const response = await
                    fetch('/api/parts/analyze-deep-research', {"{"}
                  </div>
                  <div> method: 'POST',</div>
                  <div> body: formData</div>
                  <div>{"}"});</div>
                  <div></div>
                  <div>const result = await response.json();</div>
                  <div>console.log(result.analysis);</div>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Python Example</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 text-blue-400 font-mono text-sm overflow-x-auto">
                  <div>import requests</div>
                  <div></div>
                  <div>
                    url =
                    "https://your-domain.com/api/parts/analyze-deep-research"
                  </div>
                  <div>
                    files = {"{"}"file": open("brake-pad.jpg", "rb"){"}"}
                  </div>
                  <div></div>
                  <div>response = requests.post(url, files=files)</div>
                  <div>result = response.json()</div>
                  <div>print(result["analysis"])</div>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Errors Tab */}
          <TabsContent value="errors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>HTTP Status Codes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Badge className="bg-green-600">200</Badge>
                    <div>
                      <div className="font-semibold">Success</div>
                      <div className="text-sm text-gray-600">
                        Analysis completed successfully
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <Badge className="bg-red-600">400</Badge>
                    <div>
                      <div className="font-semibold">Bad Request</div>
                      <div className="text-sm text-gray-600">
                        Invalid file format or missing data
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <Badge className="bg-red-600">413</Badge>
                    <div>
                      <div className="font-semibold">Payload Too Large</div>
                      <div className="text-sm text-gray-600">
                        File size exceeds 10MB limit
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <Badge className="bg-red-600">500</Badge>
                    <div>
                      <div className="font-semibold">Internal Server Error</div>
                      <div className="text-sm text-gray-600">
                        API or service error
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <Badge className="bg-yellow-600">503</Badge>
                    <div>
                      <div className="font-semibold">Service Unavailable</div>
                      <div className="text-sm text-gray-600">
                        API keys not configured
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Error Response Format</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 text-red-400 font-mono text-sm">
                  <div>{"{"}</div>
                  <div> "error": "File size exceeds 10MB limit",</div>
                  <div> "timestamp": "2024-01-15T10:30:00.000Z",</div>
                  <div> "code": "FILE_TOO_LARGE"</div>
                  <div>{"}"}</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
