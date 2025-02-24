import React, { useState } from 'react';
import axios from 'axios';

function ReviewSection({ reviews, recipeId, setReviews }) {
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewerName, setReviewerName] = useState('');  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReviewData = {
      recipe_id: recipeId,
      reviewer_name: reviewerName || 'Anonymous',  
      review_text: newReview,
      rating: rating,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/reviews', newReviewData);
      console.log('New Review Submitted:', response.data);

      setReviews((prevReviews) => [...prevReviews, response.data.review]);

      setNewReview('');
      setRating(0);
      setReviewerName('');  
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="review-section">
      <h3>Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.review_id}>
            <strong>Rating:</strong> {review.rating}/5 <br />
            {review.review_text}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          placeholder="Your name (Optional)"
        />
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
