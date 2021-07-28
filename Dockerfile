# https://www.koyeb.com/tutorials/how-to-dockerize-and-deploy-a-next-js-application-on-koyeb
# 빌드: docker build . -t dsi-v1
# 컨테이너 실행: docker run -d -p 3000:3000 dsi-v1
# 실행중인 컨테이너 진입: docker attach dsi-v1
# 컨테이너 종료: docker stop dsi-v1
# 컨테이너 삭제: docker rm 컨테이너_아이디
# 컨테이너 일시정지: docker pause dsi-v1
# 컨테이너 재시작: docker unpause dsi-v1
# 컨테이너 로그 확인: docker logs dsi-v1
# 컨테이너 확인: docker ps -a
# 이미지 삭제: docker rmi dsi-v1
# 이미지 목록: docker images

FROM node:lts as dependencies
WORKDIR /dsi
COPY package.json ./
RUN npm i

FROM node:lts as builder
WORKDIR /dsi
COPY . .
COPY --from=dependencies /dsi/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /dsi
ENV NODE_ENV production

# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /dsi/next.config.js ./
COPY --from=builder /dsi/public ./public
COPY --from=builder /dsi/.next ./.next
COPY --from=builder /dsi/node_modules ./node_modules
COPY --from=builder /dsi/package.json ./package.json

EXPOSE 3000
CMD ["npm", "run", "start"]