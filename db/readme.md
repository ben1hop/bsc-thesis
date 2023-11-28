# Setup steps

## Win

### 1) Install docker destkop - this adds docker cmd aswell

- Issue: Might need to run wsl --update from command line
- This docker client must be opened throughout the containers usage

### 2) Give this command : `docker pull mysql`

### 3) Give out this command from this folder: `docker-compose up`

## Mac

Docker daemon is required , I cannot use docker desktop since licensing issues. Using rancher desktop for substitute.

Few modification is required. Planning to runtime parametarize these based on host OS.

- Server/connection.ts ->  host: '127.0.0.1',

## Linux

### The `compose` file contains all the db related settings. The container loads a volume which consist sql init scritps. This way we can achive a persistent state throughout any installation. These init scripts can easily be version controlled and must be in numerical order (starting with schema) to gurantee execution order.

# Extras

Usefull docker cli commands:

`docker volume ls` - lisitng active volumes

`docker inspect bsc-dev-db-1` - inspecting the bsc-dev-db-1 named container ( this container )

`docker ps -a` - list active containers

### docker-compose.yml info:

- DB password: `MYSQL_ROOT_PASSWORD:`
- Access Port: `ports:`

### Every script placed under mock/data will be loaded and run on creating the container

### Every script placed under mock/runtime-scripts are placed in a same named folder at the root of the container

- Runtime scripts can be run as: `mysql -u root -p "bsc-dev-db" < runtime-scripts/helper-tables.sql`
- Any change under this folder will be hot loaded into the container , no need to restart or anything

### Openning terminal for a running container: `docker exec -it bsc-dev-db-1 bash -l`

-
