
# Users Management

Users Management is built upon a robust folder structure, incorporating clean code practices and a well-organized repository architecture. It serves as a foundation for efficiently managing user data through Node.js and MongoDB.

## Table of Contents

- [Installation](#installation)
- [API Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with Users Management, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/grezzled/ARKX-Project-Blog.git
   ```

2. Install the project dependencies:

   ```bash
   cd users_management
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the project root directory and add the necessary environment variables. You can use the provided `.env.example` as a template.

4. Start the development server:

   ```bash
   npm run dev
   ```


## Documentation

## User Data API

This API allows you to post, patch and retrieve filtered user data from a MongoDB database based on the provided filter options.

### Endpoint

```
POST /api/users
```

### Endpoint

```
PATCH /api/users/{USER_ID}
```

### Endpoint

```
GET /api/users
```

### Parameters

  - `q` (string, optional) - The search query to filter users based on username or email.

  - `sortBy` (string) - The field to sort the users by.

  - `sortDirection` (string) - The sort direction, either "ASC" for ascending or "DESC" for descending.

  - `offset` (number) - The offset for pagination, specifying the page number.

  - `limit` (number) - The maximum number of users to retrieve per page.

  - `active` (boolean, optional) - Filter users by active status.

  - `inHold` (boolean, optional) - Filter users by in-hold status.

  - `role` (string, optional) - Filter users by role.

### Response


- `200 OK` - Successfully retrieved user data.

  ```json
  [
    {
      "userId": "12345",
      "username": "johndoe",
      "email": "johndoe@example.com",
      "active": true,
      "inHold": false,
      "role": "user"
      // ...other user fields
    },
    // ...more user objects
  ]
  ```

- `404 Not Found` - No users found matching the filter options.

- `500 Internal Server Error` - An error occurred while processing the request.

### Usage Examples

#### Retrieve all users

```
GET /api/users?sortBy=salary&sortDirection=ASC&offset=1&limit=10
```

#### Search for users by query

```
GET /api/users?q=johndoe&sortBy=salary&sortDirection=ASC&offset=1&limit=10
```

#### Filter users by role and active status

```
GET /api/users?role=admin&active=true&sortBy=username&sortDirection=ASC&offset=1&limit=10
```

### Notes

- The `offset` and `limit` parameters are used for pagination, allowing you to retrieve a specific page of user data.

- You can filter users based on various criteria such as username, email, active status, and role.

- The API returns a JSON array of user objects that match the specified filter options.

- If no users match the filter options, a `404 Not Found` response is returned.

- In case of any errors during processing, a `500 Internal Server Error` response is returned.

Please refer to the API documentation above for more details on how to use this API to retrieve user data based on your specific requirements.


## Contributing

Contributions are welcome! If you'd like to contribute to Users Management, please follow these guidelines:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your feature or bug fix.
4. Make your changes and test thoroughly.
5. Commit your changes with descriptive commit messages.
6. Push your changes to your fork on GitHub.
7. Create a pull request to the main repository.


## License

This project is licensed under.. emmm.. Fuck it do whatever you like with it ^_^