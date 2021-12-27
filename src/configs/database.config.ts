export default () => ({
  database: {
    db: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_ROOT_HOST,
    password: process.env.MYSQL_ROOT_PASSWORD,
    port: Number.parseInt(process.env.MYSQL_DATABASE_PORT || '3306'),
  },
});
