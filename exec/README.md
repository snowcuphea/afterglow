# Afterglow(여운) Back-end 구동방법

### Server

```bash
# /backend
gradle build
java -jar build/libs/backend-0.0.1-SNAPSHOT.war
```

```bash
# /backend/src/main/resources/application.yml
kakao_rest_api_key: <kakao_rest_api_key>
kakao_secret: <kakao_secret_key>(optional)
server:
    port: 8080
    servlet:
        context-path: /
spring:
    datasource:
        driver-class-name: com.mysql.cj.jdbc.Driver
        password: <DB password>
        url: <DB url>
        username: <DB username>
    jpa:
        hibernate:
            ddl-auto: update
        properties:
            hibername:
                dialect: org.hibernate.dialect.MariaDBDialect
            hibernate:
                default_batch_fetch_size: 1000
                format_sql: true
                use_sql_comments: true
    servlet:
        multipart:
            max-file-size: 10MB
            max-request-size: 10MB

```
