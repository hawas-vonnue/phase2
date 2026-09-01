import "./Profile.css";
import Avatar from "../../components/common/Avatar";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

// interface ProfileData {
//     fullName: string;
//     username: string;
//     email: string;
//     bio: string;
// }

export default function Profile({
    name,
    userName,
    email,
    bio,
    url,
}: {
    name: string;
    userName: string;
    email: string;
    bio: string;
    url: string;
}) {
    useDocumentTitle("Profile");

    return (
        <div className="profileParent">
            <div className="profile">
                <div className="avatarContainer">
                    <Avatar url={url} width={100} height={100}></Avatar>
                    <button>Change Avatar</button>
                </div>
                <div className="detailsContainer">
                    <div className="field">
                        <span>Full Name</span>
                        <span>{name}</span>
                    </div>
                    <div className="field">
                        <span>User name</span>
                        <span>{userName}</span>
                    </div>
                    <div className="field">
                        <span>Email</span>
                        <span>{email}</span>
                    </div>
                    <div className="field">
                        <span>Bio</span>
                        <span>{bio}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// export const Profile: React.FC = () => {
//     // Component State Management
//     const [profile, setProfile] = useState<ProfileData>({
//         fullName: "Alex Morgan",
//         username: "alexm_dev",
//         email: "alex@example.com",
//         bio: "Frontend developer building sleek user interfaces.",
//     });

//     const [avatar, setAvatar] = useState<string>("https://unsplash.com");
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     // Profile input update handler
//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//     ) => {
//         const { id, value } = e.target;
//         setProfile((prev) => ({ ...prev, [id]: value }));
//     };

//     // Avatar image picker handler
//     const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             const imageUrl = URL.createObjectURL(file);
//             setAvatar(imageUrl);
//         }
//     };

//     const triggerFileInput = () => {
//         fileInputRef.current?.click();
//     };

//     // Profile save action
//     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         console.log("Saved Profile Data:", { ...profile, avatar });
//         alert("Profile updated successfully!");
//     };

//     return (
//         <div className="profile-container">
//             <div className="profile-card">
//                 <h2>Profile Settings</h2>

//                 <form className="profile-form" onSubmit={handleSubmit}>
//                     {/* Avatar Upload Section */}
//                     <div className="avatar-section">
//                         <img
//                             src={avatar}
//                             alt="Profile preview"
//                             className="avatar-preview"
//                         />
//                         <div className="avatar-actions">
//                             <input
//                                 type="file"
//                                 ref={fileInputRef}
//                                 onChange={handleAvatarChange}
//                                 accept="image/*"
//                                 style={{ display: "none" }}
//                             />
//                             <button
//                                 type="button"
//                                 className="btn-secondary"
//                                 onClick={triggerFileInput}
//                             >
//                                 Change Avatar
//                             </button>
//                             <p>JPG or PNG. Max size 2MB.</p>
//                         </div>
//                     </div>

//                     {/* Personal Details */}
//                     <div className="form-row">
//                         <div className="form-group">
//                             <label htmlFor="fullName">Full Name</label>
//                             <input
//                                 type="text"
//                                 id="fullName"
//                                 className="login-input"
//                                 value={profile.fullName}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="username">Username</label>
//                             <input
//                                 type="text"
//                                 id="username"
//                                 className="login-input"
//                                 value={profile.username}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="email">Email Address</label>
//                         <input
//                             type="email"
//                             id="email"
//                             className="login-input"
//                             value={profile.email}
//                             onChange={handleChange}
//                             required
//                             autoComplete="email"
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="bio">Bio</label>
//                         <textarea
//                             id="bio"
//                             className="login-textarea"
//                             value={profile.bio}
//                             onChange={handleChange}
//                             placeholder="Tell us about yourself..."
//                         />
//                     </div>

//                     {/* Action buttons */}
//                     <button type="submit" className="btn-primary">
//                         Save Changes
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Profile;
