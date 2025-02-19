import React, {useState,useContext,} from 'react';

const ContextUser = React.createContext();

export const AuthContext = ({children}) => {
const[user,setUser] = useState()

const login = (username) => {
 setUser(username)
}

return(
<ContextUser.Provider value={{user,login}}>
    {children}
</ContextUser.Provider>
)
}

export const useauth = () => {
 return useContext(ContextUser);
}
