export const userValidationSchema = {
    username : {
        notEmpty : {
            errorMessage : "user cannot be empty"
        },
    },
    age : {
        notEmpty : {
            errorMessage : "age cannot be empty"
        }
        
    },
    class : {
        notEmpty : {
            errorMessage : "class cannot be empty"
        }
    },
}

export const authValidation = {
    username : {
        notEmpty : {
            errorMessage : "user name must not be empty"
        }
    },
    password : {
        notEmpty : {
            errorMessage : "pasword must not be empty"
        },
        isLength  : {
            options : { min: 8 , max : 15 },
            errorMessage : "password must be minimum of 8 to maximum of 15 characters"
        }
    }
}