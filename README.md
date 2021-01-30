# Prisma

## Log your application with low cost 

## How to run project

### `npm i`

Install all dependencies.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

If error:
 - "System limit for number of file watchers reached, watch"

Run:
 - echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
 - sudo sysctl -p
 