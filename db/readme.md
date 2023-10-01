# Setup steps

## Win
### 1) Install docker destkop - this adds docker cmd aswell
- Issue: Might need to run wsl --update from command line
- This docker client must be opened throughout the containers usage

### 2) Give this command : `docker pull mysql`


### 3) Give out this command from this folder: `docker-compose up`

## Mac
## Linux


### The `compose` file contains all the db related settings. The container loads a volume which consist sql init scritps. This way we can achive a persistent state throughout any installation. These init scripts can easily be version controlled and must be in numerical order (starting with schema) to gurantee execution order.

# Extras


### docker-compose.yml info:
- DB password: `MYSQL_ROOT_PASSWORD:`
- Access Port: `ports:`
