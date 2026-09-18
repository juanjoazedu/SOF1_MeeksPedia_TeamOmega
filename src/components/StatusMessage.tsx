export type StatusType = 'loading' | 'error' | 'empty';

interface StatusMessageProps {
  type: StatusType;
  message: string;
}

export const StatusMessage = ({ type, message }: StatusMessageProps) => {
  return (
    <p className={`status-message status-message--${type}`} role="status">
      {message}
    </p>
  );
};