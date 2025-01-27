---
group: 自动化
toc: content
---

# go 执行命令

```go
package main

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"strings"

	terminal "golang.org/x/term"
)

// 获取用户的路径
func GetUserHomePath() string {
	dirPath, err := os.UserHomeDir()
	if err != nil {
		return "~"
	}
	return dirPath
}

// 获取工作目录
func GetWorkDir() string {
	workingDir, _ := os.Getwd()
	return workingDir
}

// 是否是要调用终端的vim
func isCallTerminalVim(command string) bool {
	parts := strings.Fields(command)
	isGitCommit := false
	isVim := false
	if len(parts) > 1 {
		isGitCommit = parts[0] == "git" && parts[1] == "commit"
	} else if len(parts) > 0 {
		isVim = strings.HasPrefix(command, "vi")
	}
	return isGitCommit || isVim
}

// 调用系统的vim
func callTerminalVim(command string) {
	// 获取当前终端
	fd := int(os.Stdin.Fd())

	// 设置终端为原始模式
	oldState, err := terminal.MakeRaw(fd)
	if err != nil {
		panic(err)
	}
	defer terminal.Restore(fd, oldState)

	// 调用 Vim
	parts := strings.Fields(command) // 使用 Fields 分割以处理空格
	process := parts[0]
	args := parts[1:]
	cmd := exec.Command(process, args...)
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	err = cmd.Run()

	if err != nil {
		panic(err)
	}
}

func RunCommandWithLog(command string) error {
	log.Println("执行命令：", command)
	// 如果是要调用vi的，则需要额外处理，git commit，vi
	if isCallTerminalVim(command) {
		callTerminalVim(command)
		return nil
	}
	// 如果是调用cd命令，使用Chdir进入目录
	if strings.HasPrefix(command, "cd") {
		parts := strings.Fields(command)
		if len(parts) > 1 {
			targetDir := parts[1]
			if strings.Contains(targetDir, "~") {
				homeDir := GetUserHomePath()
				targetDir = strings.ReplaceAll(targetDir, "~", homeDir)
			}
			if err := os.Chdir(targetDir); err != nil {
				fmt.Printf("切换到目录 %s 失败: %v\n", targetDir, err)
			}
		}
		return nil
	}
	cmd := exec.Command("bash", "-c", command) // 使用 bash 运行命令
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	err := cmd.Run()
	if err != nil {
		return err
	}
	return nil
}

func main() {
    // 先进入~目录，再执行ls，打印的是~目录下的文件列表
	RunCommandWithLog("cd ~")
	RunCommandWithLog("ls")
	RunCommandWithLog("screencapture ~/Desktop/screenshot_from_go.jpg")
}
```
