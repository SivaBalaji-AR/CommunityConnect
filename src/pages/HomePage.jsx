import { useState, useEffect } from 'react';
import CommunityCard from '../components/CommunityCard';
import CreateCommunityForm from '../components/CreateCommunityForm';

const HomePage = () => {
  const [communities, setCommunities] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Load communities from localStorage on page load
  useEffect(() => {
    const storedCommunities = JSON.parse(localStorage.getItem('communities')) || [];
    setCommunities(storedCommunities);
  }, []);

  // Open Create Community Form
  const openForm = () => {
    setIsFormOpen(true);
  };

  // Close Create Community Form
  const closeForm = () => {
    setIsFormOpen(false);
  };

  // Add new community to state and localStorage
  const addCommunity = (newCommunity) => {
    setCommunities((prevCommunities) => [...prevCommunities, newCommunity]);
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
