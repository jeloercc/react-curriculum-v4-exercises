import { useState, useEffect } from 'react';
import styles from './SnackForm.module.css';

export default function SnackForm({
  addSnack,
  editingSnack,
  cancelEdit,
  updateSnack,
  className,
}) {
  const isEditing = Boolean(editingSnack);
  // Part 1
  // State variables for controlled form inputs and interaction tracking
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [touched, setTouched] = useState({ name: false, rating: false });

  //  Populate or reset the form when editingSnack changes
  useEffect(() => {
    if (editingSnack) {
      setName(editingSnack.name);
      setRating(editingSnack.rating);
    } else {
      // Reset the inputs for a new snack
      setName('');
      setRating('');
    }
    // Clear touched state so old errors don't carry over between modes
    setTouched({ name: false, rating: false });
  }, [editingSnack]);

  // Part 2
  // Name is valid if it is not empty after removing whitespace
  function validateName() {
    return name.trim() !== '';
  }
  // Rating is valid if a value was entered
  function validateRating() {
    return rating !== '';
  }
  // Returns an error message only if the name is invalid AND touched
  function getNameError() {
    if (touched.name && !validateName()) {
      return 'Snack name is required';
    }
    return '';
  }

  // Returns an error message only if the rating is invalid AND touched
  function getRatingError() {
    if (touched.rating && !validateRating()) {
      return 'Please select a rating';
    }
    return '';
  }

  // part 3
  // Submit using state instead of FormData
  function handleSubmit(e) {
    e.preventDefault();

    // Stop submission if any field is invalid,and mark all fields as touched so every error becomes visible
    if (!validateName() || !validateRating()) {
      setTouched({ name: true, rating: true });
      return;
    }

    if (isEditing) {
      // Update the existing snack in the parent component
      updateSnack(editingSnack.id, name, rating);
    } else {
      // Add a new snack, then reset the form state
      addSnack(name, rating);
      setName('');
      setRating('');
      setTouched({ name: false, rating: false });
    }
  }

  const nameError = getNameError();
  const ratingError = getRatingError();
  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${className || ''}`}
    >
      <h3 className={styles['form-title']}>
        {isEditing ? '✏️ Edit Snack' : '➕ Add Snack'}
      </h3>

      {/* Name field */}
      <div className={styles['field-container']}>
        <label className={styles['field-label']}>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setTouched((prev) => ({ ...prev, name: true }))}
          className={styles['field-input']}
          placeholder="Enter snack name"
        />
        {nameError && <div className={styles.error}>{nameError}</div>}
      </div>

      {/* Rating field */}
      <div className={styles['field-container']}>
        <label className={styles['field-label']}>Rating:</label>
        <input
          type="number"
          name="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          onFocus={() => setTouched((prev) => ({ ...prev, rating: true }))}
          min="1"
          max="5"
          className={styles['field-input']}
          placeholder="Rate 1-5"
        />
        {ratingError && <div className={styles.error}>{ratingError}</div>}
      </div>

      {/* Action buttons */}
      <div className={styles['button-container']}>
        <button
          type="submit"
          className={`${styles.button} ${styles['submit-button']}`}
        >
          {isEditing ? 'Save' : 'Add'}
        </button>

        {/* Cancel button only appears while editing */}
        {isEditing && (
          <button
            type="button"
            onClick={cancelEdit}
            className={`${styles.button} ${styles['cancel-button']}`}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
