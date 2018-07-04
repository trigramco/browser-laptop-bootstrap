# browser-laptop-bootstrap
Everything you need to compile [Muon](https://github.com/trigramco/muon) and run [Canopy](https://github.com/trigramco/canopy)
- fetches syncs code from all projects we define in package.json
  - fetches all 3rd party source code (Chromium) via depot_tools
  - sets the branch for Chromium (ex: 54.0.2840.100)
  - checks out [Muon](https://github.com/trigramco/muon)
  - checks out [our fork of node](https://github.com/brave/node/tree/chromium54) as a dependency under Muon (along with other deps)
  - checks out [canopy](https://github.com/trigramco/canopy)
- applies [patches we have](https://github.com/brave/muon/tree/master/patches) for 3rd party code (Chromium, node)

## Build method 1
Please [check out our wiki](https://github.com/brave/browser-laptop-bootstrap/wiki) for build instructions and other information.

## Build method 2 Running in Docker

You can compile muon for Linux using a Docker container.

First clone this repo and enter the repo directory:
```
git clone https://github.com/trigramco/browser-laptop-bootstrap.git canopy-bootstrap
cd canopy-bootstrap
```

### Docker group
Before executing any Docker commands add your local user to the Docker group (https://docs.docker.com/install/linux/linux-postinstall/)

Start Docker then build the image from the Dockerfile:
```
docker build -t blb .
```

And run it, mounting the appropriate directories:
### Linux/OSX
```
docker run --rm -it -v $(pwd):/src -v $(pwd)/.sccache:/root/.cache/sccache blb
```
### Windows
```
mkdir .sccache
docker run --rm -it -v %cd%:/src -v %cd%/.sccache:/root/.cache/sccache blb
```
Dependencies are included in the image so there's no need to run `./src/build/install-build-deps.sh`.

### Check your Docker user
From the Docker Container touch a file to see its user:group, if it is root you will want to run
npm as node:node, for example:
```
su -c 'npm install' node
su -c 'npm run init' node
```

Now you can proceed with build scripts such as `npm install`, `npm run init`, `npm run sync -- --all` and `npm run build -- --debug_build=true --official_build=false`. See `./src/out` for the results.

## Electron
Once either build process is complete, Electron is available as ./src/out/brave

## Running Canopy
Canopy is located at ./src/canopy
https://github.com/trigramco/canopy/blob/master/README.md
Executing Canopy (i.e. npm run dev) should run against ./src/out/brave
