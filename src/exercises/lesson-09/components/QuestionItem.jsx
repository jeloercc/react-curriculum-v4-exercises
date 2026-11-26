import { useContext, useState } from 'react';
import { SurveyContext } from '../SurveyContext';
import { QUESTION_TYPES } from '../surveyReducer';
import styles from '../StudentWork.module.css';

export function QuestionItem({ question }) {
  const { state, dispatch } = useContext(SurveyContext);
  const [workingText, setWorkingText] = useState(question.question);
  const [optionTexts, setOptionTexts] = useState(question.options);

  const isEditing = state.ui.editingQuestionId === question.id;

  // Format the question type
  const formatQuestionType = (type) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
  };

  // Toggle question editing
  const handleEdit = () => {
    if (!isEditing) {
      setWorkingText(question.question);
      setOptionTexts([...question.options]);
    }

    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: {
        questionId: isEditing ? null : question.id,
      },
    });
  };

  // Save question text
  const handleSave = () => {
    dispatch({
      type: 'UPDATE_QUESTION_TEXT',
      payload: {
        id: question.id,
        newText: workingText,
      },
    });

    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: { questionId: null },
    });
  };

  // Delete a question after confirmation
  const handleDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this question?'
    );

    if (confirmed) {
      dispatch({
        type: 'DELETE_QUESTION',
        payload: { id: question.id },
      });
    }
  };

  // Update an option input
  const handleOptionChange = (index, newText) => {
    setOptionTexts((previous) =>
      previous.map((option, i) => (i === index ? newText : option))
    );
  };

  // Save an edited option
  const handleSaveOption = (index) => {
    dispatch({
      type: 'UPDATE_OPTION_TEXT',
      payload: {
        questionId: question.id,
        optionIndex: index,
        newText: optionTexts[index],
      },
    });
  };

  // Delete an option
  const handleDeleteOption = (index) => {
    if (question.options.length <= 2) {
      return;
    }

    dispatch({
      type: 'DELETE_OPTION_FROM_QUESTION',
      payload: {
        questionId: question.id,
        optionIndex: index,
      },
    });

    setOptionTexts((previous) => previous.filter((option, i) => i !== index));
  };

  // Add an option
  const handleAddOption = () => {
    const optionText = window.prompt('Enter a new option:');

    if (!optionText || !optionText.trim()) {
      return;
    }

    dispatch({
      type: 'ADD_OPTION_TO_QUESTION',
      payload: {
        questionId: question.id,
        optionText: optionText.trim(),
      },
    });

    setOptionTexts((previous) => [...previous, optionText.trim()]);
  };

  return (
    <div className={styles['question-item']}>
      <div className={styles['question-header']}>
        <span className={styles['question-type']}>
          Question Type: {formatQuestionType(question.type)}
        </span>

        <div className={styles['question-actions']}>
          <button
            type="button"
            className={styles['edit-btn']}
            onClick={handleEdit}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>

          <button
            type="button"
            className={styles['delete-btn']}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Edit question text */}
      <div className={styles['question-content']}>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={workingText}
              onChange={(event) => setWorkingText(event.target.value)}
              aria-label="Question text"
            />

            <button type="button" onClick={handleSave}>
              Save
            </button>

            <button type="button" onClick={handleEdit}>
              Cancel
            </button>
          </div>
        ) : (
          <h3>{question.question}</h3>
        )}
      </div>

      {/* Multiple-choice answer options */}
      {question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
        <div className={styles['options-section']}>
          <h4>Answer Options:</h4>

          <ul>
            {question.options.map((option, index) => (
              <li key={index} className={styles['option-item']}>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      value={optionTexts[index] ?? option}
                      onChange={(event) =>
                        handleOptionChange(index, event.target.value)
                      }
                      aria-label={`Option ${index + 1}`}
                    />

                    <button
                      type="button"
                      onClick={() => handleSaveOption(index)}
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteOption(index)}
                      disabled={question.options.length <= 2}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <span className={styles['option-text']}>{option}</span>
                )}
              </li>
            ))}
          </ul>

          {isEditing && (
            <button type="button" onClick={handleAddOption}>
              + Add Option
            </button>
          )}
        </div>
      )}
    </div>
  );
}
