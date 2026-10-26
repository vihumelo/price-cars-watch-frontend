# Prices Car Watch Frontend

A simple interface for the [Prices Car Watch backend](https://github.com/vihumelo/price-cars-watch-backend). Users can create, confirm, and cancel vehicle listing alerts through the backend API.

This frontend exists to make the backend easy to try. The main portfolio project focuses on AWS Serverless architecture, observability, Infrastructure as Code, and CI/CD.

## Stack and implementation

Built with **Svelte 5, TypeScript, and Vite**. The interface uses reusable components for vehicle and location selection, then calls the backend API to create, confirm, or cancel alerts. Vitest covers the API clients and form logic.

The production build is a static site hosted on **Amazon S3 and CloudFront**. Terraform defines the hosting infrastructure, and GitHub Actions runs checks, builds the site, and deploys it.

## Run locally

Set `VITE_BACKEND_URL` in a `.env` file to the backend API URL, then run:

```bash
npm install
npm run dev
```
