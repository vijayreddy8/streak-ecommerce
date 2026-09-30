# STREAK — E-commerce Marketplace

**WEAR YOUR STORY**

STREAK is a marketplace-style e-commerce portfolio project built to demonstrate a complete modern storefront experience—from product discovery and authentication to cart, checkout, and order confirmation.

> Built as a portfolio project for **TorStaq**.

## 🚀 Live Demo

**Website:** https://streak-ecommerce.vercel.app/

**GitHub:** https://github.com/vijayreddy8/streak-ecommerce

## ✨ Features

- Marketplace-style homepage and navigation
- 30-product catalog across:
  - Men
  - Women
  - Footwear
  - Electronics
  - Accessories
  - Home & Living
  - Beauty
  - Sports
- Product search and category filtering
- Product detail pages
- Product pricing, discounts, ratings, review counts and stock information
- Sizes and colors where applicable
- Add to Bag
- Buy Now
- Cart quantity controls
- Wishlist
- Register / Login
- Logged-in account name in the header
- Checkout flow
- UPI, Card and Cash on Delivery demo options
- Order confirmation
- Browser persistence using localStorage
- Express backend APIs
- JSON-based order storage for the demo
- Help & Support and Track Order placeholder flows

## 🛠️ Tech Stack

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Node.js
- Express.js

**Deployment**
- Vercel

**Development / DevOps**
- Git
- GitHub
- Docker
- GitHub Actions
- AWS / cloud deployment concepts used across the portfolio workflow

## 🏗️ Project Structure

```text
streak-ecommerce/
├── index.html
├── styles.css
├── app.js
├── admin.html
├── server.js
├── package.json
├── README.md
├── public/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── products.json
└── api/
    └── index.js
```

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/vijayreddy8/streak-ecommerce.git
cd streak-ecommerce
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the application

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## 🛒 Demo Checkout

The checkout UI supports:

- UPI
- Card
- Cash on Delivery

**Important:** this is a portfolio/demo payment flow. No real payment is processed and no real payment credentials should be entered.

## 📊 Demo Data

The catalog contains 30 demonstration products.

Product ratings and review counts are **demo storefront data**, not verified customer reviews.

The project also uses browser localStorage for cart, wishlist and user-state persistence.

## ☁️ Deployment Notes

The project is configured to run as a portfolio deployment on Vercel.

For a production e-commerce application, persistent database storage, secure authentication, real payment-gateway integration, server-side validation, monitoring, logging and production-grade security controls should be added.

## 🎯 Portfolio Objective

STREAK was built to demonstrate practical skills in:

- Frontend development
- Backend/API integration
- E-commerce application flows
- Git/GitHub workflow
- Deployment
- DevOps-oriented project delivery

## 👨‍💻 Built for TorStaq

**TorStaq — Digital solutions for modern businesses.**

Website: https://torstaq-website.vercel.app/

---

**WEAR YOUR STORY.**


## ☁️ Cloud Deployment — AWS EKS

STREAK now includes a production-oriented container and Kubernetes deployment setup for AWS.

### Architecture

```text
GitHub
   │
   ▼
GitHub Actions
   │
   ├── Build Docker image
   │
   ▼
Amazon ECR
   │
   ▼
Amazon EKS
   │
   ├── Deployment (2+ replicas)
   ├── Readiness / Liveness probes
   ├── Horizontal Pod Autoscaler
   └── LoadBalancer Service
           │
           ▼
      STREAK application
```

### Deployment files

- `Dockerfile` — production Node.js container
- `.dockerignore` — excludes unnecessary files from the image
- `k8s/namespace.yaml` — dedicated Kubernetes namespace
- `k8s/deployment.yaml` — application deployment, probes, resources and HPA
- `k8s/service.yaml` — AWS LoadBalancer service
- `.github/workflows/deploy-eks.yml` — GitHub Actions build → ECR → EKS workflow

### Local Docker test

```bash
docker build -t streak-ecommerce .
docker run --rm -p 3000:3000 streak-ecommerce
```

Open `http://localhost:3000`.

### AWS prerequisites

The deployment workflow expects:

1. An Amazon ECR repository named `streak-ecommerce`.
2. An existing Amazon EKS cluster and worker capacity.
3. A GitHub Actions OIDC IAM role that can authenticate to AWS and perform the required ECR/EKS deployment operations.
4. Repository variable `AWS_REGION`.
5. Repository variable `EKS_CLUSTER_NAME`.
6. Repository secret `AWS_ROLE_ARN`.

The workflow uses the GitHub commit SHA as the Docker image tag, so each deployment is traceable to a source revision.

### Kubernetes deployment

For an existing EKS cluster, the manifests can also be applied manually:

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml -n streak
kubectl apply -f k8s/service.yaml -n streak
kubectl get pods -n streak
kubectl get service -n streak
```

Before manual deployment, replace `ECR_IMAGE_PLACEHOLDER` in the deployment manifest with the full Amazon ECR image URI.

> **Note:** The repository contains the complete deployment configuration, but AWS infrastructure provisioning and GitHub repository secrets/variables must be configured in the AWS/GitHub accounts before the workflow can perform a real cloud deployment. No credentials are stored in this repository.
