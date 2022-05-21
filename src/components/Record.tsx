import React from 'react';
import '../App.css';

const Record: React.FC<IRecordProps> = ({ total }) => (
  <div>
    {total
      ? (
        <div className="total">
          Total:
          {total}
        </div>
      )
      : ''}
  </div>
);

export default Record;

interface IRecordProps {
  total: number
}
