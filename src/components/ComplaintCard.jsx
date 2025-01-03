const ComplaintCard = ({ complaint, onVote }) => (
  <div className="bg-white border rounded-lg shadow-lg p-4 mb-4">
    <h2 className="text-lg font-bold">{complaint.title}</h2>
    <p className="text-gray-600">{complaint.description}</p>
    <div className="flex items-center justify-between mt-2">
      <div className="flex items-center space-x-2">
        <button
          className={`text-lg ${
            complaint.userVote === 'upvote' ? 'text-green-500 font-bold' : 'text-gray-500'
          }`}
          onClick={() => onVote(complaint.id, 'upvote')}
        >
          ▲
        </button>
        <span>{complaint.upvotes}</span>
        <button
          className={`text-lg ${
            complaint.userVote === 'downvote' ? 'text-red-500 font-bold' : 'text-gray-500'
          }`}
          onClick={() => onVote(complaint.id, 'downvote')}
        >
          ▼
        </button>
        <span>{complaint.downvotes}</span>
      </div>
    </div>
  </div>
);

export default ComplaintCard;
