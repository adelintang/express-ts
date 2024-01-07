# User Api Specification

## Path

- /api/v1/signup
- /api/v1/signin
- /api/v1/user

### Sign Up

Endpoint : /api/v1/signup

Method : POST

**Request header** :

- application/json

**Request Body** :

```
{
  email: string,
  username: string,
  password: string,
}
```

Example :

```
{
  email: 'john@gmail.com',
  username: 'john',
  password: 'john123'
}
```

**Response Fail**

Response with missing body properti

- status code : 400

```
{
  status: 'fail',
  message: 'missing body property'
}
```

Response with duplicate email or username

- status code : 409

```
{
  status: 'fail',
  message: 'email or username alredy exist'
}
```

**Response Success**

- status code : 201

```
{
  status: 'success',
  message: 'registration successfully'
}
```

### Sign In

Endpoint : /api/v1/signin

Method : POST

**Request header**

- application/json

**Request Body**

```
{
  email: string,
  password: string
}
```

Example :

```
{
  email: 'john@gmail.com',
  password: 'john123'
}
```

**Response Fail**

Response with missing body properti

- status code : 400

```
{
  status: 'fail',
  message: 'missing body property'
}
```

Response with user not found

- status code : 404

```
{
  status: 'fail',
  message: 'user not found'
}
```

Response with user unauthorized

- status code : 401

```
{
  status: 'fail',
  message: 'user unauthorized'
}
```

**Response Success**

- status code : 200

```
{
  status: 'success',
  data: {
    accessToken: 'hubfjdDCBDHJD2E2E2.nfjeffjjbr2e24242.SNJn4244224'
  }
}
```

### User Me

Endpoint : /api/v1/user

Method : GET

**Request header**

- Content-Type : application/json
- Authorization : Bearer {token}

**Response Fail**

Response with no token or token invalid

- status code : 401

```
{
  status: 'fail',
  message: 'user unauthorized'
}
```

**Response Success**

- status code : 200

```
{
  status: 'success',
  data: {
    id: 'hbce673783298',
    email: 'john@gmail.com',
    username: 'john'
  }
}
```

### User Update

Endpoint : /api/v1/user

Method : PATCH

**Request header**

- Content-Type: application/json
- Authorization: Bearer {token}

**Request Body**

```
{
  email?: string,
  username?: string,
  password?: string,
  newPassword?: string
}
```

Example

```
{
  email: 'john@gmail.com',
  username: 'john',
  oldPassword: 'john123',
  newPassword: 'john789'
}
```

**Response Fail**

Response with missing body property

- status code : 400

```
{
  status: 'fail',
  message: 'missing body property'
}
```

Response when oldPassword is wrong

- status code : 400

```
{
  status: 'fail',
  message: 'old password not match'
}
```

Response with no token or token invalid

- status code : 401

```
{
  status: 'fail',
  message: 'user unauthorized'
}
```

**Response Success**

- status code : 200

```
{
  status: 'success',
  message: 'updated user data successfully',
  data: {
    email: 'john@gmail.com',
    username: 'john',
    password: 'john789'
  }
}
```

### User Delete

Endpoint : /api/v1/user

Method : DELETE

**Request header**

- Content-Type: application/json
- Authorization: Bearer {token}

**Response Fail**

Response when no token or invalid token

- status code : 401

```
{
  status: 'fail',
  message: 'user unauthorized'
}
```

Response when user not found

- status code : 404

```
{
  status: 'fail',
  message: 'user not found'
}
```

**Response Success**

- status code : 200

```
{
  status: 'success',
  message: 'deleted user successfully',
  data: {
    id: '2674gewfbebcdffg'
  }
}
```
