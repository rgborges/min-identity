# Identity Server
I'm developing a personal identity application.
## Endpoints

### Results 

The results is the data main unit for the systems operations.

**Example of Success**
```json
{
      "id": "jji5h43i5h9804757",
      "result": { 
            "type" : "success",
            "message": [

            ]
}
```
**Example of Faild**
```json
{
      "id": "230948234239ug43",
      "resul" : {
            "type": "faild",
            "messages": [
                  "validation filed 01 with error",
                  "validation filed 02 with error"
            ]
      }
}
```

### Account

Allows you to create an account in the system based in your e-mail address, and username.

- Create an account
- Edit an account
- Delete an account

```json 
{
      "id": "jfiuri5454943534hh",
      "user" : {
            "id": "sohi328943h3h4i",
            "fullname": "Thiago Lenk Gwankman ",
            "email": "thiago@minidentity.com",
            "password": "384223o4ihh4ih545h90jkj",
            "locked": false,
            "role": "ADMIN" 
      }
}
```
`POST` `api/v1/auth`
```json
{
      "email": "thiago@minidentity.com",
      "password": ""
}
```

Getting an information of a specified account:
`POST` `/api/v1/{id_account}`

```json
{
      "appTitle" : "my-cloud-app",
}
```
Get application
`POST` `/api/v1/{id_account}/{id_app}/`

