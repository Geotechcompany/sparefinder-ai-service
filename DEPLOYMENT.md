# Deployment Guide for Automotive Parts Deep Research

This guide will help you deploy your Next.js application to Render.

## Prerequisites

1. **GitHub Repository**: Your code should be in a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **API Keys**: Ensure you have your OpenAI and Firecrawl API keys ready

## Step 1: Prepare Your Repository

### 1.1 Push Your Code to GitHub

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 1.2 Verify Required Files

Make sure these files are in your repository root:

- `package.json`
- `next.config.ts`
- `render.yaml` (created for you)
- `Dockerfile` (created for you)
- `.dockerignore` (created for you)

## Step 2: Deploy to Render

### 2.1 Create a New Web Service

1. Go to [render.com](https://render.com) and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select your repository

### 2.2 Configure the Service

1. **Name**: `automotive-parts-analyzer` (or your preferred name)
2. **Environment**: `Node`
3. **Branch**: `main` (or your default branch)
4. **Root Directory**: Leave empty (uses root)
5. **Build Command**: `npm install && npm run build`
6. **Start Command**: `npm start`

### 2.3 Set Environment Variables

In the Render dashboard, go to Environment tab and add:

```
NODE_ENV=production
OPENAI_API_KEY=your_openai_api_key_here
FIRECRAWL_API_KEY=your_firecrawl_api_key_here
```

### 2.4 Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. Wait for the deployment to complete (usually 5-10 minutes)

## Step 3: Verify Deployment

### 3.1 Check Health Endpoint

Visit: `https://your-app-name.onrender.com/api/health`

You should see a response like:

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 3.2 Test the Application

1. Visit your app URL: `https://your-app-name.onrender.com`
2. Upload an image and test the deep research functionality
3. Check the browser console for any errors

## Step 4: Configure Custom Domain (Optional)

1. In Render dashboard, go to Settings → Custom Domains
2. Add your domain
3. Follow the DNS configuration instructions

## Troubleshooting

### Common Issues

#### Build Failures

- Check that all dependencies are in `package.json`
- Ensure Node.js version compatibility
- Check build logs in Render dashboard

#### Environment Variables

- Verify API keys are correctly set
- Check that variable names match exactly
- Ensure no extra spaces or quotes

#### Runtime Errors

- Check application logs in Render dashboard
- Verify all API endpoints are working
- Test locally first with production environment variables

### Performance Optimization

#### For Production

1. **Enable Caching**: Add caching headers in your API routes
2. **Optimize Images**: Use Next.js Image component
3. **Database**: Consider adding a database for persistent storage
4. **CDN**: Use a CDN for static assets

#### Render-Specific

1. **Auto-Deploy**: Enable auto-deploy on git push
2. **Health Checks**: Ensure `/api/health` endpoint works
3. **Logs**: Monitor logs for errors and performance

## Environment Variables Reference

| Variable            | Description                        | Required |
| ------------------- | ---------------------------------- | -------- |
| `NODE_ENV`          | Environment mode                   | Yes      |
| `OPENAI_API_KEY`    | OpenAI API key for AI analysis     | Yes      |
| `FIRECRAWL_API_KEY` | Firecrawl API key for web scraping | Yes      |

## Monitoring and Maintenance

### 1. Logs

- Access logs in Render dashboard
- Monitor for errors and performance issues
- Set up alerts for critical errors

### 2. Updates

- Push changes to your main branch
- Render will automatically redeploy
- Monitor deployment status

### 3. Scaling

- Free tier has limitations
- Upgrade to paid plan for better performance
- Consider horizontal scaling for high traffic

## Security Considerations

1. **API Keys**: Never commit API keys to git
2. **Environment Variables**: Use Render's secure environment variable storage
3. **HTTPS**: Render provides HTTPS by default
4. **CORS**: Configure CORS properly for production

## Support

- **Render Documentation**: [render.com/docs](https://render.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **GitHub Issues**: Create issues in your repository for bugs

## Cost Estimation

- **Free Tier**: $0/month (with limitations)
- **Starter Plan**: $7/month (recommended for production)
- **Professional Plan**: $25/month (for high traffic)

The free tier includes:

- 750 hours/month
- Sleep after 15 minutes of inactivity
- 512MB RAM
- 1GB disk space
