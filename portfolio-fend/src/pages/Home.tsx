import Button from "../components/Button";
import Section from "../components/Section";
import profile from "../data/profile";
import { GoDownload } from "react-icons/go";

const Home = () => {
  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/leon-resume-2026-v2.pdf";
    link.download = "leoncio-Espiritu-resume-2026.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Section className="min-h-screen" id="home" variant="dark">
      <div className="md:flex md:items-center px-2 gap-6 py-4 md:py-12">
        <div className=" flex-25 ">
          <div className="relative mx-auto aspect-square  w-70 sm:w-80 md:mx-0">
            <div className="pointer-events-none absolute -inset-2 rounded-full border-2  border-secondary/30 " />
            <img
              className="relative z-10 block h-full w-full rounded-full border-4 border-surface object-cover"
              src={profile.profilePicture}
              alt="My photo"
            />
          </div>
        </div>
        <div className=" flex-50 py-8 flex flex-col gap-4 ">
          <h1 className=" my-title text-6xl md:text-7xl text-text">
            {profile.name}
          </h1>
          <p className="  self-start px-2 bg-surface tracking-widest text-text-light">
            {profile.jobTitle}
          </p>
          <p className="py-2 text-text-light tracking-wide">{profile.about}</p>
          <Button
            variant="outline"
            className=" self-start"
            onClick={handleResumeDownload}
          >
            <span className="flex items-center gap-1">
              <GoDownload /> Download Resume
            </span>
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default Home;
