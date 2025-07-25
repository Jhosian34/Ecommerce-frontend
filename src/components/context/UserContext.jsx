import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const updateUser = (newUser) => {
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('cart');
    };

    return (
        <UserContext.Provider value={{ user, updateUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
}