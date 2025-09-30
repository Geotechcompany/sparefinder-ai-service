import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Code, 
  Zap, 
  Shield, 
  Globe, 
  FileText,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <BookOpen className="h-10 w-10 text-blue-600" />
            API Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive documentation for the Automotive Parts Deep Research API
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="secondary" className="text-sm">
              <Zap className="h-3 w-3 mr-1" />
              Production Ready
            </Badge>
            <Badge variant="secondary" className="text-sm">
              <Shield className="h-3 w-3 mr-1" />
              Secure
            </Badge>
            <Badge variant="secondary" className="text-sm">
              <Globe className="h-3 w-3 mr-1" />
              Global
            </Badge>
          </div>
        </div>

        {/* Quick Start */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Quick Start
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
              <div>curl -X POST https://your-domain.com/api/parts/analyze-deep-research \</div>
              <div>  -H "Content-Type: multipart/form-data" \</div>
              <div>  -F "file=@automotive-part.jpg"</div>
            </div>
          </CardContent>
        </Card>

        {/* API Endpoints */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Deep Research Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">POST</Badge>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    /api/parts/analyze-deep-research
                  </code>
                </div>
                <p className="text-sm text-gray-600">
                  Advanced AI-powered analysis with comprehensive market research and supplier intelligence
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">Image Analysis</Badge>
                  <Badge variant="secondary" className="text-xs">Supplier Research</Badge>
                  <Badge variant="secondary" className="text-xs">Market Data</Badge>
                  <Badge variant="secondary" className="text-xs">Technical Specs</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Health Check
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">GET</Badge>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    /api/health
                  </code>
                </div>
                <p className="text-sm text-gray-600">
                  Check API status, service availability, and configuration
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">Status</Badge>
                  <Badge variant="secondary" className="text-xs">Uptime</Badge>
                  <Badge variant="secondary" className="text-xs">Memory</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Request/Response Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Request Example</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
                <div>POST /api/parts/analyze-deep-research</div>
                <div>Content-Type: multipart/form-data</div>
                <div className="mt-2 text-gray-400"># Form data:</div>
                <div>file: [image file - JPEG, PNG, WebP]</div>
                <div className="mt-2 text-gray-400"># Max file size: 10MB</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Response Example</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 rounded-lg p-4 text-blue-400 font-mono text-sm overflow-x-auto">
                <div>{"{"}</div>
                <div>  "success": true,</div>
                <div>  "analysis": {"{"}</div>
                <div>    "partType": "brake_pad",</div>
                <div>    "manufacturer": "Brembo",</div>
                <div>    "confidence": 0.95,</div>
                <div>    "features": ["ceramic", "low_dust"]</div>
                <div>  {"}"},</div>
                <div>  "suppliers": [...],</div>
                <div>  "marketData": {...},</div>
                <div>  "recommendations": [...]</div>
                <div>{"}"}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Features & Capabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-yellow-500 mt-1" />
                <div>
                  <h4 className="font-semibold">AI Vision Analysis</h4>
                  <p className="text-sm text-gray-600">Advanced image recognition using GPT-4o</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Global Supplier Research</h4>
                  <p className="text-sm text-gray-600">Real-time web scraping for suppliers</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Technical Specifications</h4>
                  <p className="text-sm text-gray-600">Detailed technical data extraction</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-purple-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Market Intelligence</h4>
                  <p className="text-sm text-gray-600">Current market trends and pricing</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Code className="h-5 w-5 text-orange-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Alternative Parts</h4>
                  <p className="text-sm text-gray-600">Compatible alternatives research</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-red-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Smart Recommendations</h4>
                  <p className="text-sm text-gray-600">AI-powered actionable insights</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Handling */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Error Handling
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">HTTP Status Codes</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">200</Badge>
                    <span className="text-sm">Success - Analysis completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">400</Badge>
                    <span className="text-sm">Bad Request - Invalid file or missing data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">500</Badge>
                    <span className="text-sm">Internal Server Error - API or service error</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Error Response Format</h4>
                <div className="bg-gray-900 rounded-lg p-4 text-red-400 font-mono text-sm">
                  <div>{"{"}</div>
                  <div>  "error": "Error message description",</div>
                  <div>  "timestamp": "2024-01-15T10:30:00.000Z"</div>
                  <div>{"}"}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rate Limits & Pricing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Rate Limits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Requests per minute:</span>
                  <Badge variant="secondary">60</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">File size limit:</span>
                  <Badge variant="secondary">10MB</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Supported formats:</span>
                  <Badge variant="secondary">JPEG, PNG, WebP</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Per analysis:</span>
                  <Badge variant="secondary">$0.50</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Bulk discount:</span>
                  <Badge variant="secondary">10% off 100+</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Enterprise:</span>
                  <Badge variant="secondary">Contact us</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support */}
        <Card>
          <CardHeader>
            <CardTitle>Support & Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Documentation</h4>
                <div className="space-y-1">
                  <Button variant="link" className="p-0 h-auto text-blue-600">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    API Reference
                  </Button>
                  <br />
                  <Button variant="link" className="p-0 h-auto text-blue-600">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Integration Guide
                  </Button>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Contact</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>Email: support@automotive-parts-api.com</div>
                  <div>Phone: +1 (555) 123-4567</div>
                  <div>Response time: &lt; 24 hours</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
