FROM nginx

#specify file to overwrite existing conf file in filesystem
COPY ./default.conf  /etc/nginx/conf.d/default.conf 
COPY ./10-types-hash.conf  /etc/nginx/conf.d
 
#it'll start on its own, this is it

# as a separate production dockerfile
# we could move the websocket block in the nginx default.conf
# since it is only there for react app webpack to listen to code changes
# and would not need that in production

#however, we will leave it because it is not a big deal
