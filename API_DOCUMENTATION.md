# Flex Living API Documentation

## Overview

The Flex Living API is a RESTful service built with NestJS that provides comprehensive review management capabilities. It handles review aggregation, approval workflows, and analytics for property management companies.

## Base Information

- **Base URL**: `http://localhost:4000/api` (Development)
- **API Version**: v1.0
- **Content Type**: `application/json`
- **Authentication**: Bearer Token (for protected endpoints)

## Authentication

### Bearer Token Authentication

For protected endpoints, include the authorization header:

```http
Authorization: Bearer <your-token>
```

### Token Management

Tokens are managed through Redis cache with automatic expiration and refresh mechanisms.

## Error Handling

The API uses standard HTTP status codes and returns consistent error responses:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/review"
}
```

### Common Status Codes

| Code | Description           |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 404  | Not Found             |
| 500  | Internal Server Error |

## Data Models

### Review Entity

```typescript
interface Review {
  id: number;
  type: string;
  status: string;
  rating: number | null;
  publicReview: string;
  reviewCategory: ReviewCategory[];
  submittedAt: Date;
  guestName: string;
  listingName: string;
  isApproved: boolean;
}
```

### Review Category

```typescript
interface ReviewCategory {
  id: number;
  category: string;
  rating: number;
  review: Review;
}
```

### Normalized Review

```typescript
interface NormalizedReview {
  listingName: string;
  type: string;
  source: string;
  date: string;
  totalReviews: number;
  avgRating: number;
  ratings: number[];
}
```

## API Endpoints

### Health Check

#### GET /

Check API health status.

**Response:**

```json
"backend is working"
```

---

### Reviews

#### GET /review

Retrieve all reviews from the database.

**Query Parameters:**

- `limit` (optional): Number of reviews to return (default: 100)
- `offset` (optional): Number of reviews to skip (default: 0)
- `approved` (optional): Filter by approval status (true/false)

**Response:**

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "type": "guest_review",
      "status": "published",
      "rating": 4.5,
      "publicReview": "Excellent stay! The apartment was clean and well-maintained.",
      "submittedAt": "2024-01-15T10:30:00.000Z",
      "guestName": "John Doe",
      "listingName": "Luxury Downtown Apartment",
      "isApproved": true,
      "reviewCategory": [
        {
          "id": 1,
          "category": "cleanliness",
          "rating": 5
        },
        {
          "id": 2,
          "category": "location",
          "rating": 4
        }
      ]
    }
  ]
}
```

#### GET /review/approved

Retrieve only approved reviews.

**Response:**

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "type": "guest_review",
      "status": "published",
      "rating": 4.5,
      "publicReview": "Excellent stay!",
      "submittedAt": "2024-01-15T10:30:00.000Z",
      "guestName": "John Doe",
      "listingName": "Luxury Downtown Apartment",
      "isApproved": true,
      "reviewCategory": []
    }
  ]
}
```

#### POST /review

Create a new review.

**Request Body:**

```json
{
  "type": "guest_review",
  "status": "published",
  "rating": 4.5,
  "publicReview": "Great experience!",
  "guestName": "Jane Smith",
  "listingName": "Cozy Studio",
  "reviewCategory": [
    {
      "category": "cleanliness",
      "rating": 5
    }
  ]
}
```

**Response:**

```json
{
  "statusCode": 201,
  "data": {
    "id": 2,
    "type": "guest_review",
    "status": "published",
    "rating": 4.5,
    "publicReview": "Great experience!",
    "submittedAt": "2024-01-15T11:00:00.000Z",
    "guestName": "Jane Smith",
    "listingName": "Cozy Studio",
    "isApproved": false,
    "reviewCategory": [
      {
        "id": 3,
        "category": "cleanliness",
        "rating": 5
      }
    ]
  }
}
```

#### PATCH /review/approve/:id

Approve a specific review.

**Path Parameters:**

- `id`: Review ID (number)

**Response:**

```json
{
  "statusCode": 200,
  "data": {
    "id": 1,
    "type": "guest_review",
    "status": "published",
    "rating": 4.5,
    "publicReview": "Excellent stay!",
    "submittedAt": "2024-01-15T10:30:00.000Z",
    "guestName": "John Doe",
    "listingName": "Luxury Downtown Apartment",
    "isApproved": true,
    "reviewCategory": []
  }
}
```

#### PATCH /review/disprove/:id

Disapprove a specific review.

**Path Parameters:**

- `id`: Review ID (number)

**Response:**

```json
{
  "statusCode": 200,
  "data": {
    "id": 1,
    "type": "guest_review",
    "status": "published",
    "rating": 4.5,
    "publicReview": "Excellent stay!",
    "submittedAt": "2024-01-15T10:30:00.000Z",
    "guestName": "John Doe",
    "listingName": "Luxury Downtown Apartment",
    "isApproved": false,
    "reviewCategory": []
  }
}
```

#### POST /review/sync-hostaway

Synchronize reviews from Hostaway API.

**Authentication:** Required

**Response:**

```json
{
  "statusCode": 200,
  "message": "Sync completed successfully",
  "data": {
    "syncedCount": 15,
    "skippedCount": 3,
    "totalProcessed": 18
  }
}
```

#### POST /review/sync-google-review

Synchronize reviews from Google Reviews API.

**Authentication:** Required

**Response:**

```json
{
  "statusCode": 200,
  "message": "Google Reviews sync completed successfully",
  "data": {
    "syncedCount": 8,
    "skippedCount": 1,
    "totalProcessed": 9
  }
}
```

## Data Validation

### Review Creation Validation

When creating a review, the following validation rules apply:

```typescript
class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  status?: string = "published";

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsString()
  @IsOptional()
  publicReview?: string;

  @IsString()
  @IsNotEmpty()
  guestName: string;

  @IsString()
  @IsNotEmpty()
  listingName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateReviewCategoryDto)
  @IsOptional()
  reviewCategory?: CreateReviewCategoryDto[];
}
```

### Review Category Validation

```typescript
class CreateReviewCategoryDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **General Endpoints**: 100 requests per minute per IP
- **Sync Endpoints**: 10 requests per minute per IP
- **Bulk Operations**: 5 requests per minute per IP

