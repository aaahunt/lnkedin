import "../css/index.css";
import UploadImages from "../components/UploadImages";
import EditProfile from "../components/EditProfile";

function Profile() {
  return (
    <div>
      <div class="box-main">
        <div class="firstHalf">
          <h1 class="text-big">My Profile</h1>
          <UploadImages />
          <EditProfile />
        </div>
      </div>
      <footer className="footer">
        <p className="text-footer">Copyright ©-Yellow Team</p>
      </footer>
    </div>
  );
}

export default Profile;
