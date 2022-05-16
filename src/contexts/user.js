import React, { createContext, useState } from "react";

const UserContext = createContext({
    state: { account: null },
    actions: {
        setAccount: () => { }
    }
})

const UserProvider = ({ children }) => {
    const [account, setAccount] = useState(null);

    const value = {
        state: { account },
        actions: { setAccount }
    }

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };
export default UserContext;