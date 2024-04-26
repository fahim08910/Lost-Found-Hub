import React from "react";

function FAQSection() {
  return (
    <section className="bg-[#1D1D1D]">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-white">
          Frequently asked questions
        </h2>
        <div className="grid pt-8 text-left border-t border-gray-700 md:grid-cols-2">
          <div className="p-2">
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                How do I create a lost post?
              </h3>
              <p className="text-gray-400">
                {""}
                When creating a lost post, it&apos;s essential to provide detailed
                information about the item you&apos;ve lost. Include specifics such
                as the item&apos;s description, when and where it was last seen, any
                distinctive features, and your contact information. Providing
                clear photos of the lost item can also significantly aid in its
                recovery. Remember to double-check your post for accuracy before
                submitting it to ensure that others can easily understand and
                identify your lost item.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                How do I create a found post?
              </h3>
              <p className="text-gray-400">
                When posting about a found item, your goal is to reunite it with
                its rightful owner. Provide as much detail as possible about the
                item, including where and when it was found, its description,
                and any unique markings or characteristics. Additionally,
                specify how the owner can contact you to claim the item. By
                providing comprehensive information, you increase the likelihood
                of connecting with the item&apos;s owner and facilitating its return.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                What should I do if I suspect a post is a scam or fake?
              </h3>
              <p className="text-gray-400">
                If you come across a post that appears suspicious or fraudulent,
                it&apos;s important to report it promptly. Look for signs such as
                vague descriptions, requests for payment to return the item, or
                inconsistent details. Use the report feature on our platform to
                notify our moderation team, who will investigate the issue
                further. By reporting suspicious activity, you help maintain the
                safety and trustworthiness of our community.
              </p>
              <p className="text-gray-400">
                Feel free to contact us and we&apos;ll help you out as soon as we
                can.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                How can I report a found item that I&apos;ve found on the site?
              </h3>
              <p className="text-gray-400">
                If you&apos;ve found an item that matches a lost post on our
                platform, you can report it by contacting the owner directly
                through our messaging system. Provide details about where and
                when you found the item and any identifying features to confirm
                its ownership. Our platform facilitates communication between
                the finder and the owner to arrange for the safe return of the
                item.
              </p>
            </div>
          </div>

          <div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                How do I delete my account?
              </h3>
              <p className="text-gray-400">
                If you no longer wish to use our platform, you can delete your
                account by accessing the account settings section. Follow the
                prompts to initiate the account deletion process. Keep in mind
                that deleting your account will permanently remove all
                associated information, including your posts and messages. Once
                the deletion is complete, you will no longer have access to your
                account or any of its data.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                What should I do if I&apos;ve found my lost item after posting?
              </h3>
              <p className="text-gray-400">
                If you&apos;ve recovered your lost item after posting on our
                platform, it&apos;s important to update or remove your lost post to
                avoid further inquiries. Access your account and navigate to the
                post you wish to modify. Update the status of the post to
                indicate that the item has been found, or delete the post
                entirely if no longer needed. By keeping your posts current, you
                help streamline the search process for others in our community.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Is there a way to search for lost items without creating an
                account?
              </h3>
              <p className="text-gray-400">
                Yes, our platform allows users to browse lost and found listings
                without requiring an account. Simply navigate to the search page
                and enter relevant keywords or filters to narrow down the
                results. While creating an account offers additional features
                such as posting and messaging capabilities, it is not necessary
                for browsing listings.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Can I edit my lost or found post after it&apos;s been published?
              </h3>
              <p className="text-gray-400">
                Yes, you can usually edit your lost or found post after it has
                been published. Access your account and navigate to the post you
                wish to edit. Depending on the platform, you may be able to
                modify details such as the item&apos;s description, location, or
                contact information. Ensure that any edits accurately reflect
                the information related to your lost or found item to facilitate
                successful recovery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
