export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  kafkaBroker: process.env.KAFKA_BROKER || 'localhost:9092',
});
