import React, { useState } from 'react';

function ReviewSection({ reviews }) {
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the new review (simulated here)
    const newReviewData = {
      review_id: reviews.length + 1,
      user_id: 103, // Simulate logged-in user ID
      recipe_id: reviews[0]?.recipe_id || 1,
      review_text: newReview,
      rating: rating
    };
    console.log('New Review Submitted:', newReviewData);
    setNewReview('');
    setRating(0);
  };

  return (
    <div className="review-section">
      <h3>Reviews</h3>
      <ul>
        {reviews.map(review => (
          <li key={review.review_id}>
            <strong>Rating:</strong> {review.rating}/5 <br />
            {review.review_text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={newReview} 
          onChange={(e) => setNewReview(e.target.value)} 
          placeholder="Write a review..." 
          required 
        />
        <input 
          type="number" 
          value={rating} 
          onChange={(e) => setRating(Number(e.target.value))} 
          placeholder="Rating (1-5)" 
          min="1" 
          max="5" 
          required 
        />
        <button type="submit">Add Review</button>
      </form>
    </div>
  );
}

export default ReviewSection;
