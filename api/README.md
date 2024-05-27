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
      "result" : {
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
            "organizations": {
                  "domain": "acme.me"
            },
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

## Organization

A owner can create a new organization.


Getting an information of a specified account:
`GET` `/api/v1/organizations/{id_organization}`
```json
{
      "appTitle" : "my-cloud-app",
}
```

`POST` `api/v1/organizations`
**Body**
```json
{
      "id": "987342iyo423iy9084983uiu43",
      "domain": "minidentity.net",
      "ownerId": "932hj4-34u095-noh34h-3442"
}
```

When you create an organization, a user and group directory is also created:

domain.net
      USERS/
GROUPS/


`POST` `api/v1/organizations/{organization_id}/users`
Insert an user into the organization directory

`POST` `api/v1/organizations/{organization_id}/groups`
Insert an group into the organization directory

Get application
`POST` `/api/v1/{id_account}/{id_app}/`

