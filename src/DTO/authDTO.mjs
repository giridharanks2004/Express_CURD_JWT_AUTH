export const authDTO = (user) => {
    const wrappedData = {
        msg : "user as been registered",
        username : user.username
    }

    return wrappedData;
}