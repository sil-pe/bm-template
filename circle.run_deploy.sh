#!/usr/bin/env bash
set -xe
## Extract required key from JSON output.
jsonval() {
    json=${1}
    prop=${2}
    temp=`echo $json | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w $prop | cut -d":" -f2| sed -e 's/^ *//g' -e 's/ *$//g'`
    echo ${temp##*|}
}
## Deploys to S3 and gets invalidation ID to wait for it.
deploy_s3() {
  aws s3 sync ${CIRCLE_ARTIFACTS}/${1}/ ${2} --delete --region eu-central-1 > /dev/null
  JSON=`aws cloudfront create-invalidation --distribution-id ${3} --paths '/*'`
  INVALIDATION_ID=`jsonval "${JSON}" "Id"`
  echo ${INVALIDATION_ID}
}

## Required by AWS to enable CLI commands for cloudfront
aws configure set preview.cloudfront true

## Deploys Styleguide
STYLEGUIDE_INVALIDATION_ID=`deploy_s3 styleguide ${AWS_S3_BUCKET_STYLEGUIDE} ${AWS_DISTRIBUTION_ID_STYLEGUIDE}`
## Deploys Gremlins
GREMLINS_INVALIDATION_ID=`deploy_s3 gremlins ${AWS_S3_BUCKET_GREMLINS} ${AWS_DISTRIBUTION_ID_GREMLINS}`
## Waits for invalidation to complete for Styleguide
aws cloudfront wait invalidation-completed --distribution-id ${AWS_DISTRIBUTION_ID_STYLEGUIDE}  --id ${STYLEGUIDE_INVALIDATION_ID}
## Waits for invalidation to complete for Gremlins
aws cloudfront wait invalidation-completed --distribution-id ${AWS_DISTRIBUTION_ID_GREMLINS}  --id ${GREMLINS_INVALIDATION_ID}
