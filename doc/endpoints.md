# Endpoints

Features
- Customer can register in the platform

## Logging in the platorm

Endpoint: `api\v1\register`
```json
{
      "username": "",
      "password": "",
      "email": ""
}
```

## Create a new user 

Register a new user in the system.

**POST**
Endpoint: `api\v1\users`
```json 
{
      "username": "username",
      "password": "",
      "authenticationProvider": "self",
      "person": {
            "fullname": "HELEN SOLENAEM"
      },
}
```
**Considerations**

- Adding personal information help on authenticity of the profile. In order to authenticate the person, you need an government ID, and needs to be done through a legal entity. So for this MVP I would not implement the photo authentication at this moment. The system will keep the person fullname though.