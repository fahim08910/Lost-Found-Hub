import SignupComponent from "app/ui/auth/signup";
import "app/lost-found-hub/lost-found-hub.css";

async function Page() {
  function pauser(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }
  await pauser(3000);
  return (
    <div className="p-10 mt-16">
      <SignupComponent />
    </div>
  );
}
export default Page;
