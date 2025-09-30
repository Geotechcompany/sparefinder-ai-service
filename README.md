# Automotive Parts Deep Research

A focused web application that provides AI-powered automotive parts identification and comprehensive supplier research.

## Features

- **AI-Powered Analysis**: Advanced image recognition for automotive parts
- **Deep Research**: Comprehensive market analysis and supplier intelligence
- **No Storage**: Direct image processing without storing files
- **Structured Results**: JSON responses with detailed analysis

## API Endpoint

### POST `/api/parts/analyze-deep-research`

Analyzes automotive part images and returns comprehensive research data.

**Request:**

- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `file` (image file - JPEG, PNG, WebP, max 10MB)

**Response:**

```json
{
  "success": true,
  "analysis": {
    "analysis": {
      "partType": "brake_pad",
      "manufacturer": "Brembo",
      "confidence": 0.89,
      "notes": "High-quality ceramic brake pad...",
      "features": ["ceramic_compound", "anti_squeal_technology"],
      "partNumber": "BRK-12345",
      "dimensions": "120mm x 60mm x 15mm",
      "material": "Ceramic compound with steel backing",
      "condition": "excellent",
      "ageEstimate": "2020-2022",
      "qualityIndicators": ["premium", "oem_quality"]
    },
    "suppliers": [...],
    "marketData": {...},
    "technicalSpecs": {...},
    "alternatives": [...],
    "recommendations": [...],
    "researchSources": [...],
    "confidence": 0.89
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Setup

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Configure environment variables:**

   ```bash
   # Required
   OPENAI_API_KEY=your_openai_key
   FIRECRAWL_API_KEY=your_firecrawl_key

   # Optional
   GOOGLE_VISION_API_KEY=your_google_vision_key
   ```

3. **Run the development server:**

   ```bash
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Usage

1. **Upload an image** of an automotive part
2. **Click "Start Deep Research"** to begin analysis
3. **View comprehensive results** including:
   - Part identification and specifications
   - Global supplier information
   - Market analysis and trends
   - Alternative parts
   - Actionable recommendations

## Technology Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **OpenAI Vision API** - Image analysis
- **Firecrawl** - Web research
- **Radix UI** - Component library

## File Structure

```
├── app/
│   ├── api/parts/analyze-deep-research/route.ts  # Main API endpoint
│   ├── layout.tsx                                # Root layout
│   └── page.tsx                                  # Main page
├── components/
│   ├── automotive-parts-deep-research.tsx        # Main component
│   └── ui/                                       # UI components
├── lib/
│   └── automotive-parts-deep-research.ts         # AI service
└── package.json
```

## API Integration

The endpoint can be integrated into any application by sending a POST request with an image file:

```javascript
const formData = new FormData();
formData.append("file", imageFile);

const response = await fetch("/api/parts/analyze-deep-research", {
  method: "POST",
  body: formData,
});

const result = await response.json();
```
