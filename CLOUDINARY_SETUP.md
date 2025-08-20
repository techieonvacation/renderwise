# Cloudinary Setup for Image Uploads

## Overview
This project now uses Cloudinary for image uploads instead of local filesystem storage. This fixes the Vercel deployment issue where local file writes are not allowed in serverless environments.

## Setup Steps

### 1. Create a Cloudinary Account
1. Go to [Cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Verify your email

### 2. Get Your Credentials
1. After logging in, go to your Dashboard
2. Copy the following values:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 3. Set Environment Variables
Create a `.env.local` file in your project root (if it doesn't exist) and add:

```bash
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

### 4. For Vercel Deployment
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the same three environment variables:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. Redeploy your project

## Benefits of This Solution

✅ **Works on Vercel** - No filesystem dependencies
✅ **Automatic CDN** - Images served from Cloudinary's global network
✅ **Image Optimization** - Automatic format and quality optimization
✅ **Scalable** - Handles any number of uploads
✅ **Free Tier** - Generous free usage limits
✅ **Secure** - Images stored in the cloud, not on your server

## File Structure
- Images are uploaded to the `Eleservsoftech-uploads` folder in Cloudinary
- Each image gets a unique public ID
- URLs are returned in the format: `https://res.cloudinary.com/your-cloud-name/image/upload/...`

## Testing
1. Set up your environment variables
2. Restart your development server
3. Try uploading an image through your admin interface
4. Check the browser console for any errors
5. Verify the image appears with a Cloudinary URL

## Troubleshooting
- **"Failed to upload file"**: Check your Cloudinary credentials
- **"Invalid file type"**: Ensure the file is JPEG, PNG, WebP, or GIF
- **"File size too large"**: Files must be under 5MB
- **Environment variables not working**: Restart your dev server after adding them

## Migration Notes
- Old local uploads in `public/uploads/` will no longer work
- Update any hardcoded image paths to use the new Cloudinary URLs
- Consider migrating existing images to Cloudinary if needed
