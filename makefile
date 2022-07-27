CURRENT_DIR=$(shell pwd)

APP=$(shell basename ${CURRENT_DIR})

WHALE = "+"

# run-test:
# 	@echo "Start unit tests"
# 	yarn run test
# 	@echo "End unit tests"

build:
	docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .

