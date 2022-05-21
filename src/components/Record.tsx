import React from 'react';

const Record: React.FC<IRecordProps> = ({ total }) => (
  <div>
    {total ? `Total: ${total}` : ''}
  </div>
);

export default Record;

interface IRecordProps {
  total: number
}
