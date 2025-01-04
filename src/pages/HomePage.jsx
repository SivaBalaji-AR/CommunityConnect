import { useState } from 'react';
import CommunityCard from '../components/CommunityCard';
import CreateCommunityForm from '../components/CreateCommunityForm';

const HomePage = () => {
  // Initial list of communities
  const [communities, setCommunities] = useState([
    { id: 1, name: 'Neighborhood Watch', description: 'Discuss safety and security in your area.' },
    { id: 2, name: 'Apartment Complex', description: 'Updates and maintenance issues for residents.' },
    { id: 3, name: 'Local Business Network', description: 'Support and network with local businesses.' },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  // Open Create Community Form
  const openForm = () => {
    setIsFormOpen(true);
  };

  // Close Create Community Form
  const closeForm = () => {
    setIsFormOpen(false);
  };

  // Add new community to state
  const addCommunity = (newCommunity) => {
    // Generate a unique ID for the new community
    const communityWithId = {
      ...newCommunity,
      id: communities.length + 1,
    };
    setCommunities((prevCommunities) => [...prevCommunities, communityWithId]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Communities</h1>

      {/* Create New Community Button */}
      <button
        onClick={openForm}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Create New Community
      </button>

      {/* Render the popup form when isFormOpen is true */}
      {isFormOpen && <CreateCommunityForm closeForm={closeForm} addCommunity={addCommunity} />}

      {/* Display List of Communities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {communities.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
