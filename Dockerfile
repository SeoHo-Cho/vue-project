FROM nginx:mainline-alpine-otel
ADD nginx.conf /etc/nginx/nginx.conf
ADD dist /usr/share/nginx/html
ENV LANG=ko_KR.UTF-8
ENV LANGUAGE=ko_KR;ko;en_US;en
ENV TZ=Asia/Seoul
