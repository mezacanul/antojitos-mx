import Logo from "@/components/Brand/Logo";
import { getGuestProfile } from "@/lib/data/guest/profile";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { TbUser, TbUserCircle } from "react-icons/tb";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getGuestProfile();

  return (
    <div>
      <div className="flex items-center justify-between px-[4rem] py-[1rem]">
        <Logo />
        <ProfileDetails profile={profile} />
      </div>
      {children}
    </div>
  );
}

function ProfileDetails({ profile }: { profile: any }) {
  const {
    names,
    paternal_surname,
    maternal_surname,
    imageUrl,
  } = profile;
  const fullname = `${names} ${paternal_surname} ${maternal_surname}`;

  return (
    <div className="flex items-center gap-5">
      <span>{fullname}</span>

      <ProfileAvatar imageUrl={imageUrl} />
    </div>
  );
}

function ProfileAvatar({
  imageUrl,
}: {
  imageUrl: string | null;
}) {
  const bucketUrl = `${process.env.NEXT_PUBLIC_BUCKET_URL}/profile`;
  const imageSrc = imageUrl
    ? `${bucketUrl}/${imageUrl}`
    : null;

  return (
    <>
      {imageSrc && (
        <Image
          src={imageSrc}
          alt="Profile"
          width={100}
          height={100}
          className="w-10 h-10 rounded-full object-cover"
        />
      )}
      {!imageSrc && (
        <FaUserCircle className="w-8 h-8 text-gray-500" />
      )}
    </>
  );
}
