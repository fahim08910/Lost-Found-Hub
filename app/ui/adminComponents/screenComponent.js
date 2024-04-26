import ReportedPostAdminComponent from "./reportedPostAdmin";
import AdminFoundPost from "./adminFoundPost";
import AdminLostPost from "./adminLostPost";
import UserList from "./users";
import AddAdminComponent from "./addAdminComponent";
import NewsletterList from "./newsLetterEmailList";
import ContactQueryList from "./contactUsMessages";


const ScreenContent = ({ screen }) => {
  const screens = {
    "Dash Board": (
      <div className="h-full w-full bg-[#f1f8e9]  items-start justify-center  ">
        <UserList />
      </div>
    ),
    "Reported Post": (
      <div className="h-full w-full bg-[#f1f8e9] flex items-start justify-center  ">
        <ReportedPostAdminComponent />
      </div>
    ),
    "Lost Post": (
      <div className="h-full w-full bg-[#f1f8e9] flex items-start justify-center  ">
        <AdminLostPost />
      </div>
    ),
    "Found Post": (
      <div className="h-full w-full bg-[#f1f8e9] flex items-start justify-center  ">
        <AdminFoundPost />
      </div>
    ),
    "News Letter List": (
      <div className="h-full w-full bg-[#f1f8e9]  items-start justify-center   ">
        <NewsletterList />
      </div>
    ),
    "Contact Us": (
      <div className="h-full w-full bg-[#f1f8e9] items-start justify-center   ">
        <ContactQueryList />
      </div>
    ),
    "Add Admin": (
      <div className="h-full w-full bg-[#f1f8e9] items-start justify-center   ">
        <AddAdminComponent />
      </div>
    ),
  };

  return screens[screen] || <div>Screen not found</div>;
};

export default ScreenContent;
