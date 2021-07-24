import { Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { User } from "../generated/graphql";

interface ProfilePictureProps {
  variant: "small" | "large";
  user: User;
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  variant,
  user,
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [picture, setPicture] = useState("");

  fetch(
    "https://res.cloudinary.com/dsqw5kd59/image/upload/" +
      `profile_pictures/${user.id}_profile_picture`
  ).then((v) => {
    if (v.status == 404) {
      setPicture("default_profile_picture.JPG");
    } else {
      setPicture(`profile_pictures/${user.id}_profile_picture`);
    }
    setLoading(false);
  });

  let body;
  if (loading) {
    body = <div>Loading...</div>;
  } else {
    if (variant == "small") {
      body = (
        <Image
          w={100}
          h={75}
          borderRadius={"70%"}
          src={"https://res.cloudinary.com/dsqw5kd59/image/upload/" + picture}
        />
      );
    } else {
      body = (
        <Image
          w={500}
          h={575}
          borderRadius={"70%"}
          src={"https://res.cloudinary.com/dsqw5kd59/image/upload/" + picture}
        />
      );
    }
  }
  return (
    <div>
      {body}
      {children}
    </div>
  );
};
