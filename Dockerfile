FROM nginx:1.15.2-alpine

COPY dockers/nginx/ssl /etc/ssl/2dance
COPY build /usr/share/nginx/html
COPY dockers/nginx/crix-ui.conf.tmpl /tmp/

CMD /bin/sh -c "envsubst < /tmp/crix-ui.conf.tmpl > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"
