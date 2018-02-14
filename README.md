# familiar-yeoman

> :warning: **Node.js** `>=7.10.1` is required

## Docker
```sh
docker run -d -v `pwd`/config.json:/tmp/config.json maxleiko/famster /tmp/config.json
```
With `config.json` containing the preset answers that you want to give:
```json
{
  "applicationType": "monolith",
  "serverPort": "8080",
  "authenticationType": "jwt",
  "hibernateCache": "ehcache",
  "clusteredHttpSession": false,
  "websocket": false,
  "databaseType": "sql",
  "devDatabaseType": "h2Disk",
  "prodDatabaseType": "mysql",
  "searchEngine": false,
  "messageBroker": false,
  "serviceDiscoveryType": false,
  "buildTool": "maven",
  "enableSocialSignIn": false,
  "enableSwaggerCodegen": false,
  "clientFramework": "angularX",
  "useSass": false,
  "clientPackageManager": "yarn",
  "applicationType": "monolith",
  "testFrameworks": [
    "gatling",
    "cucumber",
    "protractor"
  ]
}
```
The above is just an example of a possible set of answers for each questions of your generator.

## Results
Once every 1000 configs created the program will write the results in `configs.csv` in the current directory.

## Results in Docker
For Docker you can retrieve the results by doing:
```sh
docker cp your_container_id:/configs.csv results.csv
```
So you'll be able to see `results.csv` on your host machine in the current directory.