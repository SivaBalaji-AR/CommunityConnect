import React, { useState } from 'react';

const CreateCommunityForm = ({ closeForm, addCommunity }) => {
  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');

  const handleCreateCommunity = (e) => {
    e.preventDefault();

    // Create new community object
    const newCommunity = {
      id: Date.now(),
      name: communityName,
      description: communityDescription,
    };

    // Save new community to localStorage
    let communities = JSON.parse(localStorage.getItem('communities')) || [];
    communities.push(newCommunity);
    localStorage.setItem('communities', JSON.stringify(communities));

    // Pass the new community to HomePage to update state
    addCommunity(newCommunity);

    // Close the form after submission
    closeForm();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Create New Community</h2>
        <form onSubmit={handleCreateCommunity}>
          <div className="mb-4">
            <label htmlFor="communityName" className="block text-sm font-medium text-gray-700">Community Name</label>
            <input
              id="communityName"
              type="text"
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="communityDescription" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="communityDescription"
              value={communityDescription}
              onChange={(e) => setCommunityDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCommunityForm;
