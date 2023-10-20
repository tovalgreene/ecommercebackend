# E-commerce Back End

This project is a back end for an e-commerce website.

## User Story

AS A manager at an internet retail company,
I WANT a back end for my e-commerce website that uses the latest technologies,
SO THAT my company can compete with other e-commerce companies.

## Acceptance Criteria

GIVEN a functional Express.js API,

- WHEN I add my database name, MySQL username, and MySQL password to an environment variable file,
  - THEN I am able to connect to a database using Sequelize.

- WHEN I enter schema and seed commands,
  - THEN a development database is created and is seeded with test data.

- WHEN I enter the command to invoke the application,
  - THEN my server is started and the Sequelize models are synced to the MySQL database.

- WHEN I open API GET routes in Insomnia Core for categories, products, or tags,
  - THEN the data for each of these routes is displayed in a formatted JSON.

- WHEN I test API POST, PUT, and DELETE routes in Insomnia Core,
  - THEN I am able to successfully create, update, and delete data in my database.

## Installation

1. Clone the repository to your local machine.
2. Run `npm install` to install the necessary dependencies.
3. Create a `.env` file in the root directory and add the following variables:
DB_NAME=your_database_name
DB_USER=your_mysql_username
DB_PW=your_mysql_password
4. Run `mysql -u root -p` and enter your MySQL password.
5. Run `source db/schema.sql` to create the database.
6. Run `npm run seed` to seed the database with test data.
7. Run `npm start` to start the server.

## Usage

Once the server is running, you can use Insomnia Core to test the API routes.

- For GET routes, enter the URL for the route you want to test and send the request.

- For POST, PUT, and DELETE routes, you'll need to include the necessary data in the request body.

## License

This project is licensed under the MIT License.