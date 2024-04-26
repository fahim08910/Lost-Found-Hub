"use client";
import FAQSection from "app/ui/homeComponent/faqComponent";
import NewsLetterSection from "app/ui/homeComponent/newsLetterComponent";
import ContactUsSection from "app/ui/homeComponent/contactUsComponent";
import HeroSection from "app/ui/homeComponent/heroComponent";

const Home = () => {
  return (
    <div>
      <div>
        <div
        className="relative h-[90vh] xl:min-h-screen flex flex-col justify-center items-center text-center text-white px-4 sm:px-6 lg:px-8 bg-cover bg-center"
        style={{ backgroundImage: 'url("/photo1.jpg")' }}
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="z-10 p-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">
              <span className="text-blue-500"> Lost and Found Hub</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-4 md:mb-6">
              Reconnect with Your Lost Items
            </p>
          </div>
        </div>
      </div>

      <HeroSection
        backgroundImage="/photo2.jpg"
        mainText="Lost"
        highlightColor="text-red-400"
        link1Href="/lost-found-hub/viewfoundpost"
        link1Text="Search Here"
        link2Href="/lost-found-hub/Lostpost"
        link2Text="Create Lost Post"
        button2Color="bg-red-950"
        button1Color="bg-red-950"
      />

      <HeroSection
        backgroundImage="/photo3.jpg"
        mainText="Found"
        highlightColor="text-green-400"
        link1Href="/lost-found-hub/viewlostpost"
        link1Text="Search Here"
        link2Href="/lost-found-hub/Foundpost"
        link2Text="Create Found Post"
        button2Color="bg-green-950"
        button1Color="bg-green-950"
      />

      <NewsLetterSection />
      <FAQSection />
      <ContactUsSection />
    </div>
  );
}
export default Home;
