import UserCard from './UserCard';

export default function UserList({ users, onEdit, onDelete }) {
    return (
        <div className="user-card-container">
            {users.map(user => (
                <UserCard
                    key={user.id}
                    user={user}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}