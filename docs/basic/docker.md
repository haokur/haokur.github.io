---
group: 工具
title: docker
---

### 安装与配置

- centos 删除清理旧 docker

```shell
sudo systemctl stop docker
sudo yum remove -y docker-ce docker-ce-cli containerd.io
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
sudo yum list installed | grep docker
sudo yum autoremove -y
```

- centos 安装 docker

```shell
# 更新yum
sudo yum update -y

# 安装依赖包
sudo yum install -y yum-utils device-mapper-persistent-data lvm2

# 添加官方仓库，这里使用阿里镜像
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 安装docker
sudo yum install -y docker-ce docker-ce-cli containerd.io

# 启动并设置开机启动
sudo systemctl start docker
sudo systemctl enable docker
```

- 设置 docker 镜像源

```shell
vi /etc/docker/daemon.json
```

写入镜像地址

```json
{
  "registry-mirrors": [
    "https://dockerhub.icu",
    "https://ghcr.dockerhub.icu/",
    "https://registry.docker-cn.com"
  ]
}
```

### 常用操作

#### image 镜像操作

- 拉取镜像

```shell
docker pull <image_name>
```

- 运行单个镜像 -> 容器

```shell
docker run <image_name>
```

- 删除镜像

```shell
docker rmi <image_name>
```

#### container 容器操作

- 重启 docker 服务

```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```

- 查看配置

```shell
docker info | grep Registry
```

- 查看当前运行的所有容器

```shell
docker ps -a
```

- 暂停/恢复/重启/停止一个容器

```shell
# 暂停
docker pause <container_name_or_id>

# 恢复运行
docker unpause <container_name_or_id>

# 重启
docker restart <container_name_or_id>

# 停止
docker stop <container_name_or_id>
```

- 根据镜像名删除容器

```shell
docker rm $(docker ps -a -q --filter ancestor=<image_name>)
```

- 查看 docker 内部 ip

```shell
ip addr show docker0
```

- 停止所有容器

```shell
docker stop $(docker ps -q)
```

- 删除所有容器

```shell
docker stop $(docker ps -q)
docker rm $(docker ps -aq)
```

- 使用 docker-compose.yml 文件启动

```shell
docker compose up -d
```

### 测试运行环境

```shell
# 拉取测试镜像
docker pull hello-world

# 运行测试镜像
docker run hello-world
```
