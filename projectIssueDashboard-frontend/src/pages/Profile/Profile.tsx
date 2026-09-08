import "./Profile.css";
import Avatar from "../../components/common/Avatar";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useAuth } from "../../context/useAuth";
import Loading from "../../components/common/Loading";

export default function Profile() {
    useDocumentTitle("Profile");

    const { user, isLoading } = useAuth();
    if (isLoading) {
        return <Loading></Loading>;
    }

    if (!user) return null;

    return (
        <div className="profileParent">
            <div className="profile">
                <div className="avatarContainer">
                    <Avatar url={user.avatar} width={100} height={100}></Avatar>
                    <button>Change Avatar</button>
                </div>
                <div className="detailsContainer">
                    <div className="field">
                        <span>Full Name</span>
                        <span>{user.name}</span>
                    </div>
                    <div className="field">
                        <span>User name</span>
                        <span>{user.userName}</span>
                    </div>
                    <div className="field">
                        <span>Email</span>
                        <span>{user.email}</span>
                    </div>
                    <div className="field">
                        <span>Bio</span>
                        <span>{user.bio}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
