interface profile {
  name: string;
  nickname?: string;
  email?: string;
  phone?: string;

  jobTitle: string;
  shortAbout: string;

  about: string;
  address: string;
  linkedin?: string;
  github?: string;
  gitlab?: string;
  facebook?: string;
  profilePicture: string;
  logo: string;
}

const profile: profile = {
  name: "Leo Espiritu",
  nickname: "Leo",
  email: "espirituleoncio7@gmail.com",
  phone: "09157230777",
  jobTitle: "Full Stack Developer | MERN Stack",
  shortAbout: "Building intuitive web solutions, from front-end to back-end!",
  about:
    "I’m a Full Stack Web Developer with a background in freelancing for over 7 years in design, photo editing, and real estate. After completing my training at Uplift Bootcamp, I now specialize in building web applications using the MERN stack (MongoDB, Express, React, Node.js). I’m passionate about creating clean, responsive, and user-friendly applications, and I’m currently seeking an opportunity to apply my skills in a professional development environment.",

  address: "Puting Kahoy, Lian, Batangas, Philippines",
  linkedin: "https://www.linkedin.com/in/leoncio-espiritu/",
  github: "https://github.com/lespiritu",
  gitlab: "https://gitlab.com/espirituleoncio7",
  facebook: "https://www.facebook.com/espirituleoncio7",
  profilePicture: "/my-pic-1.png",
  logo: "/leo_logo_green.png",
};

export default profile;