Rate limit headers are included in responses:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248000
```

## Caching Strategy

### Redis Caching

The API uses Redis for caching:

1. **API Tokens**: Cached with expiration
2. **Frequently Accessed Data**: 5-minute TTL
3. **User Sessions**: 30-minute TTL

### Cache Invalidation

Cache is automatically invalidated when:

- Reviews are created, updated, or deleted
- Approval status changes
- Sync operations complete

## Webhooks

### Review Webhook Events

The API can send webhooks for the following events:

- `review.created`
- `review.approved`
- `review.disapproved`
- `review.synced`

### Webhook Payload

```json
{
  "event": "review.approved",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "data": {
    "reviewId": 1,
    "listingName": "Luxury Downtown Apartment",
    "rating": 4.5,
    "isApproved": true
  }
}
```

## SDK Examples

### JavaScript/TypeScript

```typescript
class FlexLivingAPI {
  private baseURL: string;
  private apiKey: string;

  constructor(baseURL: string, apiKey: string) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  async getReviews(): Promise<Review[]> {
    const response = await fetch(`${this.baseURL}/review`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  async approveReview(id: number): Promise<Review> {
    const response = await fetch(`${this.baseURL}/review/approve/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
}
```

### Python

```python
import requests
from typing import List, Dict, Any

class FlexLivingAPI:
    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url
        self.headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }

    def get_reviews(self) -> List[Dict[str, Any]]:
        response = requests.get(f'{self.base_url}/review', headers=self.headers)
        response.raise_for_status()
        return response.json()['data']

    def approve_review(self, review_id: int) -> Dict[str, Any]:
        response = requests.patch(
            f'{self.base_url}/review/approve/{review_id}',
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()['data']
```

## Testing

### Postman Collection

A Postman collection is available for testing the API:

1. Import the collection from `/docs/postman-collection.json`
2. Set the `base_url` variable to your API endpoint
3. Set the `api_key` variable to your authentication token

### cURL Examples

#### Get All Reviews

```bash
curl -X GET "http://localhost:4000/api/review" \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json"
```

#### Approve Review

```bash
curl -X PATCH "http://localhost:4000/api/review/approve/1" \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json"
```

#### Sync Hostaway Reviews

```bash
curl -X POST "http://localhost:4000/api/review/sync-hostaway" \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json"
```

## Changelog

### Version 1.0.0 (2024-01-15)

- Initial API release
- Review CRUD operations
- Approval workflow
- External API synchronization
- Redis caching implementation
- Swagger documentation

## Support

For API support and questions:

- **Email**: abenezergoo@gmail.com
- **Documentation**: [Swagger UI](http://localhost:4000/docs)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)

---

_This documentation is automatically generated and updated with each API release._
