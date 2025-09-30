"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Server,
  Database,
  Zap,
  Globe,
  Clock,
  MemoryStick,
} from "lucide-react";

interface HealthData {
  status: string;
  timestamp: string;
  version: string;
  services: {
    openai: {
      status: string;
      keyPrefix: string | null;
    };
    firecrawl: {
      status: string;
      keyPrefix: string | null;
    };
  };
  uptime: number;
  memory: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
  };
}

export default function StatusPage() {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const fetchHealth = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/health");
      const data = await response.json();
      setHealthData(data);
      setLastChecked(new Date());
    } catch (error) {
      console.error("Failed to fetch health data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
      case "configured":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "unhealthy":
      case "not_configured":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "configured":
        return "bg-green-100 text-green-800";
      case "unhealthy":
      case "not_configured":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const formatBytes = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB"];
    if (bytes === 0) return "0 Bytes";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Server className="h-8 w-8 text-blue-600" />
            System Status
          </h1>
          <p className="text-lg text-gray-600">
            Real-time monitoring of API health and services
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button
              onClick={fetchHealth}
              disabled={loading}
              variant="outline"
              size="sm"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            {lastChecked && (
              <span className="text-sm text-gray-500">
                Last checked: {lastChecked.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>

        {loading && !healthData ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-600 mb-4" />
            <p className="text-gray-600">Loading status information...</p>
          </div>
        ) : healthData ? (
          <div className="space-y-6">
            {/* Overall Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {getStatusIcon(healthData.status)}
                  Overall Status
                  <Badge className={getStatusColor(healthData.status)}>
                    {healthData.status.toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      v{healthData.version}
                    </div>
                    <div className="text-sm text-gray-600">API Version</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {formatUptime(healthData.uptime)}
                    </div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {new Date(healthData.timestamp).toLocaleTimeString()}
                    </div>
                    <div className="text-sm text-gray-600">Last Update</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500" />
                  Services Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-orange-500" />
                      <div>
                        <div className="font-semibold">OpenAI API</div>
                        <div className="text-sm text-gray-600">
                          {healthData.services.openai.keyPrefix ||
                            "Not configured"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(healthData.services.openai.status)}
                      <Badge
                        className={getStatusColor(
                          healthData.services.openai.status
                        )}
                      >
                        {healthData.services.openai.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="font-semibold">Firecrawl API</div>
                        <div className="text-sm text-gray-600">
                          {healthData.services.firecrawl.keyPrefix ||
                            "Not configured"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(healthData.services.firecrawl.status)}
                      <Badge
                        className={getStatusColor(
                          healthData.services.firecrawl.status
                        )}
                      >
                        {healthData.services.firecrawl.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MemoryStick className="h-5 w-5 text-green-500" />
                  System Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatBytes(healthData.memory.rss)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Resident Set Size
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {formatBytes(healthData.memory.heapTotal)}
                    </div>
                    <div className="text-sm text-gray-600">Total Heap</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {formatBytes(healthData.memory.heapUsed)}
                    </div>
                    <div className="text-sm text-gray-600">Used Heap</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-500" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Memory Usage</span>
                      <span className="text-sm text-gray-600">
                        {Math.round(
                          (healthData.memory.heapUsed /
                            healthData.memory.heapTotal) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            (healthData.memory.heapUsed /
                              healthData.memory.heapTotal) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">System Health</span>
                      <span className="text-sm text-gray-600">
                        {healthData.status === "healthy"
                          ? "Excellent"
                          : "Needs Attention"}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          healthData.status === "healthy"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                        style={{
                          width:
                            healthData.status === "healthy" ? "100%" : "60%",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Unable to fetch status
              </h3>
              <p className="text-gray-600 mb-4">
                There was an error retrieving the system status.
              </p>
              <Button onClick={fetchHealth} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
