FROM eclipse-temurin:17-jdk-alpine
ARG JAR_FILE=projekt.jar
COPY ${JAR_FILE} app.jar
CMD echo "czekam 20 sekund"
CMD sleep 20 && java -jar /app.jar
EXPOSE 8080