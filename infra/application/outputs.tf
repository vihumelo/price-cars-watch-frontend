output "site_bucket_name" {
  description = "Name of the S3 bucket that stores the frontend files."
  value       = aws_s3_bucket.site.bucket
}

output "site_bucket_arn" {
  description = "ARN of the S3 bucket that stores the frontend files."
  value       = aws_s3_bucket.site.arn
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution serving the frontend."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "Default domain name of the CloudFront distribution."
  value       = aws_cloudfront_distribution.site.domain_name
}
