dev-dockerfile = -f docker-compose.yml -f docker-compose.dev.yml


build:
	docker-compose $(dev-dockerfile) build

dev:
	docker-compose $(dev-dockerfile) up --remove-orphans

backend-sh:
	docker-compose $(dev-dockerfile) run --rm backend bash

db-sh:
	docker-compose $(dev-dockerfile) run --rm postgre bash