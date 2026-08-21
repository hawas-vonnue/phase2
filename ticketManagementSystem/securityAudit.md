## Validation risk

- Parameter type is not checked
    - Added a check to ensure parameter (id) is number
- HTTP Parameter pollution
    - Added hpp module to solve this - it only takes last parameter(added sanitizedQuery because query in express 5 is read only)

## Secure headers

    - Use helmets library it sets 13 HTTP headers

## Rate limiting

    - use rate limiter library to setup rate limit for endpoints

## Size limiting

    - json is the body data type so inside express.json set limit

## CORS

    - added cors
