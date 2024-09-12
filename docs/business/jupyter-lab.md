# jupyter-lab 的使用

## 效果预览

![效果图](https://static.haokur.com/github/jupyter-lab.png)

## 安装

```shell
pip install jupyterlab
```

## 设置 jupyter

```shell
jupyter notebook --generate-config

# 打开编辑
vi ~/.jupyter/jupyter_notebook_config.py
```

## 安装最新 python 可能遇到的问题

● 使用 pip3 安装，而不是 pip
● 更新升级 pip3

```shell
pip3 install --upgrade pip3
```

● openssl 需要版本是 1.1.1

```shell
# 安装openssl的最新版本，后期的pip3安装网络相关模块需要用到ssl模块
yum install openssl-devel openssl11 openssl11-devel
```

## 安装社区扩展

### 安装 tslab，支持 typescript

```shell
npm install tslab -g

tslab tslab install --version

tslab install --version

tslab install --python=python3
```

● 安装 tslab 时，可能会出现 GLIBCXX_3.4.20 ，GLIBCXX_3.4.26 模块找不到的报错，解决方式看下面文档：
缺少 GLIBCXX_3.4.20，需要手动安装
● 查看当前版本：

```shell
strings /lib64/libstdc++.so.6 | grep GLIBC
```

● 参考：https://blog.csdn.net/yexiaoping1122/article/details/105706832
● 安装 GLIBCXX_3.4.20

```shell
wget http://ftp.tsukuba.wide.ad.jp/software/gcc/releases/gcc-5.4.0/gcc-5.4.0.tar.gz

cd gcc-5.4.0
./contrib/download_prerequisites

mkdir build
cd build
../configure --enable-checking=release --enable-languages=c,c++ --disable-multilib

make
make install
```

● 安装*GLIBCXX_3.4.26*

```shell
# 下载
wget http://www.vuln.cn/wp-content/uploads/2019/08/libstdc.so_.6.0.26.zip

# 解压
unzip libstdc.so_.6.0.26.zip

#
cp ./libstdc++.so.6.0.26 /usr/lib64

cd /usr/lib64
cp libstdc++.so.6 libstdc++.so.6_bak
rm -f libstdc++.so.6
```

### 安装 gophernotes 支持 golang 语法

- centos

前提条件：服务器已安装 golang 语言环境

```shell
go install github.com/gopherdata/gophernotes@v0.7.5
mkdir -p ~/.local/share/jupyter/kernels/gophernotes
cd ~/.local/share/jupyter/kernels/gophernotes
cp "$(go env GOPATH)"/pkg/mod/github.com/gopherdata/gophernotes@v0.7.5/kernel/*  "."
chmod +w ./kernel.json # in case copied kernel.json has no write permission
sed "s|gophernotes|$(go env GOPATH)/bin/gophernotes|" < kernel.json.in > kernel.json
```

## 启动 jupyter

```shell
# 使用 pm2 启动
pm2 start 'jupyter lab --no-browser --allow-root' --name jupyter-notes
```
