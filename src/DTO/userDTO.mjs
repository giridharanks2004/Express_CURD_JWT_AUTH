export const userDTO = (user) => {
    const userData = {
        id : user.id,
        username : user.username,
        age : user.age,
        class : user.class
    };

    return userData;
}