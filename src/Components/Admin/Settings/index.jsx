import BotSettings from "./BotSettings";
import NpSettings from "./NpSettings";
import OwnControl from "./OwnControl";
import UsersControl from "./UsersControl";

export default function Settings() {
    return (
        <div className="admin">
            <div className="width-container">
                <h1>Settings</h1>
                <OwnControl />
                <UsersControl />

                <NpSettings />
                <BotSettings />
            </div>
        </div>
    );
}
