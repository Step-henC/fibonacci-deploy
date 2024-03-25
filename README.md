# How To Run

Project built with docker and kubernetes. Assuming Docker Desktop with Kubernetes enabled in distro (Ubuntu for Windows)

Go to root directory of this root project and type the following in the CLI
    kubectl apply -f k8s

This will apply config for entire k8s directory.

# Background 

Below is an overview of our kubernetes cluster set up. Courtesy of Stephen Grider udemy course. Networking provided by ingress-service with controller routing requests to pod replicas. Ingress-nginx bypass clusterIP service to access deployments directly in the event of sticky sessions. CI/CD with Travis CI and deployed to GCP. 
     ![Screenshot (38)](https://github.com/Step-henC/fibonacci-deploy/assets/98792412/e4f5ddc4-f9c2-423b-a918-900b458212e7)
