---
title: Thesis
---
# Microservices

read list: https://learn.microsoft.com/zh-cn/azure/architecture/microservices/
main topics

- loose-coupling,self-contained, independent microservices
- Containerization
- Communication: gRPC, Kafka
- DevOps
- Monitoring: Prometheus, Istio service mesh

# DevOps

read list: https://learn.microsoft.com/zh-cn/azure/architecture/guide/devops/devops-start-here

[ Content ] : 
1. What we are going to build. A backend system that serves a online mind-mapping creative website, with around 2k daily active users. The old backend system is written in a monolith repository in Golang. As time goes by, the code base is getting larger and larger. So we want to separate the monolith repository into different small microservices. For better scalability and observability in the future, we're considering migrate the server into a containerized environment, and see the outcome. 
2. Challenges. The databases and storage data are tightly coupled. Need more test to make sure the API behavior stays the same. 
3. Solutions. Containerization we use Docker, for communication between microservices we use HTTP. For service mesh we use Istio, for monitoring we use Prometheus and grafana.

[ Objectives ] : 
1. Migrating a Monolithic backend repository into a 6-services Microservice architecture system. 
2. Trace and monitor all the traffic between each microservices. Notify the developers when error happens. 
3. Integrating DevOps for all the backend and frontend code bases. 

[ Outcomes ] : 
1. 6 separated small microservices that can be deployed independently to a Kubernetes cluster, cloud native. 
2. Full DevOps pipeline for all the code, automatically pull, test and release.