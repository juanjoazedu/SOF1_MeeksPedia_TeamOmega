export type StatusType = 'loading' | 'error' | 'empty';

import styles from '../styles/StatusMessage.module.css';

interface StatusMessageProps {
  type: StatusType;
  message: string;
}

export const StatusMessage = ({ type, message }: StatusMessageProps) => {
  return (
    <p className={`${styles.message} ${styles[type]}`} role="status">
      {message}
    </p>
  );
};