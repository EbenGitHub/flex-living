docker build -t accentut/flex-backend:latest --target runner_backend --build-arg APP_NAME=backend .
docker push accentut/flex-backend:latest

docker build -t accentut/flex-frontend:latest --target runner_frontend --build-arg APP_NAME=frontend .
docker push accentut/flex-frontend:latest

