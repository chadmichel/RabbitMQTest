import client, { Connection } from 'amqplib';

const queue = 'test';

const enqueue = async (message: any) => {
  const connection = await client.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(message));
  console.log(`Sent: ${message}`);

  setTimeout(() => {
    channel.close();
    connection.close();
  }, 1000);
};

const dequeue = async () => {
  const connection = await client.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: false });
  console.log('Waiting for messages in queue...');

  channel.consume(queue, (message) => {
    if (message) {
      console.log(`Received: ${message.content.toString()}`);
      channel.ack(message);
    }
  });

  setTimeout(() => {
    channel.close();
    connection.close();
  }, 1000);
};

if (process.argv.length < 3) {
  console.log('Usage: node queue.ts SEND a message');
  console.log(' -or- ');
  console.log('Usage: node queue.tS RECEIVE a message');
  process.exit(1);
}

if (process.argv[2].toUpperCase() === 'RECEIVE') {
  dequeue();
} else {
  enqueue(process.argv.slice(3).join(' ') || 'Hello World!');
}
