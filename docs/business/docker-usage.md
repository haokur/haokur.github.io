# docker 的使用

### 一、删除清理旧 docker

- sudo systemctl stop docker
- sudo yum remove -y docker-ce docker-ce-cli containerd.io
- sudo rm -rf /var/lib/docker
  sudo rm -rf /var/lib/containerd
- sudo yum list installed | grep docker
- sudo yum autoremove -y

### 二、安装新 docker

1. 更新系统

```shell
sudo yum update -y
```

2. 安装依赖包

```shell
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

3. 添加官方仓库，这里使用阿里镜像

```shell
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

4. 安装 docker

```shell
sudo yum install -y docker-ce docker-ce-cli containerd.io
```

5. 启动并设置开机启动

```shell
sudo systemctl start docker
sudo systemctl enable docker
```

6. 设置 docker 镜像源

```shell
vi /etc/docker/daemon.json
```

7. 写入镜像源地址

```json
{
  "registry-mirrors": [
    "https://dockerhub.icu",
    "https://ghcr.dockerhub.icu/",
    "https://registry.docker-cn.com"
  ]
}
```

8. 重启 docker 服务

```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```

9. 查看配置是否正确

```shell
docker info | grep Registry
```

10. 测试拉取一个镜像

```shell
docker pull hello-world
```

11. 测试启动这个 docker

```shell
docker run hello-world
```

12. 检查运行的容器

```shell
docker ps -a
```

13. 暂停一个容器

```shell
docker pause <container_name_or_id>
```

13. 恢复一个容器

```shell
docker unpause <container_name_or_id>
```

14. 删除容器

```shell
docker rm $(docker ps -a -q --filter ancestor=hello-world)
```

15. 删除镜像

```shell
docker rmi hello-world
```

16. 查看 docker 内部 ip

```shell
ip addr show docker0
```

17. 重启 docker 容器

```shell
docker restart <container_name_or_id>
```
