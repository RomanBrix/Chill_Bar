import OwnControl from "./OwnControl";
import UsersControl from "./UsersControl";

export default function Settings() {
    return (
        <div className="admin">
            <div className="width-container">
                <h1>Settings</h1>
                <OwnControl />
                <UsersControl />
            </div>
        </div>
    );
}
