import BotSettings from "./BotSettings";
import NpSettings from "./NpSettings";
import OwnControl from "./OwnControl";
import UsersControl from "./UsersControl";

export default function Settings() {
    return (
        <div className="admin">
            <div className="width-container flex-container">
                <h1>Settings</h1>
                <OwnControl />
                <NpSettings />

                <UsersControl />
                <BotSettings />
            </div>
        </div>
    );
}
