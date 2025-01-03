import { Link } from 'react-router-dom';

const CommunityCard = ({ community }) => (
  <div className="border p-4 rounded shadow">
    <h2 className="text-xl font-bold">{community.name}</h2>
    <p className="text-gray-600">{community.description}</p>
    <Link
      to={`/community/${community.id}`}
      className="text-blue-500 hover:underline mt-2 block"
    >
      View Community
    </Link>
  </div>
);

export default CommunityCard;