# CURD Operation Node js using Postgres Database

### Instruction to Set up locally

1 Run cmd (git clone )</br>
2 Open folder</br>
<ul>
<li>Run cmd (npm install)</li>
<li>Create .env and gave the Postgres database Url and secret key</li>
<li>Run cmd (nodemon ./server.js)</li>
</ul>

### Create RESTful endpoints for the API using Node JS
1. Create a new Product
2. Retrieve a list of all Products
3. Retrieve a single Product by ID
4. Update an existing Prodcut by Id
5. Delete a Product by ID
6. User Authentication (Login / Regsiter)

Middleware functions to handle common tasks such as error handling, request logging, and authentication checks.

## Tech Stack:

Node JS, Express JS , Postgres , sequelize , Postman 

## Postman

## API Endpoints:

### User Route

#### Register The User

```http
POST /auth/register
```

Request Body
```json
{
    "username":"Test",
    "email":"Test@gmail.com",
    "password":"Test"
}
```

Response
```json
{
    "message": "Registered Successfully"
}
```

#### Login The User

```http
POST /auth/login
```

Request Body
```json
{
    "email":"Test@gmail.com",
    "password":"Test"
}
```
Response
```json
{
  "token":"<ACCESS_TOKEN>",
  "message":"Login successfull .."
}
```

### Tasks Route

#### Create The Product

```http
POST /api/CreateProduct
```

Request Header
| Key          | Value              |
---------------|---------------------
|Authorization | Bearer <JWT_TOKEN> |


Request Body
```json
{
    "ProductName":"Mobile",
    "ProductDescription":"One PLus CE4",
    "Price":20000
}
```
Response
```json
{
    "message": "Product Created Successfully"
}
```

#### Getting All the Products

```http
GET /api/GetAllProduct
```

Request Header
| Key          | Value              |
---------------|---------------------
|Authorization | Bearer <JWT_TOKEN> |


Response
```json
[
    {
        "id": 4,
        "ProductName": "Mobile",
        "ProductDescription": "One PLus CE4",
        "Price": "20000",
        "createdAt": "2024-05-11T10:53:19.824Z",
        "updatedAt": "2024-05-11T10:53:19.824Z"
    }
]
```

#### Getting the Single Product By ID

```http
GET /api/GetSingleProduct/<TaskId:int>
```

Request Header
| Key          | Value              |
---------------|---------------------
|Authorization | Bearer <JWT_TOKEN> |

Response
```json
{
    "id": 4,
    "ProductName": "Mobile",
    "ProductDescription": "One PLus CE4",
    "Price": "20000",
    "createdAt": "2024-05-11T10:53:19.824Z",
    "updatedAt": "2024-05-11T10:53:19.824Z"
}
```

#### Updating the Specific Product By ID

```http
PATCH /api/UpdateProduct/<TaskId:int>
```

Request Body
```json
{
    "ProductName":"MobilePhone"
}
```

Request Header
| Key          | Value              |
---------------|---------------------
|Authorization | Bearer <JWT_TOKEN> |

Response
```json
{
    "message": "Product Updated"
}
```

#### Deleting the Product By Id

```http
DELETE /api/DeleteProduct/<TaskId:int>
```

Request Header
| Key          | Value              |
---------------|---------------------
|Authorization | Bearer <JWT_TOKEN> |

Response
```json
{
    "message": "Deleted Successfully"
}
```

