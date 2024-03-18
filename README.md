

# Background 
    Multi-container project with nginx reverse-proxy server routing requests to serever (api) module and client module. 
    Automated testing and deployment with Travis CI.
    As a multicontiner project, Travis needs to push all images to Docker hub using personal login credentials
    saved in Travis CI enviornment variables
    The dockerrun.aws.json file will go to AWS ECS since Beanstalk cannot natively read docker-compose files.
    In dockerrun.aws.json, the hostname is the same as the services name in the docker-compose, since the service
    is essentially making a url of the container name.
    We can also see this in our nginx default.conf when we route requests to the container/hostname/domain/url name
    * at least one service has to be essential in dockerrun.aws.json
    * also nginx has no hostname because no other container service directly reaches it. Same with worker

    However, now with new Amazon linux machines we do not need the dockerrun.aws.json files. 
    Just a docker compose. 
    
     