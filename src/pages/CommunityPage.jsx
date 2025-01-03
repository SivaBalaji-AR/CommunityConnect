import { useNavigate } from 'react-router-dom'; // Add this for navigation
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ComplaintCard from '../components/ComplaintCard';
import PostComplaintModal from '../components/PostComplaintModal';

const CommunityPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use navigate for redirection
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [complaints, setComplaints] = useState([
    { id: 1, title: 'Streetlight not working', description: 'The streetlight near block A is not working.', upvotes: 10, downvotes: 2, userVote: null },
    { id: 2, title: 'Garbage not collected', description: 'Garbage has not been collected for 3 days.', upvotes: 8, downvotes: 1, userVote: null },
  ]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if user is authenticated by reading from localStorage
    const userIsAuthenticated = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(!!userIsAuthenticated);
  }, []);

  const handleVote = (id, type) => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/login');
      return;
    }

    setComplaints((prev) =>
      prev.map((complaint) => {
        if (complaint.id === id) {
          const isUpvote = type === 'upvote';
          const isDownvote = type === 'downvote';

          let upvotes = complaint.upvotes;
          let downvotes = complaint.downvotes;
          let userVote = complaint.userVote;

          if (isUpvote) {
            if (userVote === 'upvote') {
              upvotes -= 1;
              userVote = null;
            } else {
              upvotes += 1;
              if (userVote === 'downvote') downvotes -= 1;
              userVote = 'upvote';
            }
          } else if (isDownvote) {
            if (userVote === 'downvote') {
              downvotes -= 1;
              userVote = null;
            } else {
              downvotes += 1;
              if (userVote === 'upvote') upvotes -= 1;
              userVote = 'downvote';
            }
          }

          return { ...complaint, upvotes, downvotes, userVote };
        }
        return complaint;
      })
    );
  };

  const addComplaint = (title, description) => {
    const newComplaint = {
      id: complaints.length + 1,
      title,
      description,
      upvotes: 0,
      downvotes: 0,
      userVote: null,
    };
    setComplaints((prev) => [...prev, newComplaint]);
    setShowModal(false);
  };

  // Sort complaints by net votes
  const sortedComplaints = [...complaints].sort(
    (a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Community {id}</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowModal(true)}
      >
        Post a Complaint
      </button>
      {sortedComplaints.map((complaint) => (
        <ComplaintCard key={complaint.id} complaint={complaint} onVote={handleVote} />
      ))}
      {showModal && <PostComplaintModal onClose={() => setShowModal(false)} onSubmit={addComplaint} />}
    </div>
  );
};

export default CommunityPage;
