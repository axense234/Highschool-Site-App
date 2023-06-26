// React
import { FC } from "react";
// Types
import { ProfileDetailsProps } from "types";
import { Student, Teacher } from "@prisma/client";
// Next
import Image from "next/image";
// SCSS
import profileStyles from "../../scss/components/pages/Profile.module.scss";

const ProfileDetails: FC<ProfileDetailsProps> = ({ profile }) => {
  if (profile.role === "ADMIN") {
    return (
      <div className={profileStyles.profileContainer__profileDetails}>
        <Image
          width={400}
          height={400}
          alt={profile.fullname}
          src={profile.profile_img_url}
        />
        <h3>{profile.fullname}</h3>
        <h4>{profile.role}</h4>
        <p>@{profile.email}</p>
      </div>
    );
  }

  if (profile.role === "ELEV") {
    return (
      <div className={profileStyles.profileContainer__profileDetails}>
        <Image
          width={400}
          height={400}
          alt={profile.fullname}
          src={profile.profile_img_url}
        />
        <h3>{profile.fullname}</h3>
        <h4>
          {profile.role} - {(profile as Student).class_label}
        </h4>
        <p>@{profile.email}</p>
      </div>
    );
  }

  return (
    <div className={profileStyles.profileContainer__profileDetails}>
      <Image
        width={400}
        height={400}
        alt={profile.fullname}
        src={profile.profile_img_url}
      />
      <h3>{profile.fullname}</h3>
      <h4>{profile.role}</h4>
      {(profile as Teacher).master && (
        <h5>DIRIGINTE - {(profile as Teacher).master_class_label}</h5>
      )}
      <p>@{profile.email}</p>
      <p>{(profile as Teacher).description}</p>
    </div>
  );
};

export default ProfileDetails;
