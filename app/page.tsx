import { AutomotivePartsDeepResearch } from "@/components/automotive-parts-deep-research";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Code, Activity, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Automotive Parts Deep Research
            </h1>
            <div className="flex items-center gap-4">
              <Link href="/docs">
                <Button variant="ghost" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Docs
                </Button>
              </Link>
              <Link href="/api-docs">
                <Button variant="ghost" size="sm">
                  <Code className="h-4 w-4 mr-2" />
                  API
                </Button>
              </Link>
              <Link href="/status">
                <Button variant="ghost" size="sm">
                  <Activity className="h-4 w-4 mr-2" />
                  Status
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Learn how to use the API with comprehensive guides and examples.
              </p>
              <Link href="/docs">
                <Button variant="outline" className="w-full">
                  View Docs
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-green-500" />
                API Reference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Complete technical reference for developers and integrators.
              </p>
              <Link href="/api-docs">
                <Button variant="outline" className="w-full">
                  API Docs
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-500" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Monitor API health, uptime, and service availability.
              </p>
              <Link href="/status">
                <Button variant="outline" className="w-full">
                  Check Status
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Main Analyzer Component */}
        <AutomotivePartsDeepResearch />
      </div>
    </div>
  );
}
