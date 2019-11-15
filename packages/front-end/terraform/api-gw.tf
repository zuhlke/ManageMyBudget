resource "aws_api_gateway_rest_api" "scrapbookApi" {
  name = "Scrapbook-API"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_resource" "baseline" {
  rest_api_id = "${aws_api_gateway_rest_api.scrapbookApi.id}"
  parent_id = "${aws_api_gateway_rest_api.scrapbookApi.root_resource_id}"
  path_part = "baseline"

  depends_on = ["aws_api_gateway_rest_api.scrapbookApi"]
}

#GET method definitions for the /baseline URI
resource "aws_api_gateway_method" "baselineGet" {
  http_method = "GET"
  rest_api_id = "${aws_api_gateway_rest_api.scrapbookApi.id}"
  resource_id = "${aws_api_gateway_resource.baseline.id}"
  authorization = "NONE"

  depends_on = ["aws_api_gateway_resource.baseline"]
}

resource "aws_api_gateway_method_response" "baselineGetResponse" {
  rest_api_id = "${aws_api_gateway_rest_api.scrapbookApi.id}"
  resource_id = "${aws_api_gateway_resource.baseline.id}"
  http_method = "${aws_api_gateway_method.baselineGet.http_method}"
  status_code = "200"
  response_models = {
      "application/json" = "Empty"
  }
  response_parameters = {
      "method.response.header.Access-Control-Allow-Origin" = "true"
  }

  depends_on = ["aws_api_gateway_method.baselineGet"]
}

resource "aws_api_gateway_integration" "lambdaIntegration" {
  rest_api_id = "${aws_api_gateway_rest_api.scrapbookApi.id}"
  resource_id = "${aws_api_gateway_resource.baseline.id}"
  http_method = "${aws_api_gateway_method.baselineGet.http_method}"
  integration_http_method = "GET"
  type = "AWS_PROXY"
  uri = "${aws_lambda_function.lambda.invoke_arn}"

  depends_on = ["aws_api_gateway_method.baselineGet", "aws_lambda_function.lambda"]
}

resource "aws_api_gateway_integration_response" "getLambdaIntegrationResponse" {
  rest_api_id = "${aws_api_gateway_rest_api.scrapbookApi.id}"
  resource_id = "${aws_api_gateway_resource.baseline.id}"
  http_method = "${aws_api_gateway_method.baselineGet.http_method}"
  status_code = "${aws_api_gateway_method_response.baselineGetResponse.status_code}"

  depends_on = ["aws_api_gateway_integration.lambdaIntegration"]
}

# Lambda
resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.lambda.function_name}"
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.scrapbookApi.execution_arn}/*/${aws_api_gateway_method.baselineGet.http_method}${aws_api_gateway_resource.baseline.path}"
}

resource "aws_api_gateway_deployment" "devDeployment" {
  depends_on = ["aws_api_gateway_integration.lambdaIntegration"]
  rest_api_id = "${aws_api_gateway_rest_api.scrapbookApi.id}"
  stage_name = "development"

  variables = {}
}

#CORS setup
module "apigateway-cors" {
  source  = "bridgecrewio/apigateway-cors/aws"
  version = "1.2.0"
  api = "${aws_api_gateway_rest_api.scrapbookApi.id}"
  resources = ["${aws_api_gateway_resource.baseline.id}"]
  methods = ["GET", "POST", "OPTIONS"]

  enable = "true"
  headers = [ "Content-Type", "X-Amz-Date", "Authorization", "X-Api-Key", "X-Amz-Security-Token" ]
  origin = "*"
}

