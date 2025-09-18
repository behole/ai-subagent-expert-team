#!/bin/bash

# AI SubAgent Expert Team - Production Deployment Script
# This script handles the complete deployment process

set -e  # Exit on any error

echo "🚀 Starting AI SubAgent Expert Team deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DEPLOYMENT_ENV=${1:-production}
DOCKER_IMAGE_NAME="ai-subagent-expert-team"
DOCKER_TAG=${2:-latest}

echo -e "${BLUE}Deployment Environment: ${DEPLOYMENT_ENV}${NC}"
echo -e "${BLUE}Docker Tag: ${DOCKER_TAG}${NC}"

# Function to print status
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if required files exist
check_requirements() {
    echo "📋 Checking deployment requirements..."

    if [ ! -f "Dockerfile" ]; then
        print_error "Dockerfile not found"
        exit 1
    fi

    if [ ! -f "docker-compose.yml" ]; then
        print_error "docker-compose.yml not found"
        exit 1
    fi

    if [ ! -f ".env.${DEPLOYMENT_ENV}" ]; then
        print_warning ".env.${DEPLOYMENT_ENV} not found. Using .env.example as template."
        if [ -f ".env.example" ]; then
            cp ".env.example" ".env.${DEPLOYMENT_ENV}"
            print_warning "Please edit .env.${DEPLOYMENT_ENV} with your production values before continuing."
            read -p "Press enter to continue after editing .env.${DEPLOYMENT_ENV}..."
        else
            print_error ".env.example not found. Cannot create environment file."
            exit 1
        fi
    fi

    print_status "Requirements check completed"
}

# Build and test the application
build_and_test() {
    echo "🔨 Building and testing application..."

    # Install dependencies
    npm ci
    print_status "Dependencies installed"

    # Run linting
    npm run lint
    print_status "Linting passed"

    # Build TypeScript
    npm run build:prod
    print_status "TypeScript build completed"

    # Run tests
    if [ -f "jest.config.js" ]; then
        npm run test:prod
        print_status "Tests passed"
    else
        print_warning "No tests found, skipping test phase"
    fi
}

# Build Docker image
build_docker_image() {
    echo "🐳 Building Docker image..."

    docker build -t "${DOCKER_IMAGE_NAME}:${DOCKER_TAG}" .
    print_status "Docker image built: ${DOCKER_IMAGE_NAME}:${DOCKER_TAG}"

    # Tag as latest if this is a production deployment
    if [ "${DEPLOYMENT_ENV}" = "production" ]; then
        docker tag "${DOCKER_IMAGE_NAME}:${DOCKER_TAG}" "${DOCKER_IMAGE_NAME}:latest"
        print_status "Tagged as latest"
    fi
}

# Deploy with Docker Compose
deploy_with_compose() {
    echo "🚢 Deploying with Docker Compose..."

    # Set environment file
    export COMPOSE_FILE="docker-compose.yml"
    export ENV_FILE=".env.${DEPLOYMENT_ENV}"

    # Stop existing containers
    docker-compose down --remove-orphans
    print_status "Stopped existing containers"

    # Start new deployment
    docker-compose --env-file "${ENV_FILE}" up -d
    print_status "Started new containers"

    # Wait for health check
    echo "⏳ Waiting for application to become healthy..."
    sleep 10

    # Check health
    MAX_RETRIES=30
    RETRY_COUNT=0

    while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
        if curl -f http://localhost:${PORT:-3000}/health > /dev/null 2>&1; then
            print_status "Application is healthy!"
            break
        fi

        RETRY_COUNT=$((RETRY_COUNT + 1))
        echo "Waiting for health check... (${RETRY_COUNT}/${MAX_RETRIES})"
        sleep 2
    done

    if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
        print_error "Health check failed after ${MAX_RETRIES} attempts"
        docker-compose logs ai-subagent-expert-team
        exit 1
    fi
}

# Run deployment tests
run_deployment_tests() {
    echo "🧪 Running deployment tests..."

    PORT=${PORT:-3000}
    BASE_URL="http://localhost:${PORT}"

    # Test health endpoint
    if curl -f "${BASE_URL}/health" > /dev/null 2>&1; then
        print_status "Health endpoint working"
    else
        print_error "Health endpoint failed"
        exit 1
    fi

    # Test API info endpoint
    if curl -f "${BASE_URL}/api/info" > /dev/null 2>&1; then
        print_status "API info endpoint working"
    else
        print_error "API info endpoint failed"
        exit 1
    fi

    # Test experts endpoint
    if curl -f "${BASE_URL}/api/experts" > /dev/null 2>&1; then
        print_status "Experts endpoint working"
    else
        print_error "Experts endpoint failed"
        exit 1
    fi

    print_status "All deployment tests passed"
}

# Show deployment summary
show_summary() {
    echo ""
    echo "🎉 Deployment completed successfully!"
    echo ""
    echo "📊 Deployment Summary:"
    echo "  Environment: ${DEPLOYMENT_ENV}"
    echo "  Docker Image: ${DOCKER_IMAGE_NAME}:${DOCKER_TAG}"
    echo "  Port: ${PORT:-3000}"
    echo ""
    echo "🔗 Available Endpoints:"
    echo "  Health Check: http://localhost:${PORT:-3000}/health"
    echo "  API Info: http://localhost:${PORT:-3000}/api/info"
    echo "  API Docs: http://localhost:${PORT:-3000}/api/docs"
    echo ""
    echo "📋 Management Commands:"
    echo "  View logs: docker-compose logs -f"
    echo "  Stop deployment: docker-compose down"
    echo "  Restart: docker-compose restart"
    echo ""
    print_status "AI SubAgent Expert Team is now running in ${DEPLOYMENT_ENV} mode!"
}

# Cleanup function for failed deployments
cleanup_on_failure() {
    print_error "Deployment failed. Cleaning up..."
    docker-compose down --remove-orphans
    exit 1
}

# Set trap for cleanup on failure
trap cleanup_on_failure ERR

# Main deployment flow
main() {
    check_requirements
    build_and_test
    build_docker_image
    deploy_with_compose
    run_deployment_tests
    show_summary
}

# Run main function
main

echo "🏁 Deployment script completed successfully!"