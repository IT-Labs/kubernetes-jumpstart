# Kubernetes-JumpStart

Welcome to the Kubernetes JumpStart Workshop.

 The goal of this workshop is to get you started with Kubernetes - a container-orchestration platform. 
 
 It will be provided a developer-focused look at Kubernetes concepts and it's role and impact in the development workflow. 
 
 Prerequisite is knowledge of containers. 

# Agenda

## 1. Kubernetes Overview and Core Concepts
## 2. Run Kubernetes Locally

2.1. If you don't have Docker installed (Optional)

**Windows and Mac**: Install the Docker Desktop app:
https://docs.docker.com/get-docker/

**Linux**: Install the Docker engine:
https://docs.docker.com/engine/install/ubuntu/

2.2. Setup Kuberneter cluster locally

**Windows and Mac**: Enable Kubernetes in Docker Desktop settings

**Linux**: Download Minikube and Install from:
https://minikube.sigs.k8s.io/docs/start/

Start Minukube
``` 
minikube start --driver=docker
```

2.3. Check Kubernetes version and cluster info

``` 
kubectl version 
```
``` 
kubectl cluster-info 
```
2.4. Create alias for the kubectl command (Optional)

**Windows**: Powershell
``` 
Set-Alias -Name k -Value kubectl 
```

**Linux and Mac**
``` 
Alias k="kubectl"
```

## 3. Pods

3.1. Run Pod using an Image
``` 
kubectl run nginx-pod --image=nginx:alpine
```

3.2. Get the Pods
```
kubectl get pods
```

3.3. Port-forward the Pod and acccess it through browser
```
kubectl port-forward nginx-pod 8080:80
```

3.4. Delete the Pod
```
kubectl delete pod nginx-pod
```

3.5. Create Pod from file
```
kubectl apply -f Pods/nginx-pod.yaml
```

3.6. Get the Pods
```
kubectl get pods
```

3.7. Check out Pod's metadata
```
kubectl describe pod nginx-app
```

3.8. Exec into the Container within the Pod (useful for troubleshooting)
```
kubectl exec nginx-app -it sh
```

3.9. Delete the Pod
```
kubectl delete pod nginx-app
```

3.10. Create Pod with resources defined from file
```
kubectl apply -f Pods/nginx-pod-resources.yaml
```

3.11. Delete the Pod
```
kubectl delete pod nginx-app
```

3.12. Create Pod with probes defined from file
```
kubectl apply -f Pods/nginx-pod-probes.yaml
```

3.13. Check Pod logs (useful for troubleshooting)
```
kubectl logs nginx-app
```

3.14. Delete the Pod
```
kubectl delete pod nginx-app
```

## 4. Deployments

4.1. Create Deployment through file
```
kubectl apply -f Deployments/nginx-deployment.yaml
```

4.2. Get Deployments
```
kubectl get deployments
kubectl get deployments --show-labels
kubectl get deployments -l app=nginx-app
```

4.3. Scale Deployment
```
kubectl scale -f Deployments/nginx-deployment.yaml --replicas=3
```

4.4. Describe Deployments
```
kubectl describe deployment nginx-app
```

4.5. Delete Deployment (Optional, the Pods are needed for the next section)
```
kubectl delete deployment nginx-app
```

## 5. Services

5.1. Create ClusterIP Service through file
```
kubectl apply -f Services/clusterIP-service.yaml 
```

5.2. Get Services
```
kubectl get services
```

5.3. Test Service and Pod with curl
```
kubectl exec [pod-name] -it sh
apk add curl
curl -s http://nginx-clusterip-service:8080
exit
```

5.4. Create NodePort Service through file
```
kubectl apply -f Services/nodeport-service.yaml 
```

5.5. Get Services
```
kubectl get services
```

5.6. Create LoadBalancer Service through file
```
kubectl apply -f Services/loadbalancer-service.yaml 
```

5.7. Delete Services
```
kubectl delete service nginx-clusterip-service
kubectl delete service nginx-nodeport-service
kubectl delete service nginx-loadbalancer-service
```

## 6. Rollout/Rollback with Zero-Downtime deployments

6.1. Build the images defined in the Deployments/Rollout folder
```
cd Deployments/Rollout
docker compose build
docker images
cd..
cd..
```

6.2. Create LoadBalancer service for accessing the app from localhost
```
kubectl apply -f Deployments/Rollout/node-app/node-app-service.yaml
```

6.3. Create Deployment for node-app v1 through file
```
kubectl apply -f Deployments/Rollout/node-app/node-app-v1.deployment.yaml
```

6.4. Checkout browser on http://localhost:8080

6.5. Rollout Deployment to node-app v2 through file
```
kubectl apply -f Deployments/Rollout/node-app/node-app-v2.deployment.yaml
```

6.6. Checkout browser on http://localhost:8080

6.7. Rollout Deployment to node-app v3 through file
```
kubectl apply -f Deployments/Rollout/node-app/node-app-v3.deployment.yaml
```

6.8. Checkout browser on http://localhost:8080

6.9. Rollback Deployment to node-app v1 through file
```
kubectl apply -f Deployments/Rollout/node-app/node-app-v1.deployment.yaml
```

6.10. Checkout browser on http://localhost:8080

6.11. Delete service and deployments
```
kubectl delete service node-app
kubectl delete deployment node-app
```

## 7. Application (Bonus)

For this example we will use the example Voting application from the the Docker samples, which was copied over to this repository.

References: https://github.com/dockersamples/example-voting-app


7.1. Create Namespace
```
kubectl create namespace vote
```

7.2 Get Namespaces
```
kubectl get namespaces
```

7.3. Create deployments and services for the Voting app
```
kubectl apply -f Voting-App/
```

7.4. Navigate to http://localhost:31000 to access the Voting application

7.5. Navigate to http://localhost:31001 to access the Voting Results application

7.6. Delete Namespace
```
kubectl delete namespace vote
```

## 8. Delete Kubernetes cluster from your localhost

**Windows and Mac**: Go to settings in Docker Desktop app and Disable Kubernetes

**Linux**: Run the following command
```
minikube delete --all
```