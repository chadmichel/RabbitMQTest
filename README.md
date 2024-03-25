# RabbitMQTest

## Install RabbitMQ

On Mac

```
brew install rabbitmq
```

## Run this sample

Npm install first

```
npm install
```

Then build the typescript into JS

```
tsc
```

Or run tsc in the background watch mode

```
tsc --watch
```

Then you can enqueue a message using

```
node dist/queue.js SEND hello
```

You can receive a message using

```
node dist/queue.js RECEIVE
```
