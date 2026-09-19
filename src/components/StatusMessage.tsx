export type StatusType = 'loading' | 'error' | 'empty';

import styles from '../styles/StatusMessage.module.css';

interface StatusMessageProps {
  type: StatusType;
  message: string;
  onRetry?: () => void;
}

export const StatusMessage = ({ type, message, onRetry }: StatusMessageProps) => {
  return (
    <div className={`${styles.message} ${styles[type]}`} role="status">
      <p>{message}</p>

      {type === 'error' && onRetry && (
        <button className={styles.retryButton} onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};