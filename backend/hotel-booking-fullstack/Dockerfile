# Use an official Maven image to build the Spring Boot app
FROM maven:3.9.9-amazoncorretto-23 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml and install dependencies
COPY pom.xml .

# Copy source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Start with Amazon Correto JDK 23
FROM amazoncorretto:23-jdk

# Set working folder to App and copy compiled file from above step
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]