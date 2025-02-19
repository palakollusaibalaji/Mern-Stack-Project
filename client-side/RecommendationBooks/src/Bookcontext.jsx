import React,{useState,useContext} from "react"

const Contextbook = React.createContext();

export const BookContext = ({children}) => {
  const[save,setSave] = useState([])

   return (
    <Contextbook.Provider value={{save,setSave}}>
     {children}
    </Contextbook.Provider>
   )
}

export const useBook = () => {
  return useContext(Contextbook);
}
