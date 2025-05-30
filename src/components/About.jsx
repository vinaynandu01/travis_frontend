import React from 'react';
import '../styles/AboutUs.css';

const AboutUs = () => {
  const team = [
    {
      name: "R. Vinay",
      role: "Team Lead",
      bio: "Model Development",
      avatar: "https://i.pravatar.cc/150?img=32"
    },
    {
      name: "Y. Ram",
      role: "AI Research Lead",
      bio: "Member",
      avatar: "https://i.pravatar.cc/150?img=32"
    },
    {
      name: "K. Shalem",
      role: "AI Research Lead",
      bio: "Member",
      avatar: "https://i.pravatar.cc/150?img=32"
    },
    {
      name: "V. Akshitha Reddy",
      role: "AI Research Lead",
      bio: "Member",
      avatar: "https://i.pravatar.cc/150?img=32"
    },
    {
      name: "S. Jasmi Rishitha",
      role: "AI Research Lead",
      bio: "Member",
      avatar: "https://i.pravatar.cc/150?img=32"
    },
    {
      name: "M. Siddu",
      role: "Accessibility Specialist",
      bio: "Member",
      avatar: "https://i.pravatar.cc/150?img=65"
    },
    {
      name: "S. Satya Sri Hasith",
      role: "Voice Integration Engineer",
      bio: "Member",
      avatar: "https://i.pravatar.cc/150?img=65"
    }
  ];

  return (
    <section id="about-us" className="about-us">
      <div className="section-container">
        <h2 className="section-title">About Us</h2>
        <div className="divider"></div>
        
        <p className="about-us-intro">
          We are a passionate team committed to making technology accessible for everyone. 
          Our focus is on leveraging AI to break down barriers and create empowering solutions.
        </p>
        
        <div className="team-grid">
          {team.map((member, index) => (
            <div className="team-member" key={index}>
              <div className="avatar-placeholder" aria-label={`Avatar for ${member.name}`}>
                {member.name.split(' ').map(name => name[0]).join('')}
              </div>
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p className="bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
