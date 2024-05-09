import React from "react";
import ProfileForm from "@/components/forms/profile-form";

import { getSession } from "@/lib/auth";

const Profile = async () => {
  const { data } = await getSession();

  return <ProfileForm defaultValues={data} />;
};

export default Profile;
