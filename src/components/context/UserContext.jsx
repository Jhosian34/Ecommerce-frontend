import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const updateUser = (newUser) => {
        if (newUser && typeof newUser === 'object') {
            setUser(newUser);
        } else {
            console.warn('updateUser recibió un valor inválido:', newUser);
        }
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('cart');
        
    };

    return (
        <UserContext.Provider value={{ user, updateUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
}