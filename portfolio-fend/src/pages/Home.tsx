import Section from "../components/Section";
import profile from "../data/profile";

const Home = () => {
  return (
    <Section
      id="home"
      variant="dark"
      title={`Hi, I'm ${profile.nickname ?? profile.name}`}
      subtitle={profile.jobTitle}
    >
      <div className="space-y-4">
        <p>{profile.shortAbout}</p>
        <p>{profile.about}</p>
      </div>
    </Section>
  );
};

export default Home;
