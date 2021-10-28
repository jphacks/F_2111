.PHONY: up
up:
	docker-compose -f docker-compose.local.yml up -d --build

.PHONY: down
down:
	docker-compose -f docker-compose.local.yml down

.PHONY: logs
logs:
	docker-compose -f docker-compose.local.yml logs  ${T}

.PHONY: deploy
deploy: prod_down prod_update prod_up

.PHONY: prod_update
prod_update:
	git pull origin main

.PHONY: prod_up
prod_up:
	docker-compose -f docker-compose.prod.yml up -d --build

.PHONY: prod_down
prod_down:
	docker-compose -f docker-compose.prod.yml down


# マイグレーションサービス
FLYWAY_CONF = -url=jdbc:mysql://$${DB_HOST}:3306/$${MYSQL_DATABASE} -user=$${MYSQL_USER} -password=user-pass
MIGRATION_SERVICE := migration
ENV_FILE := ./.env
DOCKER_COMPOSE_FILE := docker-compose.local.yml
.PHONY: flyway/info
flyway/info:
	. $(ENV_FILE) && docker-compose -f $(DOCKER_COMPOSE_FILE) run --rm $(MIGRATION_SERVICE) $(FLYWAY_CONF) info

.PHONY: flyway/validate
flyway/validate:
	. $(ENV_FILE) && docker-compose -f $(DOCKER_COMPOSE_FILE) run --rm $(MIGRATION_SERVICE) $(FLYWAY_CONF) validate

.PHONY: flyway/migrate
flyway/migrate:
	. $(ENV_FILE) && docker-compose -f $(DOCKER_COMPOSE_FILE) run --rm $(MIGRATION_SERVICE) $(FLYWAY_CONF) migrate

.PHONY: flyway/repair
flyway/repair:
	. $(ENV_FILE) && docker-compose -f $(DOCKER_COMPOSE_FILE) run --rm $(MIGRATION_SERVICE) $(FLYWAY_CONF) repair

.PHONY: flyway/baseline
flyway/baseline:
	. $(ENV_FILE) && docker-compose -f $(DOCKER_COMPOSE_FILE) run --rm $(MIGRATION_SERVICE) $(FLYWAY_CONF) baseline
