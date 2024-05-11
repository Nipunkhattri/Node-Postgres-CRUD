import Sequelize from 'sequelize';

const sequelize = new Sequelize('product', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
});

export default sequelize;
