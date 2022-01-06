const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();

function fib(number) {

  if (number > 2 && number < 21){
    var wynik=0;
    var n_2 = 1;
    var n_1 =1;
    for(var i=0;i<number-2;i++){
      wynik=n_1+n_2;
      n_2=n_1;
      n_1=wynik; 
      
    }
    return wynik;
  }
  else if( number > 0 && number < 3)
  {
    return 1;
  }

}

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');
