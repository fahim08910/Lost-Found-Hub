"use client";
import { Button,Spacer } from "@nextui-org/react";

const Page = () => {
  const goToLogin = () => {
    window.location.href = "/lost-found-hub/login";
  };

  return (
    <div className="p-10 mt-16 justify-center items-center">
      <div className="px-4 py-5 md:px-6 lg:p-5 bg-white w-full max-w-xl mx-auto rounded-xl">
        <div className="px-4 py-5 md:px-6 lg:p-5 bg-white w-full max-w-xl mx-auto">
          <h1 className="text-2xl font-bold text-center">Please sign in</h1>
          <Spacer y={4}/>
            <div>
              <Button
                type="submit"
                size="md"
                className={`w-full bg-green-500 hover:bg-black text-white dark`}
                onClick={goToLogin}
              >
                Go to sign in
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
