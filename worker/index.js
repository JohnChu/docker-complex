const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});
const sub = redisClient.duplicate();

function fib(index) {
    if (index < 2) return 1;
    return fib(index -1) + fib(index -2);
}

/*
Subscribe to the message event, then feed it through the
callback function.
*/
sub.on('message', (channel, message) => {
    // Save the hash of message and fib result to Redis
    redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');
