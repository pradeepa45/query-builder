interface ProfileProps {
  name: string;
  email: string;
  profileImg: string;
}

const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  profileImg: "https://picsum.photos/seed/237/200/300",
};

export default function Avatar({ profile = user }: { profile?: ProfileProps }) {
  return (
    <div className="h-8 w-8 rounded-full relative">
      <img
        src={profile.profileImg}
        alt={profile.name}
        className="rounded-full h-full w-full"
      />
    </div>
  );
}
