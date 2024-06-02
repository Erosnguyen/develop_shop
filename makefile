#Build local
build:
	@docker-compose build 
#Up docker-compose
up:
	@docker-compose up -d
#Down docker-compose
down:
	@docker-compose down